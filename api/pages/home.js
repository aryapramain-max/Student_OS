function homePage() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Student OS</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 48px 20px;
          }

          .container {
            width: 100%;
            max-width: 920px;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: #eef2ff;
            color: #4338ca;
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 24px;
          }

          h1 {
            margin: 0;
            font-size: clamp(42px, 7vw, 76px);
            line-height: 0.95;
            letter-spacing: -0.06em;
          }

          .subtitle {
            max-width: 680px;
            margin: 24px 0 32px;
            font-size: 20px;
            line-height: 1.6;
            color: #475569;
          }

          .actions {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-bottom: 56px;
          }

          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 18px;
            border-radius: 14px;
            font-weight: 800;
            text-decoration: none;
            transition: 0.15s ease;
          }

          .btn-primary {
            background: #0f172a;
            color: white;
          }

          .btn-primary:hover {
            background: #020617;
            transform: translateY(-1px);
          }

          .btn-secondary {
            background: white;
            color: #0f172a;
            border: 1px solid #e2e8f0;
          }

          .btn-secondary:hover {
            border-color: #cbd5e1;
            transform: translateY(-1px);
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 44px;
          }

          .card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 22px;
            box-shadow: 0 18px 50px rgba(15, 23, 42, 0.06);
          }

          .card h3 {
            margin: 0 0 8px;
            font-size: 18px;
          }

          .card p {
            margin: 0;
            color: #64748b;
            line-height: 1.5;
            font-size: 15px;
          }

          .section {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 28px;
            margin-bottom: 24px;
          }

          .section h2 {
            margin: 0 0 14px;
            font-size: 24px;
            letter-spacing: -0.03em;
          }

          ol {
            margin: 0;
            padding-left: 22px;
            color: #475569;
            line-height: 1.8;
          }

          footer {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
            padding: 24px 0 0;
            color: #64748b;
            font-size: 14px;
          }

          footer a {
            color: #0f172a;
            text-decoration: none;
            font-weight: 700;
          }

          footer a:hover {
            text-decoration: underline;
          }

          @media (max-width: 760px) {
            .grid {
              grid-template-columns: 1fr;
            }

            .subtitle {
              font-size: 18px;
            }
          }
        </style>
      </head>

      <body>
        <main class="page">
          <div class="container">
            <div class="badge">Academic execution system for students</div>

            <h1>Turn academic chaos into execution.</h1>

            <p class="subtitle">
              Student OS helps students plan study schedules, break down academic work,
              read study materials from Google Drive, and create focused Google Calendar
              study blocks using their own connected Google account.
            </p>

            <div class="actions">
              <a class="btn btn-primary" href="/connect/google">Connect Google</a>
              <a class="btn btn-secondary" href="/privacy">Privacy Policy</a>
            </div>

            <section class="grid">
              <div class="card">
                <h3>Plan study blocks</h3>
                <p>Create focused calendar sessions for exams, assignments, revision, and projects.</p>
              </div>

              <div class="card">
                <h3>Use your files</h3>
                <p>Search and read supported Google Drive files like notes, syllabi, docs, and PDFs.</p>
              </div>

              <div class="card">
                <h3>Execute clearly</h3>
                <p>Turn vague goals into realistic daily and weekly academic execution plans.</p>
              </div>
            </section>

            <section class="section">
              <h2>How it works</h2>
              <ol>
                <li>Connect your Google account.</li>
                <li>Copy your private Student OS user key.</li>
                <li>Paste the key into the Student OS GPT.</li>
                <li>Ask it to plan, read study material, or schedule focused study blocks.</li>
              </ol>
            </section>

            <footer>
              <span>Student OS</span>
              <span>
                <a href="/privacy">Privacy Policy</a>
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

module.exports = homePage;