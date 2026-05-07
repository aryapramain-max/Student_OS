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
            --bg-soft: #0b0b0b;
            --surface: rgba(255, 255, 255, 0.04);
            --surface-strong: rgba(255, 255, 255, 0.08);
            --line: rgba(255, 255, 255, 0.10);
            --line-strong: rgba(255, 255, 255, 0.22);
            --text: #f8f8f8;
            --muted: #b3b3b3;
            --soft: #7d7d7d;
            --white: #ffffff;
            --shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
            --mx: 50%;
            --my: 50%;
            --px: 50%;
            --py: 50%;
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
            color: var(--text);
            background:
              radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 22%),
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 20%),
              linear-gradient(180deg, #050505 0%, #0a0a0a 45%, #050505 100%);
            overflow-x: hidden;
          }

          body::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            background:
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: radial-gradient(circle at var(--px) var(--py), black 0%, rgba(0,0,0,0.9) 30%, transparent 72%);
            opacity: 0.35;
            transform: translateZ(0);
          }

          body::after {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            background:
              radial-gradient(circle at 15% 20%, rgba(255,255,255,0.05), transparent 20%),
              radial-gradient(circle at 80% 15%, rgba(255,255,255,0.04), transparent 22%),
              radial-gradient(circle at 65% 80%, rgba(255,255,255,0.05), transparent 24%);
            filter: blur(40px);
            opacity: 0.8;
          }

          @media (hover: hover) and (pointer: fine) {
            body {
              cursor: none;
            }

            a, button {
              cursor: none;
            }
          }

          .cursor-compass {
            position: fixed;
            top: 0;
            left: 0;
            width: 34px;
            height: 34px;
            margin-left: -17px;
            margin-top: -17px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            transition:
              width 0.2s ease,
              height 0.2s ease,
              margin 0.2s ease,
              opacity 0.2s ease,
              filter 0.2s ease;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.28),
              0 0 30px rgba(255,255,255,0.12);
            backdrop-filter: blur(12px);
            background: rgba(255,255,255,0.06);
            display: none;
          }

          .cursor-compass img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
            animation: cursorSpin 9s linear infinite;
            filter: drop-shadow(0 0 12px rgba(255,255,255,0.18));
          }

          .cursor-ring {
            position: fixed;
            top: 0;
            left: 0;
            width: 58px;
            height: 58px;
            margin-left: -29px;
            margin-top: -29px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.25);
            pointer-events: none;
            z-index: 9998;
            opacity: 0.8;
            display: none;
            transition: transform 0.22s ease, width 0.2s ease, height 0.2s ease, margin 0.2s ease;
          }

          body.link-hover .cursor-compass {
            width: 48px;
            height: 48px;
            margin-left: -24px;
            margin-top: -24px;
            filter: brightness(1.1);
          }

          body.link-hover .cursor-ring {
            width: 84px;
            height: 84px;
            margin-left: -42px;
            margin-top: -42px;
            transform: scale(1.05);
          }

          @media (hover: hover) and (pointer: fine) {
            .cursor-compass,
            .cursor-ring {
              display: block;
            }
          }

          @keyframes cursorSpin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
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

          .blob {
            position: fixed;
            width: 520px;
            height: 520px;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
            z-index: 1;
            opacity: 0.18;
            animation: floatBlob 14s ease-in-out infinite alternate;
            background:
              radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), transparent 28%),
              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.22), transparent 36%);
          }

          .blob.one {
            top: -180px;
            left: -120px;
          }

          .blob.two {
            right: -160px;
            bottom: -220px;
            animation-duration: 18s;
            opacity: 0.12;
          }

          @keyframes floatBlob {
            0% {
              transform: translate3d(0, 0, 0) scale(1);
              border-radius: 42% 58% 60% 40% / 41% 40% 60% 59%;
            }
            50% {
              transform: translate3d(24px, -12px, 0) scale(1.06);
              border-radius: 58% 42% 39% 61% / 50% 59% 41% 50%;
            }
            100% {
              transform: translate3d(-18px, 30px, 0) scale(0.96);
              border-radius: 43% 57% 48% 52% / 58% 45% 55% 42%;
            }
          }

          .nav {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(5, 5, 5, 0.72);
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
            font-weight: 900;
            font-size: 20px;
            letter-spacing: -0.05em;
          }

          .brand-logo {
            width: 38px;
            height: 38px;
            object-fit: contain;
            border-radius: 50%;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.18),
              0 10px 30px rgba(0,0,0,0.35);
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
            font-weight: 700;
            padding: 10px 14px;
            border-radius: 999px;
            transition: all 0.2s ease;
          }

          .nav-links a:hover {
            color: var(--white);
            background: rgba(255,255,255,0.08);
          }

          .hero {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 48px;
            align-items: center;
            padding: 88px 0 60px;
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 14px;
            border-radius: 999px;
            border: 1px solid var(--line-strong);
            background: rgba(255,255,255,0.04);
            color: var(--muted);
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 22px;
          }

          .eyebrow::before {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 0 18px rgba(255,255,255,0.8);
          }

          h1 {
            margin: 0;
            font-size: clamp(56px, 8vw, 110px);
            line-height: 0.88;
            letter-spacing: -0.09em;
            font-weight: 950;
          }

          .heading-accent {
            display: block;
            color: rgba(255,255,255,0.86);
            background: linear-gradient(90deg, #ffffff, #b5b5b5, #ffffff);
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
            max-width: 700px;
            margin: 26px 0 32px;
            font-size: 19px;
            line-height: 1.75;
            color: var(--muted);
          }

          .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-bottom: 26px;
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
            background: radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.22), transparent 30%);
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
            box-shadow: 0 12px 40px rgba(255,255,255,0.08);
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
            flex-wrap: wrap;
            gap: 8px;
            font-size: 14px;
            color: var(--soft);
          }

          .made-by strong {
            color: var(--white);
          }

          .hero-visual {
            position: relative;
            min-height: 620px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .visual-card {
            position: relative;
            width: 100%;
            max-width: 560px;
            min-height: 600px;
            border-radius: 36px;
            border: 1px solid var(--line);
            background:
              linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)),
              rgba(255,255,255,0.02);
            overflow: hidden;
            box-shadow: var(--shadow);
            transform:
              perspective(1400px)
              rotateX(var(--tiltY))
              rotateY(var(--tiltX));
            transition: transform 0.15s ease;
          }

          .visual-card::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at var(--px) var(--py), rgba(255,255,255,0.16), transparent 22%),
              linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.06) 46%, transparent 58%);
            pointer-events: none;
          }

          .visual-grid {
            position: absolute;
            inset: 0;
            opacity: 0.22;
            background-image:
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
            background-size: 34px 34px;
          }

          .logo-core {
            position: absolute;
            inset: 50% auto auto 50%;
            transform: translate(-50%, -56%);
            width: 250px;
            height: 250px;
            display: grid;
            place-items: center;
            z-index: 3;
          }

          .logo-core::before {
            content: "";
            position: absolute;
            inset: -30px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.14), transparent 60%);
            filter: blur(20px);
            animation: pulseGlow 4s ease-in-out infinite;
          }

          .logo-core img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35));
            animation: floatLogo 6s ease-in-out infinite;
          }

          @keyframes floatLogo {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-12px) rotate(2deg);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.55;
              transform: scale(1);
            }
            50% {
              opacity: 0.9;
              transform: scale(1.06);
            }
          }

          .orbit {
            position: absolute;
            left: 50%;
            top: 42%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.14);
            animation: spin 18s linear infinite;
          }

          .orbit.one {
            width: 320px;
            height: 320px;
          }

          .orbit.two {
            width: 420px;
            height: 420px;
            animation-duration: 28s;
            animation-direction: reverse;
          }

          .orbit.three {
            width: 500px;
            height: 500px;
            animation-duration: 38s;
          }

          @keyframes spin {
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          .node {
            position: absolute;
            min-width: 96px;
            padding: 12px 14px;
            border-radius: 16px;
            background: rgba(0,0,0,0.72);
            border: 1px solid var(--line-strong);
            text-align: center;
            font-size: 12px;
            font-weight: 900;
            color: #ffffff;
            box-shadow: 0 12px 30px rgba(0,0,0,0.35);
            backdrop-filter: blur(14px);
          }

          .orbit.one .node.top,
          .orbit.two .node.top,
          .orbit.three .node.top {
            left: 50%;
            top: -20px;
            transform: translateX(-50%);
          }

          .orbit.one .node.right,
          .orbit.two .node.right,
          .orbit.three .node.right {
            right: -42px;
            top: 50%;
            transform: translateY(-50%);
          }

          .orbit.one .node.bottom,
          .orbit.two .node.bottom,
          .orbit.three .node.bottom {
            left: 50%;
            bottom: -20px;
            transform: translateX(-50%);
          }

          .orbit.one .node.left,
          .orbit.two .node.left,
          .orbit.three .node.left {
            left: -42px;
            top: 50%;
            transform: translateY(-50%);
          }

          .semester-stats {
            position: absolute;
            left: 22px;
            right: 22px;
            bottom: 22px;
            display: grid;
            grid-template-columns: 1.3fr 1fr;
            gap: 14px;
            z-index: 3;
          }

          .panel,
          .mini-card,
          .feature-card,
          .workflow-row,
          .cta-box {
            backdrop-filter: blur(18px);
          }

          .panel {
            border: 1px solid var(--line);
            background: rgba(255,255,255,0.04);
            border-radius: 24px;
            padding: 18px;
          }

          .panel h3 {
            margin: 0 0 8px;
            font-size: 16px;
            letter-spacing: -0.03em;
          }

          .panel p {
            margin: 0;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.6;
          }

          .mini-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .mini-card {
            border: 1px solid var(--line);
            background: rgba(255,255,255,0.04);
            border-radius: 18px;
            padding: 14px;
          }

          .mini-card strong {
            display: block;
            font-size: 22px;
            margin-bottom: 2px;
          }

          .mini-card span {
            color: var(--muted);
            font-size: 12px;
          }

          .features {
            padding: 18px 0 74px;
          }

          .section-heading {
            display: flex;
            justify-content: space-between;
            align-items: end;
            gap: 24px;
            margin-bottom: 24px;
          }

          .section-heading h2 {
            margin: 0;
            font-size: clamp(32px, 5vw, 58px);
            line-height: 0.96;
            letter-spacing: -0.07em;
          }

          .section-heading p {
            max-width: 460px;
            color: var(--muted);
            margin: 0;
            line-height: 1.7;
          }

          .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .feature-card {
            position: relative;
            min-height: 250px;
            padding: 24px;
            border-radius: 30px;
            border: 1px solid var(--line);
            background:
              radial-gradient(circle at var(--px) var(--py), rgba(255,255,255,0.12), transparent 30%),
              rgba(255,255,255,0.03);
            transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
            overflow: hidden;
          }

          .feature-card:hover {
            transform: translateY(-8px);
            border-color: rgba(255,255,255,0.3);
            box-shadow: 0 24px 60px rgba(0,0,0,0.28);
          }

          .feature-icon {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            background: #ffffff;
            color: #000000;
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
            background: rgba(255,255,255,0.03);
          }

          .workflow-row {
            display: grid;
            grid-template-columns: 80px 1fr 1fr;
            gap: 18px;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid var(--line);
            transition: background 0.2s ease;
          }

          .workflow-row:last-child {
            border-bottom: 0;
          }

          .workflow-row:hover {
            background: rgba(255,255,255,0.04);
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
            position: relative;
            overflow: hidden;
            border-radius: 40px;
            border: 1px solid var(--line-strong);
            background:
              radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,0.12), transparent 32%),
              #ffffff;
            color: #000000;
            padding: 48px;
            box-shadow: 0 40px 100px rgba(0,0,0,0.3);
          }

          .cta-box::before {
            content: "";
            position: absolute;
            inset: -40%;
            background:
              radial-gradient(circle at 20% 30%, rgba(0,0,0,0.10), transparent 24%),
              radial-gradient(circle at 72% 64%, rgba(0,0,0,0.08), transparent 28%);
            animation: floatBlob 14s ease-in-out infinite alternate;
            pointer-events: none;
          }

          .cta-content {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 22px;
            align-items: center;
          }

          .cta h2 {
            margin: 0 0 12px;
            font-size: clamp(36px, 5vw, 64px);
            line-height: 0.95;
            letter-spacing: -0.07em;
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
            transform: translateY(26px);
          }

          .reveal.show {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1);
          }

          @media (max-width: 980px) {
            .hero {
              grid-template-columns: 1fr;
              padding-top: 68px;
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
              min-height: auto;
              padding: 18px 0;
              flex-direction: column;
              align-items: flex-start;
            }

            .nav-links {
              width: 100%;
              overflow-x: auto;
              padding-bottom: 4px;
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

            .hero-visual {
              min-height: 500px;
            }

            .visual-card {
              min-height: 500px;
            }

            .logo-core {
              width: 180px;
              height: 180px;
            }

            .orbit.one {
              width: 240px;
              height: 240px;
            }

            .orbit.two {
              width: 320px;
              height: 320px;
            }

            .orbit.three {
              width: 380px;
              height: 380px;
            }

            .node {
              min-width: 78px;
              font-size: 11px;
              padding: 10px 10px;
            }

            .semester-stats {
              grid-template-columns: 1fr;
            }

            .cta-box {
              padding: 30px;
            }
          }

          @media (max-width: 520px) {
            .nav-links a {
              white-space: nowrap;
            }

            .feature-card,
            .panel,
            .mini-card {
              border-radius: 22px;
            }
          }
        </style>
      </head>

      <body>
        <div class="cursor-ring" id="cursorRing"></div>
        <div class="cursor-compass" id="cursorCompass">
          <img src="/logo.png" alt="Semester OS compass cursor" />
        </div>

        <div class="blob one"></div>
        <div class="blob two"></div>

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

            <div class="hero-visual" id="tiltArea">
              <div class="visual-card" id="tiltCard">
                <div class="visual-grid"></div>

                <div class="orbit one">
                  <div class="node top">Midsems</div>
                  <div class="node right">Calendar</div>
                  <div class="node bottom">Revision</div>
                  <div class="node left">Assignments</div>
                </div>

                <div class="orbit two">
                  <div class="node top">Projects</div>
                  <div class="node right">Drive</div>
                  <div class="node bottom">Backlogs</div>
                  <div class="node left">Deadlines</div>
                </div>

                <div class="orbit three">
                  <div class="node top">Finals</div>
                  <div class="node bottom">Study Sprints</div>
                </div>

                <div class="logo-core">
                  <img src="/logo.png" alt="Semester OS core logo" />
                </div>

                <div class="semester-stats">
                  <div class="panel">
                    <h3>Current semester dashboard</h3>
                    <p>
                      Organize exams, projects, deadlines, revision cycles, and weekly planning
                      inside one academic execution system.
                    </p>
                  </div>

                  <div class="mini-grid">
                    <div class="mini-card">
                      <strong>12</strong>
                      <span>Study blocks</span>
                    </div>
                    <div class="mini-card">
                      <strong>04</strong>
                      <span>Exam tracks</span>
                    </div>
                    <div class="mini-card">
                      <strong>09</strong>
                      <span>Drive docs</span>
                    </div>
                    <div class="mini-card">
                      <strong>3.0</strong>
                      <span>Weeks in sprint</span>
                    </div>
                  </div>
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
          const cursor = document.getElementById("cursorCompass");
          const cursorRing = document.getElementById("cursorRing");
          const tiltArea = document.getElementById("tiltArea");
          const tiltCard = document.getElementById("tiltCard");

          let mouseX = window.innerWidth / 2;
          let mouseY = window.innerHeight / 2;
          let cursorX = mouseX;
          let cursorY = mouseY;

          window.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const xPercent = (e.clientX / window.innerWidth) * 100;
            const yPercent = (e.clientY / window.innerHeight) * 100;

            root.style.setProperty("--mx", xPercent + "%");
            root.style.setProperty("--my", yPercent + "%");
            root.style.setProperty("--px", xPercent + "%");
            root.style.setProperty("--py", yPercent + "%");
          });

          function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;

            if (cursor) {
              cursor.style.transform = "translate3d(" + cursorX + "px," + cursorY + "px,0)";
            }

            if (cursorRing) {
              cursorRing.style.transform = "translate3d(" + cursorX + "px," + cursorY + "px,0)";
            }

            requestAnimationFrame(animateCursor);
          }

          animateCursor();

          document.querySelectorAll(".interactive").forEach(function (el) {
            el.addEventListener("mouseenter", function () {
              document.body.classList.add("link-hover");
            });

            el.addEventListener("mouseleave", function () {
              document.body.classList.remove("link-hover");
            });
          });

          document.querySelectorAll(".magnetic").forEach(function (el) {
            el.addEventListener("mousemove", function (e) {
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              el.style.transform = "translate(" + (x * 0.10) + "px," + (y * 0.10) + "px) translateY(-3px)";
            });

            el.addEventListener("mouseleave", function () {
              el.style.transform = "translate(0, 0)";
            });
          });

          document.querySelectorAll(".btn, .feature-card, .cta-box").forEach(function (card) {
            card.addEventListener("mousemove", function (e) {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty("--mx", x + "px");
              card.style.setProperty("--my", y + "px");
              card.style.setProperty("--px", x + "px");
              card.style.setProperty("--py", y + "px");
            });
          });

          if (tiltArea && tiltCard) {
            tiltArea.addEventListener("mousemove", function (e) {
              const rect = tiltArea.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;
              const rotateY = (px - 0.5) * 14;
              const rotateX = (py - 0.5) * -14;

              root.style.setProperty("--tiltX", rotateY + "deg");
              root.style.setProperty("--tiltY", rotateX + "deg");
            });

            tiltArea.addEventListener("mouseleave", function () {
              root.style.setProperty("--tiltX", "0deg");
              root.style.setProperty("--tiltY", "0deg");
            });
          }

          const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.14 });

          document.querySelectorAll(".reveal").forEach(function (item) {
            observer.observe(item);
          });
        </script>
      </body>
    </html>
  `;
}

module.exports = homePage;