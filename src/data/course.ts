// The single source of truth for course order.
// Each page lives at src/content/course/<section>/<slug>.mdx and declares its own `order`.

export type Tier = 1 | 2 | 3 | 4;

export interface Section {
  id: string;
  label: string; // short label shown above the title, e.g. "Part 1"
  title: string;
  tier: Tier;
  kind: 'start' | 'part' | 'arch' | 'project' | 'decisions' | 'exam';
  blurb: string;
}

export interface TierInfo {
  name: string;
  /** What you can do once this tier is behind you. */
  can: string;
  /** The honest reason this tier sits where it does. */
  why: string;
  /** The one thing you must be able to do before the next tier is worth starting. */
  gate: string;
  /** A realistic pace at four to six hours a week. */
  pace: string;
}

export const tiers: Record<Tier, TierInfo> = {
  1: {
    name: 'Foundation',
    can: 'Drive one agent safely and understand what it is doing.',
    why: 'Everything later is this loop repeated. Skip it and you will be managing a crew you cannot read.',
    gate: 'You can explain, without looking it up, what went into the agent\u2019s context and why it did what it did.',
    pace: 'A weekend',
  },
  2: {
    name: 'Practitioner',
    can: 'Ship a feature end to end with a repeatable loop, and fix or take over code.',
    why: 'One agent used well beats three used badly. The loop you build here is the one the crew will run later.',
    gate: 'You have shipped a feature through your own loop twice, and the second time was faster than the first.',
    pace: '3\u20134 weeks',
  },
  3: {
    name: 'Advanced',
    can: 'Run a crew of agents behind gates, and design multi-role and distributed systems.',
    why: 'Parallelism only pays once verification is automatic. That is why the gates come before the crew.',
    gate: 'A crew run finished without you reading every diff, because the gates caught what you would have caught.',
    pace: '6\u20138 weeks',
  },
  4: {
    name: 'Expert',
    can: 'Run many projects at once, design AI systems, and choose the right workflow and architecture for any use case.',
    why: 'At this point the bottleneck is judgment, not throughput. The last tier trains the choosing, not the doing.',
    gate: 'You can defend a workflow and an architecture choice to someone who disagrees with you.',
    pace: 'Ongoing',
  },
};

