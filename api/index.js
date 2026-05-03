const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { google } = require("googleapis");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

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
      "https://www.googleapis.com/auth/spreadsheets",
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
  res.type("html").send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 760px; margin: 40px auto; line-height: 1.6; padding: 0 20px;">
        <h1>Student OS</h1>

        <p>
          Student OS is an academic execution system that helps students plan
          and manage study schedules using their own Google account.
        </p>

        <h2>Get Started</h2>
        <p>
          <a href="/connect/google">Connect your Google account</a>
        </p>

        <h2>Legal</h2>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>

        <hr />
        <p>
          <a href="/privacy">Privacy Policy</a> |
          <a href="/terms">Terms of Service</a>
        </p>
      </body>
    </html>
  `);
});

app.get("/terms", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS Terms of Service</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 760px; margin: 40px auto; line-height: 1.6; padding: 0 20px;">
        <h1>Student OS Terms of Service</h1>

        <p>
          By using Student OS, you agree to use the service responsibly for
          academic planning and productivity purposes.
        </p>

        <h2>Use of Service</h2>
        <p>
          You agree not to misuse the service or attempt to access other users' data.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Student OS integrates with Google services. Use of those services is
          subject to Google's terms and policies.
        </p>

        <h2>Liability</h2>
        <p>
          Student OS is provided as-is without warranties of any kind.
        </p>

        <h2>Contact</h2>
        <p>
          <a href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
        </p>

        <hr />
        <p>
          <a href="/">Home</a> |
          <a href="/privacy">Privacy Policy</a>
        </p>
      </body>
    </html>
  `);
});

app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS Privacy Policy</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 760px; margin: 40px auto; line-height: 1.6; padding: 0 20px;">
        <h1>Student OS Privacy Policy</h1>
        <p><strong>Effective Date:</strong> May 3, 2026</p>

        <p>
          Student OS is an academic execution assistant that helps users plan,
          organize, and complete academic work. It may connect to third-party
          services such as Google Calendar, Google Drive, and Google Sheets when
          authorized by the user.
        </p>

        <h2>Information We Access</h2>
        <p>
          Depending on the features used, Student OS may access calendar events,
          files, documents, spreadsheet data, and academic planning information.
          Access is limited to what is needed to complete user-requested actions.
        </p>

        <h2>How Information Is Used</h2>
        <p>
          Information is used only to perform requested actions, such as creating
          study blocks, reading academic files, searching Drive files, or updating
          academic progress records.
        </p>

        <h2>Data Sharing</h2>
        <p>
          Student OS does not sell user data. Data may be sent to connected
          services only as necessary to complete user-requested actions.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Student OS may interact with Google services and other integrations.
          Those services are governed by their own terms and privacy policies.
        </p>

        <h2>Security</h2>
        <p>
          API requests are protected using authentication. Users should not share
          private credentials, access tokens, or API keys.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, contact:
          <a href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
        </p>

        <hr />
        <p>
          <a href="/">Home</a> |
          <a href="/terms">Terms of Service</a>
        </p>
      </body>
    </html>
  `);
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
      "https://www.googleapis.com/auth/spreadsheets",
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
        <p>Please revoke access for Student OS in your Google Account permissions and try again.</p>
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

    res.type("html").send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Connected | Student OS</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
              background: #f7f7f8;
              color: #111827;
            }

            .page {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 32px 16px;
            }

            .card {
              width: 100%;
              max-width: 720px;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 24px;
              box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
              padding: 40px;
            }

            .badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 12px;
              border-radius: 999px;
              background: #ecfdf5;
              color: #047857;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 20px;
            }

            h1 {
              margin: 0 0 12px;
              font-size: 36px;
              line-height: 1.1;
              letter-spacing: -0.04em;
            }

            .subtitle {
              margin: 0 0 32px;
              font-size: 17px;
              color: #4b5563;
            }

            .section-label {
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #6b7280;
              margin-bottom: 10px;
            }

            .key-box {
              display: flex;
              gap: 12px;
              align-items: center;
              background: #f3f4f6;
              border: 1px solid #e5e7eb;
              border-radius: 16px;
              padding: 14px;
              margin-bottom: 20px;
            }

            .key {
              flex: 1;
              overflow-x: auto;
              white-space: nowrap;
              font-family: "SFMono-Regular", Consolas, Monaco, monospace;
              font-size: 14px;
              color: #111827;
            }

            button {
              border: 0;
              border-radius: 12px;
              padding: 12px 16px;
              background: #111827;
              color: white;
              font-size: 14px;
              font-weight: 700;
              cursor: pointer;
            }

            button:hover {
              background: #000000;
            }

            .prompt-box {
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 16px;
              padding: 16px;
              font-family: "SFMono-Regular", Consolas, Monaco, monospace;
              font-size: 14px;
              color: #111827;
              overflow-x: auto;
              margin-bottom: 24px;
            }

            .note {
              color: #6b7280;
              font-size: 14px;
              line-height: 1.6;
              margin: 0;
            }

            .footer {
              margin-top: 28px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              display: flex;
              justify-content: space-between;
              gap: 16px;
              flex-wrap: wrap;
              font-size: 14px;
            }

            .footer a {
              color: #111827;
              text-decoration: none;
              font-weight: 600;
            }

            .footer a:hover {
              text-decoration: underline;
            }

            @media (max-width: 640px) {
              .card {
                padding: 28px;
              }

              h1 {
                font-size: 30px;
              }

              .key-box {
                flex-direction: column;
                align-items: stretch;
              }

              button {
                width: 100%;
              }
            }
          </style>
        </head>

        <body>
          <main class="page">
            <section class="card">
              <div class="badge">✓ Google connected</div>

              <h1>Your account is ready</h1>
              <p class="subtitle">
                Student OS can now create Google Calendar study blocks and read supported academic files from your connected Google account.
              </p>

              <div class="section-label">Your private Student OS key</div>

              <div class="key-box">
                <div class="key" id="userKey">${userKey}</div>
                <button onclick="copyKey(this)">Copy key</button>
              </div>

              <div class="section-label">Paste this in the GPT</div>

              <div class="prompt-box" id="promptText">My Student OS user key is ${userKey}</div>

              <button onclick="copyPrompt(this)">Copy full message</button>

              <p class="note" style="margin-top: 20px;">
                Keep this key private. Anyone with this key may be able to create study blocks or access connected academic files through Student OS.
              </p>

              <div class="footer">
                <span>Student OS</span>
                <span>
                  <a href="/privacy">Privacy Policy</a>
                  &nbsp;·&nbsp;
                  <a href="/terms">Terms</a>
                </span>
              </div>
            </section>
          </main>

          <script>
            function copyKey(button) {
              const key = document.getElementById("userKey").innerText;
              navigator.clipboard.writeText(key);
              button.innerText = "Copied";
              setTimeout(() => button.innerText = "Copy key", 1500);
            }

            function copyPrompt(button) {
              const text = document.getElementById("promptText").innerText;
              navigator.clipboard.writeText(text);
              button.innerText = "Copied";
              setTimeout(() => button.innerText = "Copy full message", 1500);
            }
          </script>
        </body>
      </html>
    `);
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