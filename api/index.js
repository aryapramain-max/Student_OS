const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { google } = require("googleapis");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const homePage = require("./pages/home");
const privacyPage = require("./pages/privacy");
const termsPage = require("./pages/terms");
const googleConnectedPage = require("./pages/googleConnected");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const APP_BASE_URL = "https://studentos.pranshu.website";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function createUserKey() {
  return crypto.randomBytes(24).toString("hex");
}

function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${APP_BASE_URL}/auth/google/callback`
  );
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token || token !== process.env.ACTION_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

async function getConnectionByUserKey(userKey) {
  const { data, error } = await supabase
    .from("user_connections")
    .select("*")
    .eq("user_key", userKey)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getGoogleClientForUser(userKey) {
  const connection = await getConnectionByUserKey(userKey);

  if (!connection) {
    return null;
  }

  const oauth2Client = getGoogleOAuthClient();

  oauth2Client.setCredentials({
    refresh_token: connection.google_refresh_token,
  });

  return oauth2Client;
}

/**
 * Lazy PDF parser.
 * Do NOT import pdf-parse at the top of the file.
 * Some versions crash Vercel during cold start because of DOMMatrix/canvas issues.
 */
async function parsePdfBuffer(buffer) {
  try {
    const pdfParse = require("pdf-parse");
    const parsed = await pdfParse(buffer);
    return parsed.text || "";
  } catch (error) {
    console.error("PDF parse error:", error.message);
    throw new Error(
      "PDF parsing failed on the server. Try using a Google Doc, text file, or install pdf-parse@1.1.1."
    );
  }
}

/**
 * PUBLIC ROUTES
 */

app.get("/debug/oauth-url", (req, res) => {
  const oauth2Client = getGoogleOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.json({
    appBaseUrl: APP_BASE_URL,
    redirectUri: `${APP_BASE_URL}/auth/google/callback`,
    oauthUrl: url,
  });
});

app.get("/", (req, res) => {
  res.type("html").send(homePage());
});

app.get("/privacy", (req, res) => {
  res.type("html").send(privacyPage());
});

app.get("/terms", (req, res) => {
  res.type("html").send(termsPage());
});

/**
 * GOOGLE CONNECT FLOW
 */

app.get("/connect/google", (req, res) => {
  const oauth2Client = getGoogleOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.redirect(url);
});

app.get("/auth/google", (req, res) => {
  res.redirect("/connect/google");
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Missing Google authorization code.");
    }

    const oauth2Client = getGoogleOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return res.status(400).send(`
        <h1>Google connected, but no refresh token was returned.</h1>
        <p>Please revoke access for Semester OS in your Google Account permissions and try again.</p>
        <p><a href="/">Back to Home</a></p>
      `);
    }

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const profile = await oauth2.userinfo.get();
    const googleEmail = profile.data.email || null;
    const userKey = createUserKey();

    const { error } = await supabase.from("user_connections").insert({
      user_key: userKey,
      google_email: googleEmail,
      google_refresh_token: tokens.refresh_token,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).send("Failed to save Google connection.");
    }

    res.type("html").send(googleConnectedPage(userKey));
  } catch (error) {
    console.error("OAuth failed:", error.response?.data || error.message);
    res.status(500).send("OAuth failed: " + error.message);
  }
});

app.get("/debug/supabase", async (req, res) => {
  try {
    const hasUrl = Boolean(process.env.SUPABASE_URL);
    const hasKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

    if (!hasUrl || !hasKey) {
      return res.json({
        ok: false,
        hasUrl,
        hasKey,
        message: "Missing Supabase env vars in Vercel",
      });
    }

    const { data, error } = await supabase
      .from("user_connections")
      .select("id,user_key,google_email,created_at")
      .limit(1);

    if (error) {
      return res.json({
        ok: false,
        hasUrl,
        hasKey,
        supabaseError: error,
      });
    }

    res.json({
      ok: true,
      hasUrl,
      hasKey,
      tableWorks: true,
      sampleRows: data,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

/**
 * PROTECTED GPT ACTION ROUTES
 */

app.use(requireAuth);

app.get("/v2/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/v2/calendar/study-blocks", async (req, res) => {
  try {
    const { calendarId = "primary", studyBlocks, userKey } = req.body;

    if (!userKey) {
      return res.status(400).json({
        error: "userKey is required. User must connect Google at /connect/google first.",
      });
    }

    if (!Array.isArray(studyBlocks) || studyBlocks.length === 0) {
      return res.status(400).json({
        error: "studyBlocks must be a non-empty array",
      });
    }

    const connection = await getConnectionByUserKey(userKey);

    if (!connection) {
      return res.status(404).json({
        error: "No Google connection found for this userKey.",
      });
    }

    const oauth2Client = getGoogleOAuthClient();
    oauth2Client.setCredentials({
      refresh_token: connection.google_refresh_token,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const createdEvents = [];

    for (const block of studyBlocks) {
      if (!block.title || !block.startTime || !block.endTime) {
        return res.status(400).json({
          error: "Each study block requires title, startTime, and endTime",
        });
      }

      const event = await calendar.events.insert({
        calendarId,
        requestBody: {
          summary: block.title,
          description: block.description || "",
          location: block.location || "",
          start: { dateTime: block.startTime },
          end: { dateTime: block.endTime },
        },
      });

      createdEvents.push({
        id: event.data.id,
        calendarId,
        title: event.data.summary,
        description: event.data.description,
        startTime: event.data.start?.dateTime,
        endTime: event.data.end?.dateTime,
        htmlLink: event.data.htmlLink,
      });
    }

    res.status(201).json({ createdEvents });
  } catch (error) {
    console.error("Calendar error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to create study blocks",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/v2/drive/files/search", async (req, res) => {
  try {
    const { userKey, query, mimeType, limit = 10 } = req.query;

    if (!userKey) {
      return res.status(400).json({
        error: "userKey is required.",
      });
    }

    if (!query) {
      return res.status(400).json({
        error: "query is required.",
      });
    }

    const auth = await getGoogleClientForUser(userKey);

    if (!auth) {
      return res.status(404).json({
        error: "No Google connection found for this userKey.",
      });
    }

    const drive = google.drive({ version: "v3", auth });

    const safeQuery = String(query).replace(/'/g, "\\'");
    let q = `name contains '${safeQuery}' and trashed = false`;

    if (mimeType) {
      const safeMimeType = String(mimeType).replace(/'/g, "\\'");
      q += ` and mimeType = '${safeMimeType}'`;
    }

    const response = await drive.files.list({
      q,
      pageSize: Math.min(Number(limit) || 10, 50),
      fields: "files(id,name,mimeType,webViewLink,modifiedTime,size)",
      orderBy: "modifiedTime desc",
    });

    res.json({
      files: response.data.files || [],
    });
  } catch (error) {
    console.error("Drive search error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to search Google Drive files",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/v2/drive/files/:fileId/content", async (req, res) => {
  try {
    const { fileId } = req.params;
    const { userKey } = req.query;

    if (!userKey) {
      return res.status(400).json({
        error: "userKey is required.",
      });
    }

    const auth = await getGoogleClientForUser(userKey);

    if (!auth) {
      return res.status(404).json({
        error: "No Google connection found for this userKey.",
      });
    }

    const drive = google.drive({ version: "v3", auth });

    const metadata = await drive.files.get({
      fileId,
      fields: "id,name,mimeType,webViewLink,modifiedTime,size",
    });

    const mimeType = metadata.data.mimeType;
    let text = "";

    if (mimeType === "application/vnd.google-apps.document") {
      const exported = await drive.files.export(
        {
          fileId,
          mimeType: "text/plain",
        },
        {
          responseType: "text",
        }
      );

      text = exported.data;
    } else if (mimeType === "application/vnd.google-apps.spreadsheet") {
      const exported = await drive.files.export(
        {
          fileId,
          mimeType: "text/csv",
        },
        {
          responseType: "text",
        }
      );

      text = exported.data;
    } else if (
      mimeType === "text/plain" ||
      mimeType === "text/markdown" ||
      mimeType === "text/csv"
    ) {
      const file = await drive.files.get(
        {
          fileId,
          alt: "media",
        },
        {
          responseType: "text",
        }
      );

      text = file.data;
    } else if (mimeType === "application/pdf") {
      const file = await drive.files.get(
        {
          fileId,
          alt: "media",
        },
        {
          responseType: "arraybuffer",
        }
      );

      const buffer = Buffer.from(file.data);
      text = await parsePdfBuffer(buffer);
    } else {
      return res.status(400).json({
        error: "Unsupported file type for text extraction.",
        supportedTypes: [
          "Google Docs",
          "Google Sheets",
          "PDF",
          "text/plain",
          "text/markdown",
          "text/csv",
        ],
        mimeType,
      });
    }

    res.json({
      fileId,
      name: metadata.data.name,
      mimeType,
      modifiedTime: metadata.data.modifiedTime,
      webViewLink: metadata.data.webViewLink,
      text,
    });
  } catch (error) {
    console.error("Drive read error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to read Google Drive file",
      details: error.response?.data || error.message,
    });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;