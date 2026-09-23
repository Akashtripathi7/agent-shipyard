// Every tool the course names, what it does for you, and when it earns a place.
// `lesson` is the slug where it first appears, or undefined for general reference.

export interface Tool {
  name: string;
  what: string;
  when: string;
  lesson?: string;
  href?: string;
  group: 'Running agents' | 'Instructions and skills' | 'Design and UI' | 'Testing' | 'Security' | 'Watching cost and behaviour' | 'Building AI products';
}

export const tools: Tool[] = [
  // Running agents
  { group: 'Running agents', name: 'Claude Code', what: 'The agent harness used throughout the course: runs the loop, holds skills, subagents, hooks and permissions.', when: 'From lesson one.', lesson: 'p1/agent-loop', href: 'https://code.claude.com/docs' },
  { group: 'Running agents', name: 'tmux', what: 'Keeps terminal sessions alive after you disconnect, and splits one screen into many.', when: 'Before Part 1: everything parallel depends on it.', lesson: 'p0/tmux' },
  { group: 'Running agents', name: 'git worktrees', what: 'A second working folder for the same repo, so two agents never edit the same file.', when: 'The moment you run a second agent.', lesson: 'p0/worktrees' },
  { group: 'Running agents', name: 'Subagents', what: 'Helper agents with their own context and tool list, defined as files in .claude/agents/.', when: 'When a task would flood your session, or needs fresh eyes.', lesson: 'p4a/crew-roles' },
  { group: 'Running agents', name: 'Firstmate', what: 'One agent that runs a crew for you: spawns workers in their own windows and worktrees, and interrupts you only for decisions.', when: 'Once coordinating sessions yourself is the bottleneck.', href: 'https://github.com/kunchenguid/firstmate' },
  { group: 'Running agents', name: 'Treehouse', what: 'Keeps a pool of ready worktrees with dependencies installed, so a new task starts instantly.', when: 'When you create more than two worktrees a day.', href: 'https://github.com/kunchenguid/treehouse' },
  { group: 'Running agents', name: 'gnhf', what: 'Runs an agent unattended in a loop: one small committed change per round, with retries and limits.', when: 'Well-specified mechanical work, with gates you already trust.', href: 'https://github.com/kunchenguid/gnhf' },

  // Instructions and skills
  { group: 'Instructions and skills', name: 'AGENTS.md and CLAUDE.md', what: 'The instruction file every agent reads before a task. Keep only what cannot be inferred from the code.', when: 'Now, in every repo you work in.', lesson: 'p1/instructions' },
  { group: 'Instructions and skills', name: 'Skills', what: 'Folders with a SKILL.md that load only when relevant, or when called by name.', when: 'As soon as you have typed the same instruction twice.', lesson: 'p1/first-skill' },
  { group: 'Instructions and skills', name: 'Hooks', what: 'Commands the harness runs automatically: after each tool call, or when the agent tries to finish.', when: 'When a rule matters enough that asking politely is not enough.', lesson: 'p1/done' },
  { group: 'Instructions and skills', name: 'backpass', what: 'Reads your real session transcripts and proposes evidence-backed edits to your instruction file.', when: 'After a few months of sessions, when you cannot remember which rules helped.', href: 'https://github.com/kunchenguid/backpass' },
  { group: 'Instructions and skills', name: 'Altitude skills', what: 'Turns the agent into a tutor rather than a ghostwriter: one small task per sitting, with quizzes.', when: 'While learning, especially on your first project.', href: 'https://github.com/jasonku09/altitude-skills' },

  // Design and UI
  { group: 'Design and UI', name: 'Google Stitch', what: 'Fast design exploration that exports Flutter and SwiftUI, with an MCP server into your agent tool.', when: 'At the start of any screen work.', lesson: 'p4b/ui-agents' },
  { group: 'Design and UI', name: 'Figma MCP', what: 'Lets agents read your design system and variables, and create or update frames on the canvas.', when: 'When a shared design system exists.', lesson: 'p4b/ui-agents' },
  { group: 'Design and UI', name: 'Dart and Flutter MCP', what: 'Analyzer, test runner, app control and screenshots, so an agent can check its own UI work.', when: 'Any Flutter project.', lesson: 'p4b/ui-agents', href: 'https://docs.flutter.dev/ai/get-started' },
  { group: 'Design and UI', name: 'Rive and Lottie', what: 'Interactive state-machine animation and exported motion files; Lottie Creator has an MCP server.', when: 'From the project where motion carries meaning.', lesson: 'p4b/ui-agents' },

  // Testing
  { group: 'Testing', name: 'Maestro', what: 'Mobile end-to-end tests in plain YAML, with an MCP server so an agent can write, run and fix flows on a device.', when: 'As soon as a user journey matters.', lesson: 'p4b/testing', href: 'https://github.com/mobile-dev-inc/maestro' },
  { group: 'Testing', name: 'Playwright', what: 'Browser automation and end-to-end tests, repeatable across browsers.', when: 'Any web surface.', lesson: 'p4b/testing' },
  { group: 'Testing', name: 'Testcontainers', what: 'Runs a real database in a container for integration tests, instead of mocking the thing under test.', when: 'The first time a query bug reaches production.', lesson: 'p4b/testing' },
  { group: 'Testing', name: 'k6', what: 'Load testing: simulate many users and measure what actually happens under pressure.', when: 'Before promising anyone a real-time guarantee.', lesson: 'a4/scale' },

  // Security
  { group: 'Security', name: 'gitleaks', what: 'Blocks commits containing secrets, before they ever reach a remote.', when: 'Every repo, from the first commit.', lesson: 'p4a/security' },
  { group: 'Security', name: 'Semgrep', what: 'Scans for insecure code patterns on every commit and in CI.', when: 'Alongside gitleaks.', lesson: 'p4a/security' },
  { group: 'Security', name: 'Docker Sandboxes', what: 'Runs an agent in an isolated micro-VM with its own kernel, filesystem scope and network policy.', when: 'Unattended runs, or anything touching code you do not trust.', href: 'https://www.docker.com/products/docker-sandboxes/' },
  { group: 'Security', name: 'no-mistakes', what: 'A local git gate: reviews, tests and fixes a change in a separate worktree before it reaches the remote.', when: 'When running the review checklist by hand gets tedious.', href: 'https://github.com/kunchenguid/no-mistakes' },
  { group: 'Security', name: 'promptfoo', what: 'Evaluations and red-teaming for products that contain an agent.', when: 'Before shipping any user-facing agent.', lesson: 'a5/evals-guardrails' },

  // Watching cost and behaviour
  { group: 'Watching cost and behaviour', name: 'OpenTelemetry export', what: 'Sends usage, cost and tool traces from your agent tool into a dashboard you already run.', when: 'Once more than one project is live.', lesson: 'p5/watching' },
  { group: 'Watching cost and behaviour', name: 'quota-axi', what: 'Shows how much of your subscription window is left before a long run stalls.', when: 'When several projects share one account.', href: 'https://github.com/kunchenguid/quota-axi' },
  { group: 'Watching cost and behaviour', name: 'Langfuse', what: 'Traces, prompts and evaluation results for agents inside your product.', when: 'From the first production AI feature.', lesson: 'a5/evals-guardrails' },

  // Building AI products
  { group: 'Building AI products', name: 'Claude Agent SDK', what: 'The same agent loop that powers Claude Code, as a library for your own product.', when: 'When the product itself contains an agent.', lesson: 'a5/agent-architecture' },
  { group: 'Building AI products', name: 'LangGraph', what: 'Explicit state graphs for agents, with checkpoints you can resume.', when: 'When the flow has real states and must survive a restart.', lesson: 'a5/agent-architecture' },
  { group: 'Building AI products', name: 'pgvector', what: 'Vector search inside PostgreSQL, so retrieval lives in the database you already run.', when: 'The simplest starting point for retrieval.', lesson: 'a5/retrieval' },
];

export const toolGroups = [...new Set(tools.map((t) => t.group))];
