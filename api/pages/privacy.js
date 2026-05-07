function privacyPage() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Privacy Policy | Student OS</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            background: #f8fafc;
            color: #0f172a;
          }

          .page {
            min-height: 100vh;
            padding: 48px 20px;
          }

          .container {
            max-width: 920px;
            margin: 0 auto;
          }

          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin-bottom: 56px;
          }

          .brand {
            font-weight: 900;
            letter-spacing: -0.04em;
            font-size: 20px;
            color: #0f172a;
            text-decoration: none;
          }

          .nav-links {
            display: flex;
            gap: 18px;
            flex-wrap: wrap;
          }

          .nav-links a {
            color: #475569;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
          }

          .nav-links a:hover {
            color: #0f172a;
          }

          .hero {
            margin-bottom: 32px;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: #ecfdf5;
            color: #047857;
            font-size: 14px;
            font-weight: 800;
            margin-bottom: 20px;
          }

          h1 {
            margin: 0;
            font-size: clamp(40px, 6vw, 68px);
            line-height: 0.98;
            letter-spacing: -0.06em;
          }

          .subtitle {
            max-width: 720px;
            margin: 22px 0 0;
            font-size: 19px;
            line-height: 1.65;
            color: #475569;
          }

          .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 28px;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.07);
            overflow: hidden;
          }

          .card-header {
            padding: 28px 32px;
            border-bottom: 1px solid #e2e8f0;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          }

          .meta {
            margin: 0;
            color: #64748b;
            font-size: 14px;
            font-weight: 600;
          }

          .content {
            padding: 8px 32px 34px;
          }

          .section {
            padding: 26px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .section:last-child {
            border-bottom: 0;
          }

          h2 {
            margin: 0 0 10px;
            font-size: 22px;
            letter-spacing: -0.03em;
          }

          p {
            margin: 0;
            color: #475569;
            line-height: 1.75;
            font-size: 16px;
          }

          ul {
            margin: 12px 0 0;
            padding-left: 22px;
            color: #475569;
            line-height: 1.8;
          }

          li {
            margin-bottom: 6px;
          }

          a {
            color: #0f172a;
            font-weight: 800;
          }

          .notice {
            margin-top: 24px;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 18px;
            color: #475569;
            line-height: 1.65;
          }

          .footer {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
            margin-top: 28px;
            padding-top: 24px;
            color: #64748b;
            font-size: 14px;
          }

          .footer a {
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }

          @media (max-width: 640px) {
            .nav {
              align-items: flex-start;
              flex-direction: column;
              margin-bottom: 36px;
            }

            .card-header,
            .content {
              padding-left: 22px;
              padding-right: 22px;
            }

            .subtitle {
              font-size: 17px;
            }
          }
        </style>
      </head>

      <body>
        <main class="page">
          <div class="container">
            <nav class="nav">
              <a class="brand" href="/">Student OS</a>
              <div class="nav-links">
                <a href="/">Home</a>
                <a href="/connect/google">Connect Google</a>
                <a href="/terms">Terms</a>
              </div>
            </nav>

            <section class="hero">
              <div class="badge">Privacy Policy</div>
              <h1>Your academic data stays yours.</h1>
              <p class="subtitle">
                Student OS connects to Google services only after you authorize access,
                and only uses that access to complete actions you request.
              </p>
            </section>

            <section class="card">
              <div class="card-header">
                <p class="meta"><strong>Effective Date:</strong> May 3, 2026</p>
              </div>

              <div class="content">
                <div class="section">
                  <h2>Overview</h2>
                  <p>
                    Student OS is an academic execution assistant that helps users plan,
                    organize, and complete academic work. It can connect to Google services
                    such as Google Calendar, Google Drive, and Google Sheets when authorized
                    by the user.
                  </p>
                </div>

                <div class="section">
                  <h2>Information We Access</h2>
                  <p>Depending on the features used, Student OS may access:</p>
                  <ul>
                    <li>Google Calendar events, to create study blocks.</li>
                    <li>Google Drive files, to search and read supported academic materials.</li>
                    <li>Google Sheets data, if progress tracking features are used.</li>
                    <li>Your Google email address, to associate your connection with Student OS.</li>
                  </ul>
                </div>

                <div class="section">
                  <h2>How We Use Information</h2>
                  <p>
                    Information is used only to perform user-requested academic actions,
                    such as creating study blocks, searching academic files, reading study
                    material, summarizing notes, or helping create study plans.
                  </p>
                </div>

                <div class="section">
                  <h2>Data Storage</h2>
                  <p>
                    Student OS stores a private user connection key and Google refresh token
                    so users can continue using connected features. Users should keep their
                    Student OS user key private.
                  </p>
                </div>

                <div class="section">
                  <h2>Data Sharing</h2>
                  <p>
                    Student OS does not sell user data. Data is not shared with advertisers.
                    Data may be sent to Google services only as needed to complete actions
                    requested by the user.
                  </p>
                </div>

                <div class="section">
                  <h2>Third-Party Services</h2>
                  <p>
                    Student OS integrates with Google services. Use of Google services is
                    governed by Google's own terms and privacy policies.
                  </p>
                </div>

                <div class="section">
                  <h2>Security</h2>
                  <p>
                    Student OS uses authentication to protect API requests. Users should not
                    share private credentials, access tokens, OAuth tokens, or Student OS
                    user keys with others.
                  </p>
                </div>

                <div class="section">
                  <h2>Contact</h2>
                  <p>
                    For privacy questions, contact:
                    <a href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
                  </p>

                  <div class="notice">
                    Student OS is designed for academic planning and productivity.
                    Users remain responsible for verifying deadlines, schedules, and
                    academic requirements.
                  </div>
                </div>
              </div>
            </section>

            <footer class="footer">
              <span>Student OS</span>
              <span>
                <a href="/">Home</a>
                &nbsp;·&nbsp;
                <a href="/terms">Terms of Service</a>
              </span>
            </footer>
          </div>
        </main>
      </body>
    </html>
  `;
}

module.exports = privacyPage;