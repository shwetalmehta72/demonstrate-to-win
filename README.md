# Demonstrate to Win

**An interactive training platform that teaches sales engineers how to demo AI products.**

Eleven modules, 31 hands-on activities, and four reference surfaces — built around a single premise:
demoing an AI product is not the same job as demoing software, and the standard demo playbook breaks
down when the thing on screen is a model.

<!--
  Screenshots go here. Suggested: the Home dashboard, one activity mid-exercise (DragDrop or
  CrimeDetective read best), and the Pre-Flight Ops Checklist.
  ![Home](docs/screenshots/home.png)
-->

---

## Status

**Working prototype.** Built in two sessions (July 2026) as a spec-driven, AI-assisted build. The
curriculum is complete and the app runs end to end; it is not a product and has never had users.

| | |
|---|---|
| Frontend | Complete — 11 modules, 31 activities, 6 content routes, all wired |
| Curriculum | Complete — ~1,250 lines of authored content |
| Backend | None by design. Express serves static files; there is no API and no database |
| Accounts | None. Progress is local to the browser |
| Tests | **None.** `vitest` is installed but no test files exist |
| Module videos | Present in the data but **will not load** outside the original host — see [Known limitations](#known-limitations) |

---

## Why this exists

Most demo training assumes you are showing deterministic software: click here, this happens, the
buyer understands. AI products break that assumption in specific, repeatable ways. A buyer watching
an agent autonomously process data for the first time, with no framing, does not think *"this solves
my problem"* — they think *"this looks complicated."* Confidence scores invite doubt rather than
trust. Non-determinism makes the rehearsed golden path unreliable. "It learns over time" sounds like
"it doesn't work yet."

So every module here carries an `aiContext` field alongside the general technique — the specific way
that technique bends when the subject is AI. That is the through-line, and it is what separates this
from a generic enablement course.

---

## What's inside

### The curriculum

Seven core modules build the fundamentals; four more cover the named methodologies an SE is expected
to know. Roughly five hours of content end to end.

| # | Module | Focus | Time | XP |
|---|---|---|---|---|
| 1 | **Tell-Show-Tell** | The foundational technique: context → capability → impact | 20 min | 200 |
| 2 | **Bridge Building** | Moving a buyer from current pain to future gain | 25 min | 250 |
| 3 | **The Demo Crime Files** | 28 mistakes that kill deals | 30 min | 300 |
| 4 | **The Discovery Process** | Ask before you show | 25 min | 250 |
| 5 | **Audience Management** | Read the room, win the room | 20 min | 200 |
| 6 | **Demo Preparation** | The demo is won before you walk in | 20 min | 200 |
| 7 | **Limbic Opening & Value Close** | Start strong, end stronger | 25 min | 300 |
| 8 | **The Six Habits** | Partner → Probe → Prepare → Practice → Perform → Perfect | 30 min | 300 |
| 9 | **The Challenger SE** | Teach → Tailor → Take Control | 30 min | 300 |
| 10 | **MEDDPICC Mastery** | Qualify every deal | 35 min | 350 |
| 11 | **SPIN Selling for SEs** | Ask better questions | 30 min | 300 |

Completing modules 1–7 earns **AI SE Certified**; all eleven earns **Methodology Master**.

### Seven activity types

Each type was chosen for a different kind of learning, rather than wrapping everything in a quiz:

| Type | Count | What it trains |
|---|---|---|
| **Quiz** | 12 | Scenario-based recall, with an explanation on every answer — including why the wrong ones are wrong |
| **Scenario** | 6 | Judgment under ambiguity — pick a response to a live situation |
| **Matching** | 4 | Pairing concepts, e.g. a buyer's stated pain to the right bridge |
| **Drag-drop** | 3 | Sequencing — put the steps of a demo in the order that actually works |
| **Build-demo** | 3 | Free-text construction: write your own Opening Tell, then compare against a model answer |
| **Fill-blank** | 2 | Precise recall of formulas and structures |
| **Crime detective** | 1 | Spot the anti-patterns in a demo transcript |

### Four reference surfaces

The parts a practitioner returns to after finishing the training:

- **Field Notes** (`/field-notes`) — eight quick-reference cards: the TST structure, the Opening and
  Closing Tell formulas, the Bridge formula, the 10 demo crimes plus the AI-specific ones, the
  Limbic Opening, the Value Pyramid, and MEDDPICC's eight elements.
- **Pre-Flight Ops Checklist** (`/pre-demo-checklist`) — 48 items across six sections: discovery
  intelligence, golden path and script, technical environment, audience management, MEDDPICC
  qualification, and day-of execution.
- **The SE Reading List** (`/library`) — eight books with authors and summaries, so the curriculum
  points at its own sources rather than pretending to originality.
- **Certification** (`/certification`) — progress against the two certification tracks.

---

## How progress works

Gamified, but deliberately low-friction:

- **No login, no account, no server.** A device UUID is generated on first visit and progress is
  stored in `localStorage` under `dtw_game_state_<deviceId>` and `dtw_profile_<deviceId>`.
- **2,530 XP** total across the 31 activities, mapped to **10 levels**.
- **12 badges** — one per module, plus *First Step* and the two certification badges.
- Clearing browser storage resets progress. There is no sync and no recovery; this is single-device
  by design, not an oversight to be fixed.

---

## Design process

The visual design was not incidental, and the process is preserved in **[`ideas.md`](ideas.md)**.

Three stylistic directions were developed and weighted before anything was built — *Mission
Control* (aerospace/ops-room brutalism), *The Playbook* (sports-coaching editorial), and *Signal &
Clarity* (minimalist magazine). Mission Control was chosen, and a full design system was derived
from it: an OKLCH colour palette built on deep-space navy with electric teal as the live-signal
colour, a three-weight typographic ceiling, an asymmetric sidebar-anchored layout, and an explicit
rule that animation is reserved for meaningful moments — completing a module, earning a badge — and
never decorative.

It also records what was ruled out, including a banned-phrases list for UI copy (`"Welcome!"`,
`"Get Started Today"`, `"Unlock Your Potential"`).

If you are here to evaluate how the author directs AI tooling rather than what the app does,
`ideas.md` is the file to read.

---

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19, TypeScript 5.6 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4, `tw-animate-css`, `@tailwindcss/typography` |
| Components | Radix UI primitives, `class-variance-authority`, `lucide-react` icons |
| Routing | `wouter` (patched — see `patches/`) |
| Animation | `framer-motion` |
| Forms & validation | `react-hook-form`, Zod 4 |
| Charts | `recharts` |
| Server | Express 4 — static file serving only |
| Package manager | pnpm 10 |

The server is 30 lines: serve `dist/public`, fall through to `index.html` for client-side routing.
All state and all content live in the browser.

---

## Run it locally

Requires **Node 20+** and **pnpm**.

```bash
git clone https://github.com/shwetalmehta72/demonstrate-to-win.git
cd demonstrate-to-win

pnpm install
pnpm dev            # http://localhost:3000
```

Other commands:

```bash
pnpm build          # Vite build + esbuild bundle of the server into dist/
pnpm start          # serve the production build (PORT env var respected, default 3000)
pnpm preview        # preview the built frontend
pnpm check          # tsc --noEmit
pnpm format         # prettier --write .
```

No environment variables are needed to run the app. There is nothing to configure and no services to
stand up.

> **If `pnpm build` fails with a rollup `MODULE_NOT_FOUND`**, delete `node_modules` and the lockfile
> and reinstall — it is a known npm/pnpm optional-dependency issue, not a problem with this project.

---

## Project structure

```
client/
  src/
    pages/           Home, ModulePage, LibraryPage, FieldNotesPage,
                     CertificationPage, PreDemoChecklistPage, NotFound
    components/
      activities/    One component per activity type (7)
      ui/            Radix-based component library
    contexts/        GameContext (XP, levels, badges), UserContext (device
                     profile), ThemeContext
    lib/
      moduleData.ts  The entire curriculum — 11 modules, 31 activities
server/
  index.ts           Express static server (~30 lines)
shared/
  const.ts           Shared constants
patches/             pnpm patch for wouter
ideas.md             Design exploration and the derived design system
```

`client/src/lib/moduleData.ts` is the centre of gravity. Adding a module means adding one typed
object to `MODULES`; the activity components render whatever the data describes.

---

## Known limitations

Stated plainly, because they are the first things a reader will notice:

1. **Module videos will not load.** All 11 modules reference a `videoUrl` under `/manus-storage/…`,
   which resolves through a storage proxy that exists only on the platform the app was originally
   built on (it needs `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY`). Everything else works
   without them; the videos are supplementary explainers, not the content itself. Removing the
   dependency, or swapping in self-hosted assets, is open work.
2. **No tests.** `vitest` is a dependency and nothing uses it. The activity-scoring logic and
   `GameContext`'s XP/level/badge transitions are the obvious places to start.
3. **The dev server carries platform tooling.** `vite.config.ts` includes Manus runtime and
   debug-collector plugins that write browser logs to `.manus-logs/`. They are development-only and
   publicly installable from npm, so they do not block anything — but they are not this project's
   code and could be stripped.
4. **Single-device progress.** No accounts, no sync, no export. Clearing storage loses everything.
5. **Content is not expert-reviewed.** The curriculum was authored by one person synthesising
   published methodologies. It has not been validated by the authors of those methodologies or by a
   professional enablement team.

---

## Attribution

This is an **independent study project**. It is not affiliated with, endorsed by, or licensed from
any of the authors or organisations below, and it is not an official implementation of any of their
material.

The curriculum synthesises and teaches concepts from:

- **Robert Riefstahl** — *Demonstrating to Win!* (the source of Tell-Show-Tell, Demo Crimes and the
  bridge-building framing, and of this project's name)
- **Chris White** — *The Six Habits of Highly Effective Sales Engineers*
- **Matthew Dixon & Brent Adamson** — *The Challenger Sale*
- **Jack Napoli & Dick Dunkel** — MEDDPICC / MEDDIC
- **Neil Rackham** — *SPIN Selling*
- **Peter Cohan** — *Great Demo!*
- **John Care & Aron Bohlig** — *Mastering Technical Sales*
- **David Maister, Charles Green & Robert Galford** — *The Trusted Advisor*

All eight are credited with authors and summaries in the in-app reading list at `/library`. If you
find this useful, buy the books — they are the actual source material.

The AI-specific guidance (`aiContext` on every module, the AI demo crimes, the AI bridge fears) is
original to this project.

---

## License

MIT — see [`LICENSE`](LICENSE). Copyright (c) 2026 Shwetal Mehta.

The MIT license covers this repository's **code**. It does not grant rights to the underlying sales
methodologies, which belong to their respective authors — see [Attribution](#attribution).
