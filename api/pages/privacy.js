function privacyPage() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS Privacy Policy</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            max-width: 820px;
            margin: 48px auto;
            line-height: 1.7;
            padding: 0 20px;
            color: #0f172a;
            background: #ffffff;
          }

          h1 {
            font-size: 40px;
            letter-spacing: -0.04em;
            margin-bottom: 8px;
          }

          h2 {
            margin-top: 32px;
            font-size: 22px;
            letter-spacing: -0.02em;
          }

          p, li {
            color: #475569;
            font-size: 16px;
          }

          a {
            color: #0f172a;
            font-weight: 700;
          }

          .meta {
            color: #64748b;
            margin-bottom: 32px;
          }

          footer {
            margin-top: 44px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>

      <body>
        <h1>Student OS Privacy Policy</h1>
        <p class="meta"><strong>Effective Date:</strong> May 3, 2026</p>

        <p>
          Student OS is an academic execution assistant that helps students plan,
          organize, and complete academic work. Student OS may connect to Google
          services only when authorized by the user.
        </p>

        <h2>Information We Access</h2>
        <p>
          Depending on the features used, Student OS may access:
        </p>
        <ul>
          <li>Google Calendar events, to create study blocks.</li>
          <li>Google Drive files, to search and read supported academic files.</li>
          <li>Google Sheets data, if progress tracking features are used.</li>
          <li>Your Google email address, to associate your connection with Student OS.</li>
        </ul>

        <h2>How Information Is Used</h2>
        <p>
          Information is used only to perform user-requested academic actions,
          such as creating study blocks, searching academic files, reading study
          material, summarizing notes, or helping create study plans.
        </p>

        <h2>Data Storage</h2>
        <p>
          Student OS stores a user connection key and Google refresh token so the
          user can continue using connected features. Users should keep their
          Student OS user key private.
        </p>

        <h2>Data Sharing</h2>
        <p>
          Student OS does not sell user data. Data is not shared with advertisers.
          Data may be sent to Google services only as needed to complete actions
          requested by the user.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Student OS integrates with Google services. Use of Google services is
          governed by Google's own terms and privacy policies.
        </p>

        <h2>Security</h2>
        <p>
          Student OS uses authentication to protect API requests. Users should not
          share private credentials, access tokens, OAuth tokens, or Student OS
          user keys with others.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, contact:
          <a href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
        </p>

        <footer>
          <a href="/">Home</a>
          &nbsp;·&nbsp;
          <a href="/terms">Terms of Service</a>
        </footer>
      </body>
    </html>
  `;
}

module.exports = privacyPage;