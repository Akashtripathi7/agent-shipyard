// What the course is built on. Every figure quoted in a lesson comes from here.

export interface Source {
  title: string;
  who: string;
  href: string;
  what: string;
  group: 'The two schools' | 'Agent engineering' | 'Security' | 'Tools and documentation' | 'Evidence and studies';
  note?: string; // honesty about how strong the evidence is
}

export const sources: Source[] = [
  {
    group: 'The two schools',
    title: 'Agentic Engineering course and open-source skills',
    who: 'Adrian Hajdin, JS Mastery',
    href: 'https://jsmastery.com/course/agentic-engineering-course',
    what: 'The feature loop this course teaches in Part 2: scope, architect, develop, verify, review, test, document, sync, and choosing an entry point for the situation you are in.',
  },
  {
    group: 'The two schools',
    title: 'Field notes on agentic engineering',
    who: 'Kun Chen',
    href: 'https://blog.kunchenguid.com/',
    what: 'The crew and fleet model in Parts 4 and 5: parallel agents in isolated worktrees, a gate before anything reaches you, and running several products at once.',
  },
  {
    group: 'The two schools',
    title: 'no-mistakes, firstmate, treehouse, gnhf, backpass',
    who: 'Kun Chen',
    href: 'https://github.com/kunchenguid',
    what: 'The open-source tooling behind the crew model: the review gate, the crew runner, worktree pools, unattended runs and transcript-driven instruction edits.',
  },
  {
    group: 'Agent engineering',
    title: 'The definitive guide to AGENTS.md',
    who: 'Jason Ku',
    href: 'https://www.youtube.com/watch?v=ON9jQQPRGpQ',
    what: 'What belongs in an instruction file and what makes it worse: the rule that anything inferable from the code should be left out.',
  },
  {
    group: 'Agent engineering',
    title: 'agents-md-snippets and Altitude skills',
    who: 'Jason Ku',
    href: 'https://github.com/jasonku09/agents-md-snippets',
    what: 'Context re-entry, mandatory test-first, worktrees for parallel agents, and the builder/driver split that keeps gate runs cheap.',
  },
  {
    group: 'Agent engineering',
    title: 'Building effective agents',
    who: 'Anthropic',
    href: 'https://www.anthropic.com/engineering/building-effective-agents',
    what: 'The distinction between fixed workflows and agents, the standard coordination patterns, and the advice to add complexity only when it demonstrably helps.',
  },
  {
    group: 'Agent engineering',
    title: 'How we built our multi-agent research system',
    who: 'Anthropic',
    href: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    what: 'Measured multi-agent results, token multipliers, when multi-agent is a poor fit, and the failure modes: duplicated work, over-spawning, vague briefs.',
  },
  {
    group: 'Security',
    title: 'Top 10 for Agentic Applications, 2026',
    who: 'OWASP GenAI Security Project',
    href: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    what: 'The risk categories specific to agents: goal hijack, tool misuse, privilege abuse, supply-chain compromise, memory poisoning and cascading failures.',
  },
  {
    group: 'Security',
    title: 'The lethal trifecta for AI agents',
    who: 'Simon Willison',
    href: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
    what: 'Private data, untrusted content and an outbound channel. Remove any one leg and the attack path breaks.',
  },
  {
    group: 'Security',
    title: 'Slopsquatting: when agents hallucinate malicious packages',
    who: 'Trend Micro',
    href: 'https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/slopsquatting-when-ai-agents-hallucinate-malicious-packages',
    what: 'Why every new dependency an agent suggests needs checking before installing.',
  },
  {
    group: 'Tools and documentation',
    title: 'Claude Code documentation',
    who: 'Anthropic',
    href: 'https://code.claude.com/docs',
    what: 'Subagents, worktrees, hooks, permissions, sandboxing and the ways of running agents in parallel.',
  },
  {
    group: 'Tools and documentation',
    title: 'Get started developing with AI',
    who: 'Flutter',
    href: 'https://docs.flutter.dev/ai/get-started',
    what: 'The official Dart and Flutter MCP server: analyzer access, test runs, app control and screenshots.',
  },
  {
    group: 'Tools and documentation',
    title: 'Maestro',
    who: 'mobile.dev',
    href: 'https://github.com/mobile-dev-inc/maestro',
    what: 'Mobile end-to-end testing, and the MCP server that lets an agent write, run and repair flows on a real device.',
  },
  {
    group: 'Evidence and studies',
    title: 'Repository context files and agent performance',
    who: 'ETH Zurich',
    href: 'https://arxiv.org/abs/2602.11988',
    what: 'Context files padded with inferable detail reduced task success and raised cost by up to 20%.',
    note: 'A controlled study on hundreds of real issues. The strongest evidence behind the "keep it short" rule.',
  },
  {
    group: 'Evidence and studies',
    title: 'Measuring the impact of AI on experienced developers',
    who: 'METR',
    href: 'https://x.com/METR_Evals/status/1943360399220388093',
    what: 'Developers expected a 24% speed-up, believed afterwards they had gained 20%, and were measured 19% slower.',
    note: 'A randomized trial with early-2025 tools. Tools have improved; the gap between feeling and stopwatch has not.',
  },
  {
    group: 'Evidence and studies',
    title: 'Gate findings across ~1,000 agent changes',
    who: 'Kun Chen',
    href: 'https://github.com/kunchenguid/no-mistakes',
    what: 'Roughly 63% of agent changes had at least one real mistake caught before a human looked.',
    note: 'One practitioner\'s own repositories, not a controlled study. Treat the shape as instructive and the number as indicative.',
  },
];

export const sourceGroups = [...new Set(sources.map((s) => s.group))];
