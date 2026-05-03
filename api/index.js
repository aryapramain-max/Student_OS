const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { google } = require("googleapis");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const APP_BASE_URL = "https://student-os-dun.vercel.app";

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

/**
 * PUBLIC ROUTES
 */

app.get("/", (req, res) => {
  res.json({
    name: "Student OS API",
    status: "running",
    version: "2.1.0",
    privacy: "/privacy",
    connectGoogle: "/connect/google",
  });
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
          services such as Google Calendar, Google Drive, Google Sheets when
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
          <title>Google Connected</title>
          <meta charset="UTF-8" />
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 720px; margin: 40px auto; line-height: 1.6; padding: 0 20px;">
          <h1>Google Connected Successfully</h1>

          <p>Your Google account has been connected to Student OS.</p>

          <h2>Your Student OS User Key</h2>
          <p>Copy this key and keep it private:</p>

          <pre style="background:#f4f4f4; padding:16px; border-radius:8px; overflow:auto;">${userKey}</pre>

          <p>
            In the GPT, say:
          </p>

          <pre style="background:#f4f4f4; padding:16px; border-radius:8px; overflow:auto;">My Student OS user key is ${userKey}</pre>

          <p>
            After that, the GPT can create Google Calendar study blocks in your own Google account.
          </p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("OAuth failed:", error.response?.data || error.message);
    res.status(500).send("OAuth failed: " + error.message);
  }
});

/**
 * PROTECTED GPT ACTION ROUTES
 */

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

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;