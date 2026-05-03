const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * ================================
 * GOOGLE OAUTH CLIENT (FIXED)
 * ================================
 */
function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://student-os-dun.vercel.app/auth/google/callback"
  );
}

/**
 * ================================
 * AUTH MIDDLEWARE (FOR GPT ACTIONS)
 * ================================
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token || token !== process.env.ACTION_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

/**
 * ================================
 * PUBLIC ROUTES (NO AUTH)
 * ================================
 */

app.get("/", (req, res) => {
  res.json({
    name: "Student OS API",
    status: "running",
    version: "2.0.0",
  });
});

/**
 * Privacy Policy (for GPT Store)
 */
app.get("/privacy", (req, res) => {
  res.send("Student OS Privacy Policy");
});

/**
 * ================================
 * GOOGLE OAUTH ROUTES
 * ================================
 */

/**
 * Step 1: Redirect user to Google login
 */
app.get("/auth/google", (req, res) => {
  const oauth2Client = getGoogleOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  res.redirect(url);
});

/**
 * Step 2: Google callback
 */
app.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const oauth2Client = getGoogleOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    console.log("User Google tokens:", tokens);

    res.send(`
      <h1>✅ Google Connected</h1>
      <p>You can return to Student OS.</p>
      <pre>${JSON.stringify(tokens, null, 2)}</pre>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("OAuth failed");
  }
});

/**
 * ================================
 * PROTECTED ROUTES (GPT ACTIONS)
 * ================================
 */

app.use(requireAuth);

/**
 * Health check
 */
app.get("/v2/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * Google Calendar: Create study blocks
 */
app.post("/v2/calendar/study-blocks", async (req, res) => {
  try {
    const { calendarId = "primary", studyBlocks } = req.body;

    if (!Array.isArray(studyBlocks) || studyBlocks.length === 0) {
      return res.status(400).json({
        error: "studyBlocks must be a non-empty array",
      });
    }

    // ⚠️ TEMP: still using YOUR refresh token (not per-user yet)
    const oauth2Client = getGoogleOAuthClient();
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const createdEvents = [];

    for (const block of studyBlocks) {
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
        title: event.data.summary,
        startTime: event.data.start?.dateTime,
        endTime: event.data.end?.dateTime,
        htmlLink: event.data.htmlLink,
      });
    }

    res.status(201).json({ createdEvents });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to create study blocks",
      details: error.message,
    });
  }
});

/**
 * ================================
 * LOCAL DEV SUPPORT
 * ================================
 */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;