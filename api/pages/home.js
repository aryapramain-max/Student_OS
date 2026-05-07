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
            --surface: #0b0b0b;
            --surface-2: #111111;
            --text: #f8f8f8;
            --muted: #a3a3a3;
            --soft: #737373;
            --line: rgba(255, 255, 255, 0.12);
            --line-strong: rgba(255, 255, 255, 0.24);
            --white: #ffffff;
            --black: #000000;
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
            background: var(--bg);
            color: var(--text);
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            overflow-x: hidden;
            cursor: none;
          }

          a,
          button {
            cursor: none;
          }

          .cursor {
            position: fixed;
            width: 18px;
            height: 18px;
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 999px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.18s ease, height 0.18s ease, background 0.18s ease, border 0.18s ease;
            mix-blend-mode: difference;
          }

          .cursor-dot {
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ffffff;
            border-radius: 999px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
          }

          body.hovering .cursor {
            width: 54px;
            height: 54px;
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 1);
          }

          .noise {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            opacity: 0.08;
            background-image:
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.25) 0 1px, transparent 1px);
            background-size: 26px 26px, 34px 34px;
          }

          .orb {
            position: fixed;
            width: 680px;
            height: 680px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            filter: blur(72px);
            opacity: 0.28;
            background:
              radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), transparent 28%),
              radial-gradient(circle at 65% 65%, rgba(255,255,255,0.24), transparent 38%);
            animation: fluidMove 15s ease-in-out infinite alternate;
          }

          .orb.one {
            top: -280px;
            left: -220px;
          }

          .orb.two {
            right: -300px;
            bottom: -360px;
            opacity: 0.18;
            animation-duration: 19s;
          }

          @keyframes fluidMove {
            0% {
              transform: translate3d(0, 0, 0) scale(1);
              border-radius: 43% 57% 54% 46% / 44% 42% 58% 56%;
            }
            50% {
              transform: translate3d(40px, -24px, 0) scale(1.08);
              border-radius: 58% 42% 39% 61% / 52% 61% 39% 48%;
            }
            100% {
              transform: translate3d(-18px, 36px, 0) scale(0.96);
              border-radius: 41% 59% 62% 38% / 59% 44% 56% 41%;
            }
          }

          .page {
            position: relative;
            z-index: 2;
            min-height: 100vh;
          }

          .container {
            width: min(1180px, calc(100% - 40px));
            margin: 0 auto;
          }

          .nav {
            position: sticky;
            top: 0;
            z-index: 20;
            backdrop-filter: blur(20px);
            background: rgba(5, 5, 5, 0.66);
            border-bottom: 1px solid var(--line);
          }

          .nav-inner {
            height: 78px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--text);
            text-decoration: none;
            font-weight: 900;
            letter-spacing: -0.04em;
            font-size: 20px;
          }

          .brand-mark {
            width: 34px;
            height: 34px;
            border: 1px solid var(--line-strong);
            border-radius: 10px;
            display: grid;
            place-items: center;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
          }

          .brand-mark::before {
            content: "";
            width: 14px;
            height: 14px;
            border-radius: 4px;
            background: #ffffff;
            animation: markPulse 2.6s ease-in-out infinite;
          }

          @keyframes markPulse {
            0%, 100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: scale(0.72) rotate(45deg);
              opacity: 0.62;
            }
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-links a {
            color: var(--muted);
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            padding: 10px 12px;
            border-radius: 999px;
            transition: 0.18s ease;
          }

          .nav-links a:hover {
            color: var(--text);
            background: rgba(255,255,255,0.08);
          }

          .hero {
            padding: 104px 0 72px;
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 54px;
            align-items: center;
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            border: 1px solid var(--line);
            border-radius: 999px;
            background: rgba(255,255,255,0.04);
            color: var(--muted);
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.02em;
            margin-bottom: 22px;
          }

          .eyebrow-dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: #ffffff;
            box-shadow: 0 0 18px rgba(255,255,255,0.85);
          }

          h1 {
            margin: 0;
            font-size: clamp(58px, 8vw, 112px);
            line-height: 0.86;
            letter-spacing: -0.085em;
            font-weight: 950;
          }

          .gradient-text {
            display: block;
            background: linear-gradient(90deg, #ffffff, #a3a3a3, #ffffff);
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
            max-width: 660px;
            margin: 28px 0 34px;
            color: var(--muted);
            font-size: 19px;
            line-height: 1.7;
          }

          .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            align-items: center;
            margin-bottom: 34px;
          }

          .btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 54px;
            padding: 0 20px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 900;
            font-size: 15px;
            overflow: hidden;
            transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          }

          .btn::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 34%);
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
            color: #000000;
            background: #ffffff;
            border: 1px solid #ffffff;
          }

          .btn-primary:hover {
            transform: translateY(-3px);
          }

          .btn-secondary {
            color: #ffffff;
            border: 1px solid var(--line-strong);
            background: rgba(255,255,255,0.04);
          }

          .btn-secondary:hover {
            transform: translateY(-3px);
            border-color: #ffffff;
          }

          .made-by {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
            color: var(--soft);
            font-size: 14px;
          }

          .made-by strong {
            color: var(--text);
          }

          .visual {
            position: relative;
            min-height: 560px;
            perspective: 1200px;
          }

          .semester-panel {
            position: absolute;
            inset: 0;
            border: 1px solid var(--line);
            border-radius: 34px;
            background:
              linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)),
              rgba(255,255,255,0.03);
            box-shadow: 0 40px 120px rgba(0,0,0,0.55);
            overflow: hidden;
            transform-style: preserve-3d;
            transition: transform 0.18s ease;
          }

          .semester-panel::before {
            content: "";
            position: absolute;
            inset: -1px;
            background:
              linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
            transform: translateX(-100%);
            animation: panelSweep 6s ease-in-out infinite;
          }

          @keyframes panelSweep {
            0%, 55% {
              transform: translateX(-100%);
            }
            80%, 100% {
              transform: translateX(100%);
            }
          }

          .panel-grid {
            position: absolute;
            inset: 0;
            opacity: 0.28;
            background-image:
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
            background-size: 34px 34px;
            mask-image: radial-gradient(circle at 50% 42%, black, transparent 72%);
          }

          .orbit {
            position: absolute;
            width: 280px;
            height: 280px;
            left: 50%;
            top: 45%;
            transform: translate(-50%, -50%);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 50%;
            animation: rotate 18s linear infinite;
          }

          .orbit.two {
            width: 390px;
            height: 390px;
            animation-duration: 26s;
            animation-direction: reverse;
          }

          .orbit.three {
            width: 480px;
            height: 480px;
            animation-duration: 34s;
          }

          .node {
            position: absolute;
            width: 88px;
            min-height: 54px;
            border: 1px solid var(--line-strong);
            border-radius: 16px;
            background: rgba(0,0,0,0.72);
            backdrop-filter: blur(18px);
            display: grid;
            place-items: center;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            font-weight: 900;
            color: #ffffff;
            box-shadow: 0 18px 50px rgba(0,0,0,0.55);
          }

          .node.n1 {
            left: 50%;
            top: -28px;
            transform: translateX(-50%);
          }

          .node.n2 {
            right: -42px;
            top: 50%;
            transform: translateY(-50%);
          }

          .node.n3 {
            left: 50%;
            bottom: -28px;
            transform: translateX(-50%);
          }

          .node.n4 {
            left: -42px;
            top: 50%;
            transform: translateY(-50%);
          }

          @keyframes rotate {
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          .core {
            position: absolute;
            left: 50%;
            top: 45%;
            transform: translate(-50%, -50%);
            width: 180px;
            height: 180px;
            border-radius: 48px;
            background:
              radial-gradient(circle at 30% 20%, rgba(255,255,255,0.26), transparent 32%),
              #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 24px;
            font-weight: 950;
            font-size: 21px;
            letter-spacing: -0.06em;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.4),
              0 30px 90px rgba(255,255,255,0.12);
            animation: coreFloat 4.5s ease-in-out infinite;
          }

          @keyframes coreFloat {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-12px);
            }
          }

          .floating-card {
            position: absolute;
            left: 26px;
            bottom: 26px;
            width: calc(100% - 52px);
            border: 1px solid var(--line);
            border-radius: 24px;
            background: rgba(0,0,0,0.68);
            backdrop-filter: blur(22px);
            padding: 18px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 18px;
            align-items: center;
          }

          .floating-card h3 {
            margin: 0 0 6px;
            font-size: 16px;
            letter-spacing: -0.03em;
          }

          .floating-card p {
            margin: 0;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
          }

          .progress-ring {
            width: 62px;
            height: 62px;
            border-radius: 50%;
            background: conic-gradient(#ffffff 0 74%, rgba(255,255,255,0.16) 74% 100%);
            display: grid;
            place-items: center;
          }

          .progress-ring::before {
            content: "74%";
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: #000000;
            display: grid;
            place-items: center;
            font-size: 12px;
            font-weight: 900;
            color: #ffffff;
          }

          .features {
            padding: 34px 0 72px;
          }

          .section-heading {
            display: flex;
            align-items: end;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 22px;
          }

          .section-heading h2 {
            margin: 0;
            font-size: clamp(32px, 5vw, 56px);
            line-height: 0.98;
            letter-spacing: -0.06em;
          }

          .section-heading p {
            max-width: 420px;
            color: var(--muted);
            line-height: 1.6;
            margin: 0;
          }

          .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .feature-card {
            position: relative;
            min-height: 230px;
            padding: 24px;
            border: 1px solid var(--line);
            border-radius: 28px;
            background:
              radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 32%),
              rgba(255,255,255,0.035);
            overflow: hidden;
            transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
          }

          .feature-card:hover {
            transform: translateY(-8px);
            border-color: rgba(255,255,255,0.38);
            background:
              radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.18), transparent 34%),
              rgba(255,255,255,0.055);
          }

          .feature-number {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            background: #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
            font-weight: 950;
            margin-bottom: 44px;
          }

          .feature-card h3 {
            margin: 0 0 10px;
            font-size: 22px;
            letter-spacing: -0.04em;
          }

          .feature-card p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
          }

          .workflow {
            padding: 8px 0 84px;
          }

          .workflow-card {
            border: 1px solid var(--line);
            border-radius: 34px;
            background: rgba(255,255,255,0.035);
            overflow: hidden;
          }

          .workflow-row {
            display: grid;
            grid-template-columns: 0.25fr 1fr 1fr;
            gap: 18px;
            padding: 24px;
            border-bottom: 1px solid var(--line);
            align-items: center;
            transition: background 0.2s ease;
          }

          .workflow-row:last-child {
            border-bottom: 0;
          }

          .workflow-row:hover {
            background: rgba(255,255,255,0.05);
          }

          .step {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            background: #ffffff;
            color: #000000;
            display: grid;
            place-items: center;
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
            line-height: 1.6;
          }

          .cta {
            padding: 0 0 92px;
          }

          .cta-box {
            position: relative;
            border-radius: 38px;
            overflow: hidden;
            border: 1px solid var(--line-strong);
            background: #ffffff;
            color: #000000;
            padding: 48px;
          }

          .cta-box::before {
            content: "";
            position: absolute;
            inset: -40%;
            background:
              radial-gradient(circle at 30% 30%, rgba(0,0,0,0.12), transparent 28%),
              radial-gradient(circle at 70% 60%, rgba(0,0,0,0.09), transparent 32%);
            animation: fluidMove 12s ease-in-out infinite alternate;
          }

          .cta-content {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 24px;
            align-items: center;
          }

          .cta h2 {
            margin: 0 0 12px;
            font-size: clamp(34px, 5vw, 64px);
            line-height: 0.95;
            letter-spacing: -0.07em;
          }

          .cta p {
            max-width: 620px;
            margin: 0;
            color: #404040;
            line-height: 1.65;
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
            padding: 28px 0 42px;
            color: var(--soft);
          }

          .footer-inner {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            flex-wrap: wrap;
          }

          footer a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 800;
          }

          footer a:hover {
            text-decoration: underline;
          }

          .credits {
            color: var(--muted);
          }

          @media (max-width: 960px) {
            .hero {
              grid-template-columns: 1fr;
              padding-top: 72px;
            }

            .visual {
              min-height: 500px;
            }

            .feature-grid {
              grid-template-columns: 1fr;
            }

            .section-heading {
              align-items: flex-start;
              flex-direction: column;
            }

            .workflow-row {
              grid-template-columns: 1fr;
            }

            .cta-content {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 620px) {
            body {
              cursor: auto;
            }

            a,
            button {
              cursor: pointer;
            }

            .cursor,
            .cursor-dot {
              display: none;
            }

            .container {
              width: min(100% - 28px, 1180px);
            }

            .nav-inner {
              height: auto;
              padding: 18px 0;
              align-items: flex-start;
              flex-direction: column;
            }

            .nav-links {
              width: 100%;
              justify-content: flex-start;
              overflow-x: auto;
              padding-bottom: 4px;
            }

            .hero {
              gap: 36px;
            }

            .subtitle {
              font-size: 17px;
            }

            .actions {
              align-items: stretch;
              flex-direction: column;
            }

            .btn {
              width: 100%;
            }

            .visual {
              min-height: 420px;
            }

            .core {
              width: 142px;
              height: 142px;
              border-radius: 34px;
              font-size: 18px;
            }

            .orbit {
              width: 230px;
              height: 230px;
            }

            .orbit.two {
              width: 310px;
              height: 310px;
            }

            .orbit.three {
              width: 370px;
              height: 370px;
            }

            .node {
              width: 76px;
              font-size: 11px;
            }

            .floating-card {
              grid-template-columns: 1fr;
            }

            .cta-box {
              padding: 30px;
            }
          }
        </style>
      </head>

      <body>
        <div class="cursor" id="cursor"></div>
        <div class="cursor-dot" id="cursorDot"></div>
        <div class="noise"></div>
        <div class="orb one"></div>
        <div class="orb two"></div>

        <main class="page">
          <nav class="nav">
            <div class="container nav-inner">
              <a class="brand interactive" href="/">
                <span class="brand-mark"></span>
                <span>Semester OS</span>
              </a>

              <div class="nav-links">
                <a class="interactive" href="#features">Features</a>
                <a class="interactive" href="#workflow">Workflow</a>
                <a class="interactive" href="/connect/google">Connect</a>
                <a class="interactive" href="/privacy">Privacy</a>
              </div>
            </div>
          </nav>

          <section class="container hero">
            <div>
              <div class="eyebrow">
                <span class="eyebrow-dot"></span>
                Academic execution system for students
              </div>

              <h1>
                Run your
                <span class="gradient-text">semester</span>
                like an OS.
              </h1>

              <p class="subtitle">
                Semester OS turns scattered notes, deadlines, exams, and study goals into
                clear execution plans, Google Calendar study blocks, and academic workflows
                powered by your own connected Google account.
              </p>

              <div class="actions">
                <a class="btn btn-primary interactive magnetic" href="/connect/google">
                  <span>Connect Google</span>
                  <span>→</span>
                </a>

                <a class="btn btn-secondary interactive magnetic" href="/privacy">
                  <span>View Privacy</span>
                </a>
              </div>

              <div class="made-by">
                <span>Made by</span>
                <strong>Pranshu Mangale</strong>
                <span>and</span>
                <strong>Aryan Makwana</strong>
              </div>
            </div>

            <div class="visual" id="tiltArea">
              <div class="semester-panel" id="tiltPanel">
                <div class="panel-grid"></div>

                <div class="orbit">
                  <div class="node n1">Exams</div>
                  <div class="node n3">Revision</div>
                </div>

                <div class="orbit two">
                  <div class="node n2">Drive Files</div>
                  <div class="node n4">Calendar</div>
                </div>

                <div class="orbit three">
                  <div class="node n1">Projects</div>
                  <div class="node n3">Deadlines</div>
                </div>

                <div class="core">
                  Semester<br />OS
                </div>

                <div class="floating-card">
                  <div>
                    <h3>Current semester load</h3>
                    <p>4 exams · 2 assignments · 1 project · 12 study blocks planned</p>
                  </div>
                  <div class="progress-ring"></div>
                </div>
              </div>
            </div>
          </section>

          <section class="container features" id="features">
            <div class="section-heading">
              <h2>Built for academic execution.</h2>
              <p>
                Not another productivity app. Semester OS is designed around the actual chaos
                students face during exams, assignments, backlogs, projects, and weekly planning.
              </p>
            </div>

            <div class="feature-grid">
              <article class="feature-card interactive">
                <div class="feature-number">01</div>
                <h3>Plan study blocks</h3>
                <p>Create focused Google Calendar sessions for exams, assignments, revision, projects, labs, and backlog recovery.</p>
              </article>

              <article class="feature-card interactive">
                <div class="feature-number">02</div>
                <h3>Use your Drive</h3>
                <p>Search and read supported Google Drive materials like syllabi, notes, Google Docs, Sheets, PDFs, markdown, and text files.</p>
              </article>

              <article class="feature-card interactive">
                <div class="feature-number">03</div>
                <h3>Execute clearly</h3>
                <p>Turn vague academic pressure into priority rankings, daily plans, study sprints, and next actions you can actually follow.</p>
              </article>
            </div>
          </section>

          <section class="container workflow" id="workflow">
            <div class="section-heading">
              <h2>How Semester OS works.</h2>
              <p>
                Connect once, paste your private key into the GPT, and use it to plan,
                read academic material, and schedule your semester.
              </p>
            </div>

            <div class="workflow-card">
              <div class="workflow-row interactive">
                <div class="step">1</div>
                <h3>Connect Google</h3>
                <p>Authorize Semester OS to create calendar study blocks and read supported Drive files.</p>
              </div>

              <div class="workflow-row interactive">
                <div class="step">2</div>
                <h3>Copy your key</h3>
                <p>You receive a private Semester OS key that links your GPT session to your connected account.</p>
              </div>

              <div class="workflow-row interactive">
                <div class="step">3</div>
                <h3>Plan with GPT</h3>
                <p>Ask Semester OS to break down exams, read notes, build study plans, or schedule blocks.</p>
              </div>

              <div class="workflow-row interactive">
                <div class="step">4</div>
                <h3>Execute the semester</h3>
                <p>Your academic chaos becomes a system of priorities, study blocks, reviews, and next actions.</p>
              </div>
            </div>
          </section>

          <section class="container cta">
            <div class="cta-box">
              <div class="cta-content">
                <div>
                  <h2>Ready to run your semester?</h2>
                  <p>
                    Connect your Google account and start using Semester OS to turn files,
                    deadlines, and study goals into real execution.
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
              <span class="credits">Semester OS · Made by Pranshu Mangale and Aryan Makwana</span>
              <span>
                <a class="interactive" href="/privacy">Privacy Policy</a>
                &nbsp;·&nbsp;
                <a class="interactive" href="/terms">Terms of Service</a>
              </span>
            </div>
          </footer>
        </main>

        <script>
          const cursor = document.getElementById("cursor");
          const cursorDot = document.getElementById("cursorDot");
          const tiltArea = document.getElementById("tiltArea");
          const tiltPanel = document.getElementById("tiltPanel");

          let mouseX = window.innerWidth / 2;
          let mouseY = window.innerHeight / 2;
          let cursorX = mouseX;
          let cursorY = mouseY;

          window.addEventListener("mousemove", function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            document.querySelectorAll(".btn, .feature-card").forEach(function (item) {
              const rect = item.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              item.style.setProperty("--mx", x + "px");
              item.style.setProperty("--my", y + "px");
            });
          });

          function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.16;
            cursorY += (mouseY - cursorY) * 0.16;

            if (cursor && cursorDot) {
              cursor.style.left = cursorX + "px";
              cursor.style.top = cursorY + "px";
              cursorDot.style.left = mouseX + "px";
              cursorDot.style.top = mouseY + "px";
            }

            requestAnimationFrame(animateCursor);
          }

          animateCursor();

          document.querySelectorAll(".interactive").forEach(function (item) {
            item.addEventListener("mouseenter", function () {
              document.body.classList.add("hovering");
            });

            item.addEventListener("mouseleave", function () {
              document.body.classList.remove("hovering");
            });
          });

          document.querySelectorAll(".magnetic").forEach(function (item) {
            item.addEventListener("mousemove", function (event) {
              const rect = item.getBoundingClientRect();
              const x = event.clientX - rect.left - rect.width / 2;
              const y = event.clientY - rect.top - rect.height / 2;
              item.style.transform = "translate(" + x * 0.12 + "px, " + y * 0.12 + "px) translateY(-3px)";
            });

            item.addEventListener("mouseleave", function () {
              item.style.transform = "translate(0, 0)";
            });
          });

          if (tiltArea && tiltPanel) {
            tiltArea.addEventListener("mousemove", function (event) {
              const rect = tiltArea.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;
              tiltPanel.style.transform = "rotateY(" + x * 12 + "deg) rotateX(" + y * -12 + "deg)";
            });

            tiltArea.addEventListener("mouseleave", function () {
              tiltPanel.style.transform = "rotateY(0deg) rotateX(0deg)";
            });
          }

          const revealItems = document.querySelectorAll(".feature-card, .workflow-row, .cta-box");

          const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.animate(
                  [
                    { opacity: 0, transform: "translateY(24px)" },
                    { opacity: 1, transform: "translateY(0)" }
                  ],
                  {
                    duration: 700,
                    easing: "cubic-bezier(.2,.8,.2,1)",
                    fill: "forwards"
                  }
                );
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.18 });

          revealItems.forEach(function (item) {
            item.style.opacity = "0";
            observer.observe(item);
          });
        </script>
      </body>
    </html>
  `;
}

module.exports = homePage;