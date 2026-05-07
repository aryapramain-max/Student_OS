function googleConnectedPage(userKey) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Google Connected | Semester OS</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
            --tiltX: 0deg;
            --tiltY: 0deg;
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
            min-height: 100vh;
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

          .success-shell {
            display: grid;
            grid-template-columns: 0.9fr 1.1fr;
            gap: 28px;
            align-items: center;
            padding: 74px 0 84px;
          }

          .hero-card {
            border: 1px solid var(--line);
            border-radius: 36px;
            background:
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 28%),
              rgba(255,255,255,0.035);
            padding: 34px;
            min-height: 560px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            box-shadow: 0 36px 90px rgba(0,0,0,0.36);
            transform: rotateX(var(--tiltY)) rotateY(var(--tiltX));
            transition: transform 0.18s ease;
          }

          .hero-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 34px 34px;
            opacity: 0.35;
          }

          .hero-content {
            position: relative;
            z-index: 1;
          }

          .badge {
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

          .badge::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 16px rgba(255,255,255,0.8);
          }

          h1 {
            margin: 0;
            font-size: clamp(48px, 7vw, 86px);
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
            margin: 26px 0 0;
            color: var(--muted);
            font-size: 18px;
            line-height: 1.75;
          }

          .logo-large {
            position: relative;
            z-index: 1;
            width: 160px;
            height: 160px;
            object-fit: contain;
            border-radius: 50%;
            align-self: flex-end;
            filter: drop-shadow(0 24px 40px rgba(0,0,0,0.42));
          }

          .key-card {
            border: 1px solid var(--line);
            border-radius: 36px;
            background:
              radial-gradient(circle at 80% 0%, rgba(255,255,255,0.075), transparent 30%),
              rgba(255,255,255,0.035);
            overflow: hidden;
            box-shadow: 0 36px 90px rgba(0,0,0,0.36);
          }

          .key-header {
            padding: 28px 30px;
            border-bottom: 1px solid var(--line);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .key-header h2 {
            margin: 0;
            font-size: 26px;
            letter-spacing: -0.055em;
          }

          .key-header p {
            margin: 6px 0 0;
            color: var(--muted);
            line-height: 1.55;
            font-size: 14px;
          }

          .status-pill {
            padding: 8px 12px;
            border-radius: 999px;
            background: #ffffff;
            color: #000000;
            font-size: 12px;
            font-weight: 950;
            white-space: nowrap;
          }

          .key-content {
            padding: 30px;
          }

          .section-label {
            margin-bottom: 10px;
            color: var(--soft);
            text-transform: uppercase;
            letter-spacing: 0.11em;
            font-size: 12px;
            font-weight: 950;
          }

          .copy-box {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
            border: 1px solid var(--line);
            border-radius: 24px;
            background: rgba(0,0,0,0.35);
            padding: 14px;
            margin-bottom: 22px;
          }

          .key-text,
          .prompt-text {
            overflow-x: auto;
            white-space: nowrap;
            color: var(--text);
            font-family: "SFMono-Regular", Consolas, Monaco, monospace;
            font-size: 14px;
            line-height: 1.6;
            padding: 4px 2px;
          }

          .prompt-box {
            border: 1px solid var(--line);
            border-radius: 24px;
            background: rgba(0,0,0,0.35);
            padding: 16px;
            margin-bottom: 16px;
          }

          .btn-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin: 18px 0 22px;
          }

          button,
          .btn {
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

          button {
            border: 0;
          }

          .btn-primary,
          .copy-btn {
            background: #ffffff;
            color: #000000;
            border: 1px solid #ffffff;
          }

          .btn-primary:hover,
          .copy-btn:hover {
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

          .notice {
            border: 1px solid var(--line);
            border-radius: 24px;
            background: rgba(255,255,255,0.05);
            padding: 18px;
            color: var(--muted);
            line-height: 1.75;
            font-size: 14px;
          }

          .steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 22px;
          }

          .step {
            border: 1px solid var(--line);
            border-radius: 22px;
            background: rgba(255,255,255,0.035);
            padding: 16px;
          }

          .step strong {
            display: block;
            font-size: 20px;
            margin-bottom: 6px;
            letter-spacing: -0.04em;
          }

          .step span {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
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
            .success-shell {
              grid-template-columns: 1fr;
            }

            .hero-card {
              min-height: 460px;
            }

            .steps {
              grid-template-columns: 1fr;
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

            .success-shell {
              padding-top: 44px;
            }

            .hero-card,
            .key-card {
              border-radius: 28px;
            }

            .hero-card,
            .key-content,
            .key-header {
              padding: 22px;
            }

            .key-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .copy-box {
              grid-template-columns: 1fr;
            }

            .btn-row {
              flex-direction: column;
            }

            .btn,
            button {
              width: 100%;
            }

            .logo-large {
              width: 120px;
              height: 120px;
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
                <a class="interactive" href="/privacy">Privacy</a>
                <a class="interactive" href="/terms">Terms</a>
              </div>
            </div>
          </nav>

          <section class="container success-shell">
            <div class="hero-card reveal" id="tiltArea">
              <div class="hero-content">
                <div class="badge">Google connected</div>

                <h1>
                  Your account
                  <span class="heading-accent">is ready.</span>
                </h1>

                <p class="subtitle">
                  Semester OS can now create Google Calendar study blocks and read supported
                  academic files from your connected Google account.
                </p>
              </div>

              <img class="logo-large" src="/logo.png" alt="Semester OS logo" />
            </div>

            <div class="key-card reveal">
              <div class="key-header">
                <div>
                  <h2>Your private Semester OS key</h2>
                  <p>Copy this key and paste it into the Semester OS GPT to activate connected actions.</p>
                </div>

                <div class="status-pill">CONNECTED</div>
              </div>

              <div class="key-content">
                <div class="section-label">Private user key</div>

                <div class="copy-box">
                  <div class="key-text" id="userKey">${userKey}</div>
                  <button class="copy-btn interactive" onclick="copyKey(this)">Copy key</button>
                </div>

                <div class="section-label">Paste this in the GPT</div>

                <div class="prompt-box">
                  <div class="prompt-text" id="promptText">My Semester OS user key is ${userKey}</div>
                </div>

                <div class="btn-row">
                  <button class="copy-btn interactive" onclick="copyPrompt(this)">Copy GPT message</button>
                  <a class="btn btn-secondary interactive" href="/">Back to Home</a>
                  <a class="btn btn-primary interactive" href="/privacy">Privacy Policy</a>
                </div>

                <div class="notice">
                  Keep this key private. Anyone with this key may be able to trigger connected
                  Semester OS actions through your account.
                </div>

                <div class="steps">
                  <div class="step">
                    <strong>01</strong>
                    <span>Copy your private key.</span>
                  </div>

                  <div class="step">
                    <strong>02</strong>
                    <span>Paste it into the Semester OS GPT.</span>
                  </div>

                  <div class="step">
                    <strong>03</strong>
                    <span>Plan, read Drive files, and schedule study blocks.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer>
            <div class="container footer-inner">
              <span>Semester OS · Made by Pranshu Mangale and Aryan Makwana</span>
              <span>
                <a class="interactive" href="/">Home</a>
                &nbsp;·&nbsp;
                <a class="interactive" href="/privacy">Privacy Policy</a>
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
          const tiltArea = document.getElementById("tiltArea");

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

          if (tiltArea && isFinePointer && !reduceMotion) {
            tiltArea.addEventListener("mousemove", function (e) {
              const rect = tiltArea.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;

              root.style.setProperty("--tiltX", ((px - 0.5) * 7) + "deg");
              root.style.setProperty("--tiltY", ((py - 0.5) * -7) + "deg");
            });

            tiltArea.addEventListener("mouseleave", function () {
              root.style.setProperty("--tiltX", "0deg");
              root.style.setProperty("--tiltY", "0deg");
            });
          }

          function copyKey(button) {
            const key = document.getElementById("userKey").innerText;
            navigator.clipboard.writeText(key);
            button.innerText = "Copied";
            setTimeout(function () {
              button.innerText = "Copy key";
            }, 1400);
          }

          function copyPrompt(button) {
            const text = document.getElementById("promptText").innerText;
            navigator.clipboard.writeText(text);
            button.innerText = "Copied";
            setTimeout(function () {
              button.innerText = "Copy GPT message";
            }, 1400);
          }

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

module.exports = googleConnectedPage;