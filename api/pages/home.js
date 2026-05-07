function homePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Semester OS</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Semester OS is an academic execution system that helps students plan, organize, and execute their semester with Google Calendar and Google Drive."
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
            transition: width 0.18s ease, height 0.18s ease, margin 0.18s ease, opacity 0.18s ease;
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
            width: min(1200px, calc(100% - 40px));
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
            display: grid;
            grid-template-columns: 1.02fr 0.98fr;
            gap: 52px;
            align-items: center;
            padding: 92px 0 72px;
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
            font-size: clamp(58px, 8vw, 112px);
            line-height: 0.86;
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
            max-width: 710px;
            margin: 28px 0 34px;
            color: var(--muted);
            font-size: 19px;
            line-height: 1.75;
          }

          .actions {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-bottom: 28px;
          }

          .btn {
            position: relative;
            min-height: 54px;
            padding: 0 22px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 900;
            overflow: hidden;
            transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          }

          .btn::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--btnX, 50%) var(--btnY, 50%), rgba(255,255,255,0.22), transparent 32%);
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          .btn:hover::before {
            opacity: 1;
          }

          .btn span {
            position: relative;
            z-index: 1;
          }

          .btn-primary {
            background: #ffffff;
            color: #000000;
            border: 1px solid #ffffff;
            box-shadow: 0 16px 44px rgba(255,255,255,0.08);
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

          .made-by {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            color: var(--soft);
            font-size: 14px;
          }

          .made-by strong {
            color: var(--white);
          }

          .deck-wrap {
            perspective: 1200px;
          }

          .command-deck {
            position: relative;
            min-height: 620px;
            border-radius: 38px;
            border: 1px solid var(--line);
            background:
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 28%),
              linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025));
            box-shadow: 0 36px 90px rgba(0,0,0,0.42);
            overflow: hidden;
            transform: rotateX(var(--tiltY)) rotateY(var(--tiltX));
            transition: transform 0.18s ease;
          }

          .command-deck::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
            background-size: 36px 36px;
            opacity: 0.24;
          }

          .command-deck::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--cardX, 50%) var(--cardY, 40%), rgba(255,255,255,0.14), transparent 28%);
            pointer-events: none;
          }

          .deck-header {
            position: relative;
            z-index: 2;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            border-bottom: 1px solid var(--line);
          }

          .deck-title {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .deck-title img {
            width: 42px;
            height: 42px;
            object-fit: contain;
            border-radius: 50%;
          }

          .deck-title h2 {
            margin: 0;
            font-size: 18px;
            letter-spacing: -0.04em;
          }

          .deck-title p {
            margin: 3px 0 0;
            color: var(--muted);
            font-size: 13px;
          }

          .status-pill {
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.08);
            border: 1px solid var(--line);
            color: #ffffff;
            font-size: 12px;
            font-weight: 850;
            white-space: nowrap;
          }

          .deck-main {
            position: relative;
            z-index: 2;
            padding: 24px;
            display: grid;
            gap: 16px;
          }

          .mission-card {
            border: 1px solid var(--line);
            border-radius: 28px;
            padding: 24px;
            background: rgba(0,0,0,0.32);
            backdrop-filter: blur(18px);
          }

          .mission-top {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .mission-card h3 {
            margin: 0;
            font-size: 30px;
            letter-spacing: -0.06em;
            line-height: 1;
          }

          .mission-card p {
            margin: 8px 0 0;
            color: var(--muted);
            line-height: 1.55;
            font-size: 14px;
          }

          .score {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: conic-gradient(#ffffff 0 78%, rgba(255,255,255,0.14) 78% 100%);
            display: grid;
            place-items: center;
            flex: 0 0 auto;
          }

          .score::before {
            content: "78%";
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #050505;
            color: #fff;
            display: grid;
            place-items: center;
            font-size: 13px;
            font-weight: 950;
          }

          .track {
            display: grid;
            gap: 10px;
          }

          .track-row {
            display: grid;
            grid-template-columns: 96px 1fr 42px;
            align-items: center;
            gap: 12px;
            color: var(--muted);
            font-size: 13px;
            font-weight: 750;
          }

          .bar {
            height: 8px;
            border-radius: 999px;
            background: rgba(255,255,255,0.09);
            overflow: hidden;
          }

          .bar span {
            display: block;
            height: 100%;
            border-radius: inherit;
            background: #ffffff;
            transform-origin: left;
          }

          .cards-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .metric {
            border: 1px solid var(--line);
            border-radius: 22px;
            padding: 16px;
            background: rgba(255,255,255,0.045);
            transition: transform 0.2s ease, background 0.2s ease;
          }

          .metric:hover {
            transform: translateY(-4px);
            background: rgba(255,255,255,0.07);
          }

          .metric strong {
            display: block;
            font-size: 28px;
            letter-spacing: -0.06em;
            margin-bottom: 2px;
          }

          .metric span {
            color: var(--muted);
            font-size: 12px;
            font-weight: 750;
          }

          .queue {
            border: 1px solid var(--line);
            border-radius: 28px;
            overflow: hidden;
            background: rgba(255,255,255,0.035);
          }

          .queue-head {
            padding: 16px 18px;
            border-bottom: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            gap: 12px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 900;
          }

          .queue-item {
            display: grid;
            grid-template-columns: 28px 1fr auto;
            gap: 12px;
            align-items: center;
            padding: 14px 18px;
            border-bottom: 1px solid var(--line);
          }

          .queue-item:last-child {
            border-bottom: 0;
          }

          .check {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
            font-size: 13px;
            font-weight: 950;
          }

          .queue-item h4 {
            margin: 0;
            font-size: 14px;
            letter-spacing: -0.02em;
          }

          .queue-item p {
            margin: 2px 0 0;
            color: var(--muted);
            font-size: 12px;
          }

          .tag {
            color: #000000;
            background: #ffffff;
            border-radius: 999px;
            padding: 7px 9px;
            font-size: 11px;
            font-weight: 950;
            white-space: nowrap;
          }

          .features {
            padding: 18px 0 76px;
          }

          .section-heading {
            display: flex;
            align-items: end;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 24px;
          }

          .section-heading h2 {
            margin: 0;
            font-size: clamp(34px, 5vw, 58px);
            line-height: 0.96;
            letter-spacing: -0.07em;
          }

          .section-heading p {
            max-width: 480px;
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
          }

          .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .feature-card {
            min-height: 248px;
            border-radius: 30px;
            border: 1px solid var(--line);
            background: rgba(255,255,255,0.035);
            padding: 24px;
            transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          }

          .feature-card:hover {
            transform: translateY(-7px);
            border-color: rgba(255,255,255,0.32);
            background: rgba(255,255,255,0.06);
          }

          .feature-icon {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            background: #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
            font-weight: 950;
            margin-bottom: 42px;
          }

          .feature-card h3 {
            margin: 0 0 10px;
            font-size: 24px;
            letter-spacing: -0.04em;
          }

          .feature-card p {
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
          }

          .workflow {
            padding: 0 0 82px;
          }

          .workflow-card {
            border-radius: 34px;
            border: 1px solid var(--line);
            overflow: hidden;
            background: rgba(255,255,255,0.032);
          }

          .workflow-row {
            display: grid;
            grid-template-columns: 80px 1fr 1fr;
            gap: 18px;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid var(--line);
            transition: background 0.18s ease;
          }

          .workflow-row:last-child {
            border-bottom: 0;
          }

          .workflow-row:hover {
            background: rgba(255,255,255,0.045);
          }

          .step {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
            font-size: 16px;
            font-weight: 950;
          }

          .workflow-row h3 {
            margin: 0;
            font-size: 22px;
            letter-spacing: -0.04em;
          }

          .workflow-row p {
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
          }

          .cta {
            padding: 0 0 92px;
          }

          .cta-box {
            border-radius: 40px;
            border: 1px solid var(--line-strong);
            background: #ffffff;
            color: #000000;
            padding: 48px;
            box-shadow: 0 38px 100px rgba(0,0,0,0.3);
          }

          .cta-content {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 24px;
            align-items: center;
          }

          .cta h2 {
            margin: 0 0 12px;
            font-size: clamp(36px, 5vw, 64px);
            line-height: 0.95;
            letter-spacing: -0.075em;
          }

          .cta p {
            margin: 0;
            max-width: 620px;
            color: #3b3b3b;
            line-height: 1.7;
            font-size: 17px;
          }

          .cta .btn-primary {
            background: #000000;
            color: #ffffff;
            border-color: #000000;
            white-space: nowrap;
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

          @media (max-width: 980px) {
            .hero {
              grid-template-columns: 1fr;
              padding-top: 68px;
            }

            .command-deck {
              min-height: auto;
            }

            .feature-grid {
              grid-template-columns: 1fr;
            }

            .section-heading {
              flex-direction: column;
              align-items: flex-start;
            }

            .workflow-row {
              grid-template-columns: 1fr;
            }

            .cta-content {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 720px) {
            .container {
              width: min(100% - 26px, 1200px);
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

            .subtitle {
              font-size: 17px;
            }

            .actions {
              flex-direction: column;
              align-items: stretch;
            }

            .btn {
              width: 100%;
            }

            .cards-row,
            .semester-stats {
              grid-template-columns: 1fr;
            }

            .mission-top {
              flex-direction: column;
            }

            .track-row {
              grid-template-columns: 80px 1fr 34px;
            }

            .queue-item {
              grid-template-columns: 28px 1fr;
            }

            .tag {
              grid-column: 2;
              width: max-content;
            }

            .cta-box {
              padding: 30px;
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
                <a class="interactive" href="#features">Features</a>
                <a class="interactive" href="#workflow">Workflow</a>
                <a class="interactive" href="/connect/google">Connect</a>
                <a class="interactive" href="/privacy">Privacy</a>
                <a class="interactive" href="/terms">Terms</a>
              </div>
            </div>
          </nav>

          <section class="container hero">
            <div>
              <div class="eyebrow">Academic execution system for students</div>

              <h1>
                Run your
                <span class="heading-accent">semester</span>
                like an OS.
              </h1>

              <p class="subtitle">
                Semester OS helps students convert semester chaos into clarity — plan exam prep,
                organize assignments, read academic material from Google Drive, and create focused
                Google Calendar study blocks through one clean system.
              </p>

              <div class="actions">
                <a class="btn btn-primary interactive magnetic" href="/connect/google">
                  <span>Connect Google</span>
                  <span>→</span>
                </a>

                <a class="btn btn-secondary interactive magnetic" href="/privacy">
                  <span>View Privacy Policy</span>
                </a>
              </div>

              <div class="made-by">
                <span>Made by</span>
                <strong>Pranshu Mangale</strong>
                <span>and</span>
                <strong>Aryan Makwana</strong>
              </div>
            </div>

            <div class="deck-wrap" id="tiltArea">
              <div class="command-deck" id="tiltCard">
                <div class="deck-header">
                  <div class="deck-title">
                    <img src="/logo.png" alt="Semester OS" />
                    <div>
                      <h2>Semester Command Deck</h2>
                      <p>Academic workload mapped into execution</p>
                    </div>
                  </div>

                  <div class="status-pill">LIVE SYSTEM</div>
                </div>

                <div class="deck-main">
                  <section class="mission-card interactive">
                    <div class="mission-top">
                      <div>
                        <h3>Exam Sprint Active</h3>
                        <p>
                          Semester OS turns Drive files, deadlines, and study goals into
                          practical study blocks and daily execution.
                        </p>
                      </div>

                      <div class="score"></div>
                    </div>

                    <div class="track">
                      <div class="track-row">
                        <span>Revision</span>
                        <div class="bar"><span style="width: 78%;"></span></div>
                        <span>78</span>
                      </div>

                      <div class="track-row">
                        <span>Practice</span>
                        <div class="bar"><span style="width: 64%;"></span></div>
                        <span>64</span>
                      </div>

                      <div class="track-row">
                        <span>Backlog</span>
                        <div class="bar"><span style="width: 42%;"></span></div>
                        <span>42</span>
                      </div>
                    </div>
                  </section>

                  <section class="cards-row">
                    <div class="metric interactive">
                      <strong>12</strong>
                      <span>Study blocks planned</span>
                    </div>

                    <div class="metric interactive">
                      <strong>04</strong>
                      <span>Subjects prioritized</span>
                    </div>

                    <div class="metric interactive">
                      <strong>09</strong>
                      <span>Drive files scanned</span>
                    </div>
                  </section>

                  <section class="queue">
                    <div class="queue-head">
                      <span>Today’s Execution Queue</span>
                      <span>Priority ordered</span>
                    </div>

                    <div class="queue-item interactive">
                      <div class="check">1</div>
                      <div>
                        <h4>Physics numericals sprint</h4>
                        <p>High impact · weak area · exam risk</p>
                      </div>
                      <span class="tag">Critical</span>
                    </div>

                    <div class="queue-item interactive">
                      <div class="check">2</div>
                      <div>
                        <h4>Math formula revision</h4>
                        <p>Fast recall · scoring topic · short block</p>
                      </div>
                      <span class="tag">High</span>
                    </div>

                    <div class="queue-item interactive">
                      <div class="check">3</div>
                      <div>
                        <h4>Assignment final polish</h4>
                        <p>Deadline protection · submission ready</p>
                      </div>
                      <span class="tag">Due</span>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          <section class="container features" id="features">
            <div class="section-heading reveal">
              <h2>Built for the reality of student life.</h2>
              <p>
                Semester OS is not generic productivity. It is designed around real semester pressure:
                midsems, finals, assignments, backlogs, projects, and daily execution.
              </p>
            </div>

            <div class="feature-grid">
              <article class="feature-card interactive reveal">
                <div class="feature-icon">01</div>
                <h3>Plan study blocks</h3>
                <p>
                  Create focused calendar sessions for exam prep, revision, assignment work,
                  practicals, projects, and backlog recovery.
                </p>
              </article>

              <article class="feature-card interactive reveal">
                <div class="feature-icon">02</div>
                <h3>Use your Drive</h3>
                <p>
                  Search and read supported Google Drive files such as notes, syllabi, Google Docs,
                  Sheets, PDFs, markdown, and text files.
                </p>
              </article>

              <article class="feature-card interactive reveal">
                <div class="feature-icon">03</div>
                <h3>Execute clearly</h3>
                <p>
                  Turn vague academic stress into priorities, execution plans, study sprints,
                  and realistic next actions.
                </p>
              </article>
            </div>
          </section>

          <section class="container workflow" id="workflow">
            <div class="section-heading reveal">
              <h2>How Semester OS works.</h2>
              <p>
                Connect your account once, paste your private key into the GPT,
                and start turning your semester into an operating system.
              </p>
            </div>

            <div class="workflow-card">
              <div class="workflow-row interactive reveal">
                <div class="step">1</div>
                <h3>Connect Google</h3>
                <p>Authorize Semester OS to create calendar study blocks and read supported Drive files.</p>
              </div>

              <div class="workflow-row interactive reveal">
                <div class="step">2</div>
                <h3>Copy your private key</h3>
                <p>You get a private Semester OS user key that links the GPT to your connected account.</p>
              </div>

              <div class="workflow-row interactive reveal">
                <div class="step">3</div>
                <h3>Plan with the GPT</h3>
                <p>Ask it to break down exams, read notes, build study plans, or organize your semester workflow.</p>
              </div>

              <div class="workflow-row interactive reveal">
                <div class="step">4</div>
                <h3>Execute the semester</h3>
                <p>Your goals become actual study blocks, structured plans, and concrete academic execution.</p>
              </div>
            </div>
          </section>

          <section class="container cta">
            <div class="cta-box reveal">
              <div class="cta-content">
                <div>
                  <h2>Ready to operate your semester?</h2>
                  <p>
                    Connect your Google account and start using Semester OS to transform
                    deadlines, files, and study goals into execution.
                  </p>
                </div>

                <a class="btn btn-primary interactive magnetic" href="/connect/google">
                  <span>Connect Google</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </section>

          <footer>
            <div class="container footer-inner">
              <span>Semester OS · Made by Pranshu Mangale and Aryan Makwana</span>
              <span>
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
          const tiltCard = document.getElementById("tiltCard");

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

          document.querySelectorAll(".magnetic").forEach(function (el) {
            el.addEventListener("mousemove", function (e) {
              if (!isFinePointer || reduceMotion) return;

              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;

              el.style.transform = "translate(" + (x * 0.08) + "px," + (y * 0.08) + "px) translateY(-3px)";
              el.style.setProperty("--btnX", (e.clientX - rect.left) + "px");
              el.style.setProperty("--btnY", (e.clientY - rect.top) + "px");
            });

            el.addEventListener("mouseleave", function () {
              el.style.transform = "translate(0, 0)";
            });
          });

          if (tiltArea && tiltCard && isFinePointer && !reduceMotion) {
            tiltArea.addEventListener("mousemove", function (e) {
              const rect = tiltArea.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;
              const rotateY = (px - 0.5) * 8;
              const rotateX = (py - 0.5) * -8;

              root.style.setProperty("--tiltX", rotateY + "deg");
              root.style.setProperty("--tiltY", rotateX + "deg");

              tiltCard.style.setProperty("--cardX", (px * 100) + "%");
              tiltCard.style.setProperty("--cardY", (py * 100) + "%");
            });

            tiltArea.addEventListener("mouseleave", function () {
              root.style.setProperty("--tiltX", "0deg");
              root.style.setProperty("--tiltY", "0deg");
            });
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

module.exports = homePage;