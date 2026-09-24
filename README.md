# Agent Shipyard

A hands-on course in agentic software development: go from driving one AI agent you fully
understand, to running a crew of them behind automated gates, to designing the architecture
that sits underneath — learned by building real applications end to end.

The site is a static Astro build. Progress is stored in your browser, so there is no account,
no sign-in, and nothing leaves your machine.

---

## What the course covers

Three strands run in parallel, because none of them is much use alone:

| Strand | What it teaches | Where it comes from |
| --- | --- | --- |
| **The Loop** | One repeatable path for every feature — scope, decide, build, prove, review, record — with every decision kept in a file so work survives any session. | JS Mastery's agentic engineering skills, and obra's Superpowers |
| **The Crew** | Several agents at once, each in its own worktree, behind gates that catch their mistakes, with you managing rather than typing. | Kun Chen's agentic engineering |
| **Architecture** | Components, data, trust boundaries, scale and failure — and choosing the right workflow and stack for a given problem. Trained with decision drills and a mastery exam. | — |

Full attribution, including how strong the evidence behind each claim is, lives on the
site's `/sources/` page.

### The four tiers

| Tier | Name | You leave able to | Pace |
| --- | --- | --- | --- |
| 1 | Foundation | Drive one agent safely and understand what it is doing. | A weekend |
| 2 | Practitioner | Ship a feature end to end with a repeatable loop, and fix or take over code. | 3–4 weeks |
| 3 | Advanced | Run a crew of agents behind gates, and design multi-role and distributed systems. | 6–8 weeks |
| 4 | Expert | Run many projects at once, design AI systems, and choose the right workflow for any use case. | Ongoing |

Each tier ends with a **gate** — an honest test of whether the next tier is worth your time.

### Six guided builds

`Pocket Ledger` (expense tracker) → `Vault` (zero-knowledge password manager) →
`Book-a-Slot` (booking, three roles) → `Courier Live` (real-time tracking) →
`Support Copilot` (an AI agent inside a product) → `Capstone` (your product, your workflow).

Each one raises the bar on architecture, security, UI and product, and changes how you work
with agents.

---

## Current state

**The course is complete.** All 24 sections across four tiers are written: 135 pages covering
every part, every architecture strand, all six guided projects and the mastery exam.

| | |
| --- | --- |
| Pages | 135 (46 lessons, 26 architecture, 37 project milestones, 5 decision lessons, 5 drill sets, 4 exam, 6 overviews, 3 reviews, 3 setup) |
| Sections | 24 across 4 tiers |
| Guided projects | 6, from a solo expense tracker to a self-designed capstone |
| Glossary | 98 precise definitions, plus 73 terms explained in plain language with an everyday analogy |
| Workflow kit | 33 downloadable files |
| Tool index | 31 tools, each with the point at which it earns a place in your setup |

Every internal link resolves, every page has one `<h1>` and no skipped heading levels, and
axe-core reports zero WCAG 2.1 AA violations in both themes. `npm run verify` enforces all of
that on every build.

### What each tier contains

**Tier 1 · Foundation** (18 pages) — Start here, Part 0 Groundwork, Part 1 One agent understood.

**Tier 2 · Practitioner** (30 pages) — Architecture A1, Part 2 The feature loop, Project L1
Pocket Ledger, Part 3 When things go wrong, Architecture A2 Trust boundaries.

**Tier 3 · Advanced** (44 pages) — Part 4 A crew on one product (in three parts), Architecture
A3 Multi-role systems and A4 Distributed systems, and Projects L2 Vault, L3 Book-a-Slot and
L4 Courier Live.

**Tier 4 · Expert** (43 pages) — Part 5 Many projects at once, Architecture A5 AI system
architecture and A6 Platform architecture, Project L5 Support Copilot, Part 6 Making decisions,
Part 7 Designing and owning your workflow, Project L6 Capstone, and the mastery exam.

---

## Beyond the lessons

Six reference pages, built to be reopened months later:

- **`/kit/`** — every instruction file, skill, subagent, hook and gate the course has you
  build, ready to download into a new project, with the lesson that made each one.
- **`/skills/`** — the ten competencies behind the lessons, and your level in each, rising as
  you mark lessons done.
- **`/glossary/`** — every AI and agentic term in plain words with an analogy, then the full
  A–Z of course definitions.
- **`/cheatsheets/`** — which path to run, how much checking a change gets, the prompts worth
  keeping, and the commands you reach for.
- **`/tools/`** — the tool index.
- **`/sources/`** — who each idea belongs to, and how strong the evidence is.

---

## Running it locally

Requires Node 20.3 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build to `dist/`, then the Pagefind search index |
| `npm run preview` | Serve the built site |
| `npm run verify` | Check the built site (see below) |
| `npm run check` | `astro check` — **currently broken**, see Known issues |

### `npm run verify`

The course argues that a change is not done until something other than the agent says so.
This is that something for this repo. Run it after `npm run build`; it exits non-zero on any
failure, so it works as a pre-push or CI gate. It checks:

- every internal link and asset reference resolves (currently 20,962 links across 142 pages);
- every page has exactly one `<h1>`, a `<title>`, and no skipped heading levels;
- every kit file listed in the data exists in the build, is non-empty, and is not a dotfile
  that static hosts would silently refuse to serve;
- every lesson referenced by the kit, tool and glossary data exists (currently zero dangling
  references);
- the Pagefind search index was built.

---

## How it is built

- **[Astro 5](https://astro.build)** with MDX content collections. Lessons are `.mdx` files
  under `src/content/course/<section>/`, validated against a Zod schema.
- **No UI framework.** Plain HTML, scoped CSS and a single small TypeScript module.
- **[Pagefind](https://pagefind.app)** for search, indexed at build time.
- **Design tokens** in `src/styles/tokens.css`, with a dark and a light theme. Dark is the
  default and is applied before first paint, so there is no flash.
- **Motion** is opt-in and layered on: every reveal is gated behind a `has-js` class the inline
  script adds, so the page is complete without JavaScript, and everything is disabled under
  `prefers-reduced-motion: reduce`.
- **Accessibility**: axe-core reports **zero WCAG 2.1 AA violations** across the site in both
  themes.

```
src/
  content/course/     lesson MDX, one folder per section
  data/               course order, glossary, terms, kit, tools, sources, competencies
  components/         Analogy, Exercise, Quiz, Drill, Terms, KitFile and friends
  layouts/Base.astro  shell, theme bootstrap, nav
  pages/              home, the six reference pages, and [...slug] for lessons
  scripts/app.ts      progress, quizzes, drawer, search, shortcuts
  styles/             tokens.css and global.css
public/kit/           the downloadable workflow kit
scripts/verify.mjs    the build gate
```

### Progress storage

Everything you tick — completions, notes, quiz answers, drill attempts — is kept in
`localStorage` under `shipyard:v1`, and the theme under `shipyard-theme`. Clearing site data
resets your progress. Nothing is sent anywhere.

---

## Deploying

The build is fully static, so any static host works.

```bash
npm run build     # outputs dist/
```

Set `SITE_URL` to the deployed origin so canonical and Open Graph URLs are right:

```bash
SITE_URL=https://your-domain.example npm run build
```

On Vercel, Astro is detected automatically (build `npm run build`, output `dist`). Add
`SITE_URL` as an environment variable in the project settings.

---

## Known issues

- **`npm run check` fails.** `@astrojs/check@0.9.10` (the latest) pulls
  `@astrojs/language-server@2.17.0`, which `require()`s the ESM-only `@astrojs/astro2tsx`,
  throwing `ERR_REQUIRE_ESM`. Pinning astro2tsx to 0.1.0 does not help. This is upstream and
  blocks nothing: `npm run build` compiles and type-checks the Astro and MDX sources, and
  `npm run verify` covers the rest.

---

## Contributing and corrections

Tools in this field change monthly. If a command in a lesson has stopped working, a figure is
wrong, or an idea is credited to the wrong person, that is a bug worth filing — the course
claims to be checked as of September 2026 and should stay honest about it.
