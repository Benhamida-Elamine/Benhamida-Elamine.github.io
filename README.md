# Amine Benhamida — Portfolio

Personal portfolio of Amine Benhamida, data engineer. Static site built with React, TypeScript and Vite, published on GitHub Pages.

Target URL: **https://benhamida-elamine.github.io/** (user site, repository `Benhamida-Elamine.github.io`).

## Run locally

Requires Node.js 22.18 or newer (the post-build script is TypeScript run directly by Node).

```bash
npm install
npm run dev        # development server
npm run build      # type-check + production build + project pages, 404, sitemap, robots.txt
npm run preview    # serve dist/ on http://localhost:4173
npm run lint
```

## Structure

```
public/assets/       portrait, showreel (720p web version), poster, social image
src/data/            all content: profile.ts (contacts, experience, skills), projects.ts, iot-sample.json
src/types/           content types
src/sections/        homepage sections (Hero, Pipeline, Work, Experience, Showreel, About, Contact)
src/pages/           Home, ProjectPage (/projects/:slug/), NotFound
src/components/      Nav, Footer, WindowFrame, ProjectCard, ProjectVisual...
src/hooks/           scroll reveal, in-view, typewriter, active section, reduced motion
scripts/postbuild.ts per-project index.html, 404.html, sitemap.xml, robots.txt, .nojekyll
.github/workflows/   GitHub Pages deployment
```

## Updating content

- **Add a project**: append an entry to `projects` in `src/data/projects.ts` and choose a `visual` (or add one in `ProjectVisual.tsx`). Its page `/projects/<slug>/` and sitemap entry are generated at build time.
- **Smaller repositories**: `minorProjects` in the same file.
- **Experience, skills, contacts**: `src/data/profile.ts`. Skills are split between "used at work" and "used in projects & coursework" on purpose; keep that distinction.
- Every statement must be traceable to a repository, a report or a CV fact. No invented metrics.

`src/data/iot-sample.json` is real output of `IOT-simulation/src/industrial_iot/simulator.py` (`random.seed(2026)`, 180 cycles × 5 machines). Regenerate it from that repository if the simulator changes.

## Design system

Taken from the showreel (`video-presentation/src/showreel/theme.ts`) and the reference site layout:

- Colors: background `#08080A`, text `#F4F4F6`, accent `#9B7BFF`, warm accent `#E9B46F` from the portrait's light.
- Type: Inter (UI and headings), JetBrains Mono (labels, terminal), Instrument Serif italic for one emphasized word per heading.
- Motion: `cubic-bezier(0.16, 1, 0.3, 1)` easing, masked line reveals, typed prompt, blinking cursor, the INGEST → TRANSFORM → VALIDATE → DELIVER pipeline. CSS only, no animation library. Everything is disabled under `prefers-reduced-motion`.

Media: the 19 MB showreel was re-encoded to a 2.5 MB 720p H.264 file. It loads only when the visitor presses play and never autoplays sound.

## Deployment (GitHub Pages)

1. Create a **public** repository named exactly `Benhamida-Elamine.github.io` on GitHub.
2. Push this folder to its `main` branch:
   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio"
   git remote add origin https://github.com/Benhamida-Elamine/Benhamida-Elamine.github.io.git
   git push -u origin main
   ```
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow lints, builds and deploys on every push to `main`. The URL appears in the run summary.

To publish as a project site instead (`https://benhamida-elamine.github.io/<repo>/`), the workflow sets `BASE_PATH` automatically; also update `SITE_URL` in `src/data/profile.ts` and the absolute URLs in `index.html` (canonical, Open Graph).

## Status

| Item | State |
|---|---|
| Production build, TypeScript, ESLint | Pass |
| Desktop (1440 px) and mobile (375 px) layouts, menu, anchors, video playback | Checked in a browser |
| Direct navigation to `/projects/<slug>/` without SPA fallback | Checked with a plain static server |
| Keyboard focus, skip link, headings, alt text | Checked |
| Reduced motion | Implemented in CSS and hooks; not checked with the OS setting enabled |
| Public deployment | Not done: the repository `Benhamida-Elamine.github.io` does not exist yet |
| Lighthouse | Not run |