export const sections: Section[] = [
  { id: 'start', label: 'Start here', title: 'Start here', tier: 1, kind: 'start', blurb: 'How the course works, setting up your machine, and the map.' },
  { id: 'p0', label: 'Part 0', title: 'Groundwork', tier: 1, kind: 'part', blurb: 'The terminal skills everything else stands on: tmux, worktrees, and the two schools of agentic engineering.' },
  { id: 'p1', label: 'Part 1', title: 'One agent, understood', tier: 1, kind: 'part', blurb: 'What an agent actually does, and the handful of controls that decide how well it does it.' },
  { id: 'a1', label: 'Architecture A1', title: 'What architecture is', tier: 2, kind: 'arch', blurb: 'Components, boundaries, data and decisions: the vocabulary for designing any system.' },
  { id: 'p2', label: 'Part 2', title: 'The feature loop', tier: 2, kind: 'part', blurb: 'One repeatable loop that takes a feature from idea to merged, with every decision kept in files.' },
  { id: 'l1', label: 'Project L1', title: 'Pocket Ledger', tier: 2, kind: 'project', blurb: 'A personal expense tracker, built end to end with one agent and your own feature loop.' },
  { id: 'p3', label: 'Part 3', title: 'When things go wrong', tier: 2, kind: 'part', blurb: 'Debugging to the root cause, rescuing a broken session, and taking over code you did not write.' },
  { id: 'a2', label: 'Architecture A2', title: 'Trust boundaries', tier: 2, kind: 'arch', blurb: 'Threat models, authentication, authorization, encryption and secrets, designed in rather than bolted on.' },
  { id: 'p4a', label: 'Part 4', title: 'A crew on one product', tier: 3, kind: 'part', blurb: 'Several agents on one product: when to split, how to coordinate, and how to keep them safe.' },
  { id: 'l2', label: 'Project L2', title: 'Vault', tier: 3, kind: 'project', blurb: 'A zero-knowledge password manager, built by your first small crew behind real security gates.' },
  { id: 'a3', label: 'Architecture A3', title: 'Multi-role systems', tier: 3, kind: 'arch', blurb: 'Tenants, roles, background jobs, caches, environments and delivery pipelines.' },
  { id: 'p4b', label: 'Part 4, continued', title: 'Gates, tests and UI', tier: 3, kind: 'part', blurb: 'Automated review, testing as a crew member, and designing and verifying UI with agents.' },
  { id: 'l3', label: 'Project L3', title: 'Book-a-Slot', tier: 3, kind: 'project', blurb: 'Appointment booking for a small business: three roles, two frontends, a parallel crew and a real pipeline.' },
  { id: 'a4', label: 'Architecture A4', title: 'Distributed systems', tier: 3, kind: 'arch', blurb: 'Services, events, consistency, backpressure, real-time transports and knowing what your system is doing.' },
  { id: 'p4c', label: 'Part 4, finale', title: 'A crew run, end to end', tier: 3, kind: 'part', blurb: 'Everything in Part 4 at once, on a real feature, including what goes wrong.' },
  { id: 'l4', label: 'Project L4', title: 'Courier Live', tier: 3, kind: 'project', blurb: 'Real-time delivery tracking across three apps and two services, with a hierarchical crew.' },
  { id: 'p5', label: 'Part 5', title: 'Many projects at once', tier: 4, kind: 'part', blurb: 'Running a fleet of products safely, watching it, and handling trouble in one while you work on another.' },
  { id: 'a5', label: 'Architecture A5', title: 'AI system architecture', tier: 4, kind: 'arch', blurb: 'Designing products that contain an agent: retrieval, tools, guardrails, evaluations and budgets.' },
  { id: 'l5', label: 'Project L5', title: 'Support Copilot', tier: 4, kind: 'project', blurb: 'An AI support agent inside Book-a-Slot, built while that product keeps running.' },
  { id: 'p6', label: 'Part 6', title: 'Making decisions', tier: 4, kind: 'decisions', blurb: 'The judgment layer: reversible and irreversible calls, trade-offs, stacks, and agents as sparring partners.' },
  { id: 'a6', label: 'Architecture A6', title: 'Platform architecture', tier: 4, kind: 'arch', blurb: 'Offline-first sync, native versus cross-platform, infrastructure as code, and compliance.' },
  { id: 'p7', label: 'Part 7', title: 'Designing and owning your workflow', tier: 4, kind: 'part', blurb: 'Choose, measure, improve and package your own workflow, then bring it to your team.' },
  { id: 'l6', label: 'Project L6', title: 'Capstone', tier: 4, kind: 'project', blurb: 'A product you choose and a workflow you design, run and measure for a month.' },
  { id: 'exam', label: 'Finale', title: 'Mastery exam', tier: 4, kind: 'exam', blurb: 'Three unseen scenarios. Design the workflow and the architecture, then defend every choice.' },
];

export const sectionById = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<string, Section>;

// The six guided projects, for the home page and the map.
export const projects = [
  { id: 'l1', code: 'L1', name: 'Pocket Ledger', pitch: 'Expense tracker. One agent, the full feature loop, deployed.', stack: ['Flutter', 'FastAPI', 'PostgreSQL'], tier: 2 as Tier },
  { id: 'l2', code: 'L2', name: 'Vault', pitch: 'Zero-knowledge password manager. Your first crew, real security gates.', stack: ['Flutter', 'FastAPI', 'On-device crypto'], tier: 3 as Tier },
  { id: 'l3', code: 'L3', name: 'Book-a-Slot', pitch: 'Booking for a clinic or salon. Three roles, two frontends, a parallel crew.', stack: ['Flutter', 'Next.js', 'FastAPI', 'Redis'], tier: 3 as Tier },
  { id: 'l4', code: 'L4', name: 'Courier Live', pitch: 'Live delivery tracking. Two services, an event bus, three apps.', stack: ['Go', 'Kotlin', 'PostGIS', 'NATS'], tier: 3 as Tier },
  { id: 'l5', code: 'L5', name: 'Support Copilot', pitch: 'An AI agent inside your product, built while another product runs.', stack: ['Agent SDK', 'pgvector', 'Evals'], tier: 4 as Tier },
  { id: 'l6', code: 'L6', name: 'Capstone', pitch: 'Your product, your workflow, measured for a month.', stack: ['SwiftUI', 'Kotlin', 'Terraform'], tier: 4 as Tier },
];
