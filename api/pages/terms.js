function termsPage() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Terms of Service | Student OS</title>
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
            background: #eef2ff;
            color: #4338ca;
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
            background: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 20px;
            padding: 18px;
            color: #9a3412;
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
                <a href="/privacy">Privacy</a>
              </div>
            </nav>

            <section class="hero">
              <div class="badge">Terms of Service</div>
              <h1>Use Student OS responsibly.</h1>
              <p class="subtitle">
                Student OS is designed to help students plan, organize, and execute
                academic work. These terms explain how the service should be used.
              </p>
            </section>

            <section class="card">
              <div class="card-header">
                <p class="meta"><strong>Effective Date:</strong> May 3, 2026</p>
              </div>

              <div class="content">
                <div class="section">
                  <h2>Acceptance of Terms</h2>
                  <p>
                    By using Student OS, you agree to use the service responsibly
                    for academic planning, study organization, and productivity purposes.
                  </p>
                </div>

                <div class="section">
                  <h2>Use of Service</h2>
                  <p>
                    Student OS helps users create study plans, schedule study blocks,
                    and work with supported academic files. You agree not to misuse
                    the service or attempt to access another user's data.
                  </p>
                </div>

                <div class="section">
                  <h2>Connected Accounts</h2>
                  <p>
                    Student OS may connect to your Google account after you authorize
                    access. You are responsible for keeping your Student OS user key private.
                  </p>
                </div>

                <div class="section">
                  <h2>Academic Integrity</h2>
                  <p>
                    Student OS is designed to support legitimate studying, planning,
                    revision, and academic execution.
                  </p>
                  <ul>
                    <li>Do not use Student OS for cheating.</li>
                    <li>Do not use Student OS for plagiarism.</li>
                    <li>Do not use Student OS for fake attendance, fake documents, or dishonest academic behavior.</li>
                  </ul>
                </div>

                <div class="section">
                  <h2>Third-Party Services</h2>
                  <p>
                    Student OS integrates with Google services. Your use of those
                    services is subject to Google's own terms, policies, and availability.
                  </p>
                </div>

                <div class="section">
                  <h2>Availability</h2>
                  <p>
                    Student OS is provided as-is. We do not guarantee uninterrupted
                    service, error-free operation, or compatibility with every file type
                    or academic system.
                  </p>
                </div>

                <div class="section">
                  <h2>Limitation of Liability</h2>
                  <p>
                    Student OS is a planning and productivity tool. Users are responsible
                    for verifying deadlines, schedules, academic requirements, and submitted work.
                  </p>

                  <div class="notice">
                    Student OS can help plan and organize academic work, but users remain
                    responsible for their own academic decisions and outcomes.
                  </div>
                </div>

                <div class="section">
                  <h2>Contact</h2>
                  <p>
                    For questions, contact:
                    <a href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
                  </p>
                </div>
              </div>
            </section>

            <footer class="footer">
              <span>Student OS</span>
              <span>
                <a href="/">Home</a>
                &nbsp;·&nbsp;
                <a href="/privacy">Privacy Policy</a>
              </span>
            </footer>
          </div>
        </main>
      </body>
    </html>
  `;
}

module.exports = termsPage;