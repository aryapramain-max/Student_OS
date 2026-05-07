function termsPage() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS Terms of Service</title>
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
        <h1>Student OS Terms of Service</h1>
        <p class="meta"><strong>Effective Date:</strong> May 3, 2026</p>

        <p>
          By using Student OS, you agree to use the service responsibly for
          academic planning, study organization, and productivity purposes.
        </p>

        <h2>Use of Service</h2>
        <p>
          Student OS helps users create study plans, schedule study blocks, and
          work with supported academic files. You agree not to misuse the service
          or attempt to access another user's data.
        </p>

        <h2>Connected Accounts</h2>
        <p>
          Student OS may connect to your Google account after you authorize access.
          You are responsible for keeping your Student OS user key private.
        </p>

        <h2>Academic Integrity</h2>
        <p>
          Student OS is designed to support legitimate studying, planning,
          revision, and academic execution. You may not use Student OS for cheating,
          plagiarism, fake documents, fake attendance, or dishonest academic behavior.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Student OS integrates with Google services. Your use of those services is
          subject to Google's own terms, policies, and availability.
        </p>

        <h2>Availability</h2>
        <p>
          Student OS is provided as-is. We do not guarantee uninterrupted service,
          error-free operation, or compatibility with every file type or academic system.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Student OS is a planning and productivity tool. Users are responsible for
          verifying deadlines, schedules, academic requirements, and submitted work.
        </p>

        <h2>Contact</h2>
        <p>
          For questions, contact:
          <a href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
        </p>

        <footer>
          <a href="/">Home</a>
          &nbsp;·&nbsp;
          <a href="/privacy">Privacy Policy</a>
        </footer>
      </body>
    </html>
  `;
}

module.exports = termsPage;