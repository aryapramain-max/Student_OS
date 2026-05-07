function privacyPage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Privacy Policy | Semester OS</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Privacy Policy for Semester OS, an academic execution system for students."
        />

        <style>
          :root {
            --bg: #050505;
            --surface: rgba(255, 255, 255, 0.045);
            --surface-2: rgba(255, 255, 255, 0.075);
            --line: rgba(255, 255, 255, 0.11);
            --line-strong: rgba(255, 255, 255, 0.22);
            --text: #f7f7f7;
            --muted: #a8a8a8;
            --soft: #737373;
            --white: #ffffff;
            --black: #000000;
            --mx: 50%;
            --my: 50%;
          }

          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            min-height: 100vh;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            background:
              radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.075), transparent 24%),
              radial-gradient(circle at 16% 18%, rgba(255,255,255,0.055), transparent 22%),
              radial-gradient(circle at 80% 12%, rgba(255,255,255,0.04), transparent 20%),
              linear-gradient(180deg, #050505 0%, #0a0a0a 52%, #050505 100%);
            color: var(--text);
            overflow-x: hidden;
          }

          body::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
            background-size: 44px 44px;
            opacity: 0.22;
            z-index: 0;
          }

          body::after {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 42%);
            z-index: 0;
          }

          @media (hover: hover) and (pointer: fine) {
            body,
            a,
            button {
              cursor: none;
            }
          }

          .cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 34px;
            height: 34px;
            margin-left: -17px;
            margin-top: -17px;
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
            display: none;
            transform: translate3d(0, 0, 0);
            transition: width 0.18s ease, height 0.18s ease, margin 0.18s ease;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.22);
            backdrop-filter: blur(12px);
            box-shadow: 0 0 28px rgba(255,255,255,0.12);
          }

          .cursor img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.22));
          }

          .cursor-ring {
            position: fixed;
            top: 0;
            left: 0;
            width: 58px;
            height: 58px;
            margin-left: -29px;
            margin-top: -29px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            display: none;
            opacity: 0.75;
            transform: translate3d(0, 0, 0);
            transition: width 0.18s ease, height 0.18s ease, margin 0.18s ease;
          }

          body.hovering .cursor {
            width: 48px;
            height: 48px;
            margin-left: -24px;
            margin-top: -24px;
          }

          body.hovering .cursor-ring {
            width: 86px;
            height: 86px;
            margin-left: -43px;
            margin-top: -43px;
          }

          @media (hover: hover) and (pointer: fine) {
            .cursor,
            .cursor-ring {
              display: block;
            }
          }

          .page {
            position: relative;
            z-index: 2;
          }

          .container {
            width: min(1120px, calc(100% - 40px));
            margin: 0 auto;
          }

          .nav {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(5, 5, 5, 0.74);
            backdrop-filter: blur(18px);
            border-bottom: 1px solid var(--line);
          }

          .nav-inner {
            min-height: 78px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .brand {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            color: var(--text);
            text-decoration: none;
            font-weight: 950;
            letter-spacing: -0.05em;
            font-size: 20px;
          }

          .brand-logo {
            width: 38px;
            height: 38px;
            object-fit: contain;
            border-radius: 50%;
            box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 12px 30px rgba(0,0,0,0.35);
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .nav-links a {
            color: var(--muted);
            text-decoration: none;
            font-size: 14px;
            font-weight: 750;
            padding: 10px 14px;
            border-radius: 999px;
            transition: 0.18s ease;
          }

          .nav-links a:hover {
            color: var(--white);
            background: rgba(255,255,255,0.08);
          }

          .hero {
            padding: 86px 0 44px;
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 14px;
            border: 1px solid var(--line-strong);
            border-radius: 999px;
            background: rgba(255,255,255,0.045);
            color: var(--muted);
            font-size: 13px;
            font-weight: 850;
            margin-bottom: 24px;
          }

          .eyebrow::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 16px rgba(255,255,255,0.8);
          }

          h1 {
            margin: 0;
            max-width: 980px;
            font-size: clamp(54px, 8vw, 108px);
            line-height: 0.88;
            letter-spacing: -0.09em;
            font-weight: 950;
          }

          .heading-accent {
            display: block;
            background: linear-gradient(90deg, #ffffff, #a8a8a8, #ffffff);
            background-size: 180% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 5s ease-in-out infinite;
          }

          @keyframes shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .subtitle {
            max-width: 760px;
            margin: 28px 0 0;
            color: var(--muted);
            font-size: 19px;
            line-height: 1.75;
          }

          .policy-shell {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 24px;
            align-items: start;
            padding: 28px 0 88px;
          }

          .side-card {
            position: sticky;
            top: 104px;
            border: 1px solid var(--line);
            border-radius: 30px;
            background:
              radial-gradient(circle at 30% 15%, rgba(255,255,255,0.07), transparent 28%),
              rgba(255,255,255,0.035);
            padding: 22px;
            overflow: hidden;
          }

          .side-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.35;
          }

          .side-content {
            position: relative;
            z-index: 1;
          }

          .side-logo {
            width: 62px;
            height: 62px;
            object-fit: contain;
            border-radius: 50%;
            margin-bottom: 18px;
            box-shadow: 0 0 0 1px rgba(255,255,255,0.14);
          }

          .side-card h2 {
            margin: 0 0 8px;
            font-size: 22px;
            letter-spacing: -0.04em;
          }

          .side-card p {
            margin: 0 0 20px;
            color: var(--muted);
            line-height: 1.6;
            font-size: 14px;
          }

          .toc {
            display: grid;
            gap: 8px;
            margin-top: 18px;
          }

          .toc a {
            color: var(--muted);
            text-decoration: none;
            font-size: 14px;
            font-weight: 750;
            padding: 10px 12px;
            border-radius: 14px;
            border: 1px solid transparent;
            transition: 0.18s ease;
          }

          .toc a:hover {
            color: var(--white);
            background: rgba(255,255,255,0.06);
            border-color: var(--line);
          }

          .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            background: #ffffff;
            color: #000000;
            font-size: 12px;
            font-weight: 950;
          }

          .status-pill::before {
            content: "";
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #000000;
          }

          .policy-card {
            border: 1px solid var(--line);
            border-radius: 36px;
            background:
              radial-gradient(circle at 70% 0%, rgba(255,255,255,0.075), transparent 30%),
              rgba(255,255,255,0.035);
            overflow: hidden;
            box-shadow: 0 36px 90px rgba(0,0,0,0.36);
          }

          .policy-header {
            padding: 26px 30px;
            border-bottom: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            gap: 20px;
            align-items: center;
          }

          .policy-header p {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.6;
          }

          .policy-header strong {
            color: var(--white);
          }

          .doc-badge {
            padding: 8px 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            color: var(--muted);
            font-size: 12px;
            font-weight: 850;
            white-space: nowrap;
          }

          .policy-content {
            padding: 4px 30px 32px;
          }

          .section {
            padding: 28px 0;
            border-bottom: 1px solid var(--line);
          }

          .section:last-child {
            border-bottom: 0;
          }

          .section h2 {
            margin: 0 0 12px;
            font-size: 28px;
            letter-spacing: -0.055em;
            line-height: 1;
          }

          .section p {
            margin: 0;
            color: var(--muted);
            line-height: 1.85;
            font-size: 16px;
          }

          .section p + p {
            margin-top: 14px;
          }

          .section ul {
            margin: 16px 0 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 12px;
          }

          .section li {
            display: grid;
            grid-template-columns: 28px 1fr;
            gap: 12px;
            color: var(--muted);
            line-height: 1.65;
            font-size: 15px;
          }

          .section li::before {
            content: "✓";
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
            font-size: 12px;
            font-weight: 950;
            margin-top: 1px;
          }

          .notice {
            margin-top: 18px;
            border: 1px solid var(--line);
            border-radius: 24px;
            background: rgba(255,255,255,0.05);
            padding: 18px;
            color: var(--muted);
            line-height: 1.75;
            font-size: 15px;
          }

          .link {
            color: #ffffff;
            font-weight: 850;
            text-decoration: underline;
            text-underline-offset: 4px;
          }

          .action-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 20px;
          }

          .btn {
            position: relative;
            min-height: 50px;
            padding: 0 18px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 900;
            transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          }

          .btn-primary {
            background: #ffffff;
            color: #000000;
            border: 1px solid #ffffff;
          }

          .btn-primary:hover {
            transform: translateY(-3px);
          }

          .btn-secondary {
            background: rgba(255,255,255,0.04);
            color: #ffffff;
            border: 1px solid var(--line-strong);
          }

          .btn-secondary:hover {
            transform: translateY(-3px);
            border-color: #ffffff;
          }

          footer {
            border-top: 1px solid var(--line);
            padding: 30px 0 42px;
          }

          .footer-inner {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            flex-wrap: wrap;
            color: var(--soft);
            font-size: 14px;
          }

          footer a {
            color: var(--white);
            text-decoration: none;
            font-weight: 800;
          }

          footer a:hover {
            text-decoration: underline;
          }

          .reveal {
            opacity: 0;
            transform: translateY(22px);
          }

          .reveal.show {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.65s ease, transform 0.65s cubic-bezier(.2,.8,.2,1);
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation: none !important;
              transition: none !important;
              scroll-behavior: auto !important;
            }
          }

          @media (max-width: 960px) {
            .policy-shell {
              grid-template-columns: 1fr;
            }

            .side-card {
              position: relative;
              top: auto;
            }

            .toc {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 720px) {
            .container {
              width: min(100% - 26px, 1120px);
            }

            .nav-inner {
              padding: 18px 0;
              flex-direction: column;
              align-items: flex-start;
            }

            .nav-links {
              width: 100%;
              overflow-x: auto;
              padding-bottom: 4px;
            }

            .nav-links a {
              white-space: nowrap;
            }

            .hero {
              padding-top: 62px;
            }

            .subtitle {
              font-size: 17px;
            }

            .policy-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .policy-content {
              padding-left: 22px;
              padding-right: 22px;
            }

            .policy-header {
              padding-left: 22px;
              padding-right: 22px;
            }

            .toc {
              grid-template-columns: 1fr;
            }

            .section h2 {
              font-size: 24px;
            }

            .action-row {
              flex-direction: column;
            }

            .btn {
              width: 100%;
            }
          }
        </style>
      </head>

      <body>
        <div class="cursor-ring" id="cursorRing"></div>
        <div class="cursor" id="cursor">
          <img src="/logo.png" alt="Semester OS cursor" />
        </div>

        <main class="page">
          <nav class="nav">
            <div class="container nav-inner">
              <a class="brand interactive" href="/">
                <img class="brand-logo" src="/logo.png" alt="Semester OS logo" />
                <span>Semester OS</span>
              </a>

              <div class="nav-links">
                <a class="interactive" href="/">Home</a>
                <a class="interactive" href="/connect/google">Connect</a>
                <a class="interactive" href="/terms">Terms</a>
              </div>
            </div>
          </nav>

          <section class="container hero">
            <div class="eyebrow">Privacy Policy</div>

            <h1>
              Your academic data
              <span class="heading-accent">stays yours.</span>
            </h1>

            <p class="subtitle">
              Semester OS connects to Google services only after you authorize access,
              and uses that access only to complete academic actions you request.
            </p>
          </section>

          <section class="container policy-shell">
            <aside class="side-card reveal">
              <div class="side-content">
                <img class="side-logo" src="/logo.png" alt="Semester OS logo" />

                <h2>Privacy Summary</h2>
                <p>
                  We use connected Google access to create study blocks, search academic files,
                  and help you execute your semester.
                </p>

                <div class="status-pill">Limited use</div>

                <div class="toc">
                  <a class="interactive" href="#overview">Overview</a>
                  <a class="interactive" href="#access">Data Access</a>
                  <a class="interactive" href="#usage">How We Use Data</a>
                  <a class="interactive" href="#storage">Storage</a>
                  <a class="interactive" href="#sharing">Sharing</a>
                  <a class="interactive" href="#security">Security</a>
                  <a class="interactive" href="#control">User Control</a>
                  <a class="interactive" href="#contact">Contact</a>
                </div>
              </div>
            </aside>

            <article class="policy-card reveal">
              <div class="policy-header">
                <p>
                  <strong>Effective Date:</strong> May 3, 2026<br />
                  This policy explains how Semester OS handles user data and connected Google access.
                </p>

                <div class="doc-badge">Version 1.0</div>
              </div>

              <div class="policy-content">
                <section class="section" id="overview">
                  <h2>Overview</h2>
                  <p>
                    Semester OS is an academic execution system that helps students plan,
                    organize, and complete academic work. It may connect to Google Calendar,
                    Google Drive, Google Sheets, and your Google profile only when authorized
                    by the user.
                  </p>
                </section>

                <section class="section" id="access">
                  <h2>Information We Access</h2>
                  <p>Depending on the features used, Semester OS may access:</p>

                  <ul>
                    <li>Google Calendar access to create study blocks and academic planning events.</li>
                    <li>Google Drive access to search and read supported academic files such as notes, syllabi, PDFs, Docs, Sheets, text files, and markdown files.</li>
                    <li>Google Sheets access if academic progress tracking features are used.</li>
                    <li>Your Google email address to associate your connected account with your Semester OS user key.</li>
                  </ul>
                </section>

                <section class="section" id="usage">
                  <h2>How We Use Information</h2>
                  <p>
                    Semester OS uses information only to perform user-requested academic actions.
                    This includes creating study blocks, searching academic files, reading study
                    materials, summarizing notes, extracting topics, and helping build study plans.
                  </p>

                  <div class="notice">
                    Semester OS does not use Google user data for advertising. It does not sell
                    user data and does not use connected Google data for unrelated purposes.
                  </div>
                </section>

                <section class="section" id="storage">
                  <h2>Data Storage</h2>
                  <p>
                    Semester OS stores a private user connection key and Google refresh token so
                    the user can continue using connected features after authorization.
                  </p>

                  <p>
                    Users should keep their Semester OS user key private. Anyone with access to
                    the user key may be able to trigger connected Semester OS actions.
                  </p>
                </section>

                <section class="section" id="sharing">
                  <h2>Data Sharing</h2>
                  <p>
                    Semester OS does not sell user data. Data is not shared with advertisers.
                    Data may be sent to Google services only as required to complete actions
                    requested by the user.
                  </p>

                  <p>
                    Semester OS may process data through its backend infrastructure in order to
                    complete user-requested actions, such as creating calendar events or reading
                    supported Drive files.
                  </p>
                </section>

                <section class="section" id="security">
                  <h2>Security</h2>
                  <p>
                    Semester OS uses authentication to protect API requests. Users should not share
                    private credentials, access tokens, OAuth tokens, refresh tokens, passwords, or
                    Semester OS user keys with others.
                  </p>
                </section>

                <section class="section" id="control">
                  <h2>User Control</h2>
                  <p>
                    Users can stop using Semester OS at any time. Users may also revoke Google access
                    from their Google Account permissions page.
                  </p>

                  <p>
                    To request deletion of stored connection data, contact us using the email below.
                  </p>

                  <div class="action-row">
                    <a class="btn btn-primary interactive" href="/connect/google">Connect Google</a>
                    <a class="btn btn-secondary interactive" href="/terms">View Terms</a>
                  </div>
                </section>

                <section class="section" id="contact">
                  <h2>Contact</h2>
                  <p>
                    For privacy questions or deletion requests, contact:
                    <a class="link interactive" href="mailto:aryapramain@gmail.com">aryapramain@gmail.com</a>
                  </p>
                </section>
              </div>
            </article>
          </section>

          <footer>
            <div class="container footer-inner">
              <span>Semester OS · Made by Pranshu Mangale and Aryan Makwana</span>
              <span>
                <a class="interactive" href="/">Home</a>
                &nbsp;·&nbsp;
                <a class="interactive" href="/terms">Terms of Service</a>
              </span>
            </div>
          </footer>
        </main>

        <script>
          const root = document.documentElement;
          const cursor = document.getElementById("cursor");
          const cursorRing = document.getElementById("cursorRing");

          const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          let mouseX = window.innerWidth / 2;
          let mouseY = window.innerHeight / 2;
          let cursorX = mouseX;
          let cursorY = mouseY;
          let ticking = false;

          function updateRootPointer() {
            const xPercent = (mouseX / window.innerWidth) * 100;
            const yPercent = (mouseY / window.innerHeight) * 100;

            root.style.setProperty("--mx", xPercent + "%");
            root.style.setProperty("--my", yPercent + "%");

            ticking = false;
          }

          if (isFinePointer && !reduceMotion) {
            window.addEventListener("mousemove", function (e) {
              mouseX = e.clientX;
              mouseY = e.clientY;

              if (!ticking) {
                window.requestAnimationFrame(updateRootPointer);
                ticking = true;
              }
            });

            function animateCursor() {
              cursorX += (mouseX - cursorX) * 0.20;
              cursorY += (mouseY - cursorY) * 0.20;

              if (cursor) {
                cursor.style.transform = "translate3d(" + cursorX + "px," + cursorY + "px,0)";
              }

              if (cursorRing) {
                cursorRing.style.transform = "translate3d(" + cursorX + "px," + cursorY + "px,0)";
              }

              window.requestAnimationFrame(animateCursor);
            }

            animateCursor();
          }

          document.querySelectorAll(".interactive").forEach(function (el) {
            el.addEventListener("mouseenter", function () {
              document.body.classList.add("hovering");
            });

            el.addEventListener("mouseleave", function () {
              document.body.classList.remove("hovering");
            });
          });

          const revealItems = document.querySelectorAll(".reveal");

          if ("IntersectionObserver" in window && !reduceMotion) {
            const observer = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show");
                  observer.unobserve(entry.target);
                }
              });
            }, { threshold: 0.14 });

            revealItems.forEach(function (item) {
              observer.observe(item);
            });
          } else {
            revealItems.forEach(function (item) {
              item.classList.add("show");
            });
          }
        </script>
      </body>
    </html>
  `;
}

module.exports = privacyPage;