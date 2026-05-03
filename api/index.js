const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { google } = require("googleapis");
const { Client: NotionClient } = require("@notionhq/client");
require("dotenv").config();

const app = express();



app.use(cors());
app.use(express.json({ limit: "10mb" }));

/**
 * Auth middleware
 * GPT Actions will send:
 * Authorization: Bearer YOUR_ACTION_API_KEY
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
 * Google OAuth client
 * Used for Calendar, Sheets, and Drive.
 */
function getGoogleOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oauth2Client;
}

/**
 * Notion client
 */
const notion = new NotionClient({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Public root route
 * Useful for checking that Vercel is alive in browser.
 */
app.get("/", (req, res) => {
  res.json({
    name: "Academic Execution API",
    status: "running",
    version: "2.0.0",
    health: "/v2/health",
  });
});

app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS Privacy Policy</title>
        <meta charset="UTF-8" />
      </head>
      <body>
        <h1>Student OS Privacy Policy</h1>
        <p><strong>Effective Date:</strong> 2026-05-03</p>

        <p>
          Student OS is an academic execution assistant that connects to services
          such as Google Calendar, Google Drive, Google Sheets, Notion, Todoist,
          and GitHub only when authorized by the user.
        </p>

        <h2>Information We Access</h2>
        <p>
          Depending on the integrations enabled, Student OS may access calendar
          events, academic files, spreadsheet data, Notion dashboard content,
          Todoist tasks, and GitHub repository information needed to perform
          requested actions.
        </p>

        <h2>How Information Is Used</h2>
        <p>
          Information is used only to complete user-requested academic actions,
          such as creating study blocks, reading academic dashboards, creating
          tasks, checking project progress, and reading study materials.
        </p>

        <h2>Data Storage</h2>
        <p>
          Student OS does not intentionally sell user data. For this version,
          integration credentials are stored as environment variables on the
          backend server. Users should not submit sensitive personal information
          unless necessary for the requested academic action.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Student OS connects to third-party services including Google, Notion,
          Todoist, and GitHub. Their own privacy policies apply when using those
          services.
        </p>

        <h2>Data Sharing</h2>
        <p>
          Student OS does not sell user data to advertisers. Data may be sent to
          connected services only as needed to complete user-requested actions.
        </p>

        <h2>Security</h2>
        <p>
          Requests to the backend are protected by an API key. Users should not
          share private credentials or access tokens.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about this privacy policy, contact:
          aryapramain@gmail.com
        </p>
      </body>
    </html>
  `);
});

app.get("/", (req, res) => {
  res.json({
    name: "Academic Execution API",
    status: "running",
    version: "2.0.0",
    health: "/v2/health",
  });
});

// ADD GOOGLE LOGIN ROUTES HERE

app.get("/auth/google", (req, res) => {
  const oauth2Client = getGoogleOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets"
    ],
    prompt: "consent"
  });

  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const oauth2Client = getGoogleOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    console.log("Google tokens:", tokens);

    res.send(`
      <h1>Google connected successfully</h1>
      <p>You can return to Student OS.</p>
      <pre>${JSON.stringify(tokens, null, 2)}</pre>
    `);
  } catch (error) {
    res.status(500).send("Google OAuth failed: " + error.message);
  }
});

app.use(requireAuth);


/**
 * Protected routes start here.
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

    const auth = getGoogleOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });

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
          start: {
            dateTime: block.startTime,
          },
          end: {
            dateTime: block.endTime,
          },
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

/**
 * Notion: Read academic dashboard
 */
app.get("/v2/notion/dashboard", async (req, res) => {
  try {
    const databaseId =
      req.query.dashboardId || process.env.NOTION_DASHBOARD_DATABASE_ID;

    if (!databaseId) {
      return res.status(400).json({
        error: "dashboardId or NOTION_DASHBOARD_DATABASE_ID is required",
      });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const items = response.results.map((page) => ({
      id: page.id,
      url: page.url,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
      properties: page.properties,
    }));

    res.json({
      dashboardId: databaseId,
      items,
    });
  } catch (error) {
    console.error("Notion read error:", error.body || error.message);

    res.status(500).json({
      error: "Failed to read Notion dashboard",
      details: error.body || error.message,
    });
  }
});

/**
 * Notion: Update academic dashboard item
 */
app.patch("/v2/notion/dashboard/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { updates } = req.body;

    if (!updates) {
      return res.status(400).json({
        error: "updates object is required",
      });
    }

    const response = await notion.pages.update({
      page_id: itemId,
      properties: updates.properties || {},
    });

    res.json({
      id: response.id,
      url: response.url,
      updated: true,
    });
  } catch (error) {
    console.error("Notion update error:", error.body || error.message);

    res.status(500).json({
      error: "Failed to update Notion dashboard item",
      details: error.body || error.message,
    });
  }
});

/**
 * Todoist: Create task list
 */
app.post("/v2/todoist/task-lists", async (req, res) => {
  try {
    const { title, tasks, projectId, sectionId } = req.body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({
        error: "tasks must be a non-empty array",
      });
    }

    const createdTasks = [];

    for (const task of tasks) {
      if (!task.content) {
        return res.status(400).json({
          error: "Each Todoist task requires content",
        });
      }

      const payload = {
        content: task.content,
        description: task.description || "",
        priority: task.priority || 1,
        labels: task.labels || [],
      };

      if (task.dueString) payload.due_string = task.dueString;
      if (task.dueDate) payload.due_date = task.dueDate;
      if (projectId) payload.project_id = projectId;
      if (sectionId) payload.section_id = sectionId;

      const response = await axios.post(
        "https://api.todoist.com/rest/v2/tasks",
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.TODOIST_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      createdTasks.push(response.data);
    }

    res.status(201).json({
      title: title || "Academic Task List",
      createdTasks,
    });
  } catch (error) {
    console.error("Todoist error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to create Todoist task list",
      details: error.response?.data || error.message,
    });
  }
});

/**
 * Google Sheets: Read academic progress
 */
app.get("/v2/sheets/progress", async (req, res) => {
  try {
    const { spreadsheetId, range = "Sheet1!A1:Z100" } = req.query;

    if (!spreadsheetId) {
      return res.status(400).json({
        error: "spreadsheetId is required",
      });
    }

    const auth = getGoogleOAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json({
      spreadsheetId,
      range,
      values: response.data.values || [],
    });
  } catch (error) {
    console.error("Sheets read error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to read Google Sheets progress",
      details: error.response?.data || error.message,
    });
  }
});

/**
 * Google Sheets: Update academic progress
 */
app.patch("/v2/sheets/progress", async (req, res) => {
  try {
    const { spreadsheetId, range, values } = req.body;

    if (!spreadsheetId || !range || !Array.isArray(values)) {
      return res.status(400).json({
        error: "spreadsheetId, range, and values array are required",
      });
    }

    const auth = getGoogleOAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    res.json({
      spreadsheetId,
      updatedRange: response.data.updatedRange,
      updatedRows: response.data.updatedRows,
      updatedColumns: response.data.updatedColumns,
      updatedCells: response.data.updatedCells,
    });
  } catch (error) {
    console.error("Sheets update error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to update Google Sheets progress",
      details: error.response?.data || error.message,
    });
  }
});

/**
 * GitHub: Read project progress
 */
app.get("/v2/github/projects/:owner/:repo/progress", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const [repoResponse, issuesResponse, pullsResponse, commitsResponse] =
      await Promise.all([
        axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
          headers,
        }),
        axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
          headers,
          params: {
            state: "all",
            per_page: 100,
          },
        }),
        axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
          headers,
          params: {
            state: "all",
            per_page: 100,
          },
        }),
        axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
          headers,
          params: {
            per_page: 10,
          },
        }),
      ]);

    const issuesOnly = issuesResponse.data.filter((item) => !item.pull_request);

    const openIssues = issuesOnly.filter((issue) => issue.state === "open").length;
    const closedIssues = issuesOnly.filter(
      (issue) => issue.state === "closed"
    ).length;

    const openPullRequests = pullsResponse.data.filter(
      (pr) => pr.state === "open"
    ).length;

    const mergedPullRequests = pullsResponse.data.filter(
      (pr) => pr.merged_at
    ).length;

    res.json({
      repository: `${owner}/${repo}`,
      defaultBranch: repoResponse.data.default_branch,
      openIssues,
      closedIssues,
      openPullRequests,
      mergedPullRequests,
      recentCommits: commitsResponse.data.map((commit) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author?.name,
        date: commit.commit.author?.date,
        url: commit.html_url,
      })),
    });
  } catch (error) {
    console.error("GitHub error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to read GitHub project progress",
      details: error.response?.data || error.message,
    });
  }
});

/**
 * Google Drive: Search academic files
 */
app.get("/v2/drive/files/search", async (req, res) => {
  try {
    const { query, mimeType, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "query is required",
      });
    }

    const auth = getGoogleOAuthClient();
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
      fields: "files(id,name,mimeType,webViewLink,modifiedTime)",
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

/**
 * Google Drive: Read academic file content
 */
app.get("/v2/drive/files/:fileId/content", async (req, res) => {
  try {
    const { fileId } = req.params;

    const auth = getGoogleOAuthClient();
    const drive = google.drive({ version: "v3", auth });

    const metadata = await drive.files.get({
      fileId,
      fields: "id,name,mimeType,webViewLink",
    });

    let text = "";

    const mimeType = metadata.data.mimeType;

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
    } else if (mimeType === "text/plain" || mimeType === "text/markdown") {
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
    } else {
      text =
        "This file type cannot be read as plain text by the current backend. Supported types: Google Docs, text/plain, text/markdown.";
    }

    res.json({
      fileId,
      name: metadata.data.name,
      mimeType,
      text,
      webViewLink: metadata.data.webViewLink,
    });
  } catch (error) {
    console.error("Drive read error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to read Google Drive file",
      details: error.response?.data || error.message,
    });
  }
});

/**
 * Local development support.
 * This runs only when you start locally with:
 * node api/index.js
 *
 * Vercel ignores app.listen and uses module.exports.
 */
if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Academic Execution API running on http://localhost:${port}`);
  });
}

module.exports = app;