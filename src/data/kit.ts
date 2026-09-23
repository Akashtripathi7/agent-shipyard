// Your workflow kit: every reusable file the course has you build.
// Each `path` is relative to public/kit/ and is served for download at /kit/<path>.

export interface KitItem {
  id: string;
  title: string;
  path: string;
  group: 'Instructions' | 'Scripts and hooks' | 'Settings' | 'Skills' | 'Subagents' | 'Templates' | 'Plugin';
  lesson: string; // slug of the page that builds it
  install: string; // where it goes in a project
  what: string;
}

export const kit: KitItem[] = [
  // Part 1
  { id: 'loop-log', title: 'Loop-log hook', path: 'hooks/loop-log.settings.json', group: 'Scripts and hooks', lesson: 'p1/agent-loop', install: '.claude/settings.json (merge)', what: 'Logs every tool call to .claude/loop.jsonl so you can read the agent loop.' },
  { id: 'check-sh', title: 'Single check script', path: 'scripts/check.sh', group: 'Scripts and hooks', lesson: 'p1/workflow-or-agent', install: 'scripts/check.sh', what: 'One command that runs every check. The agent, you and CI all call it.' },
  { id: 'agents-md', title: 'AGENTS.md template', path: 'instructions/AGENTS.md', group: 'Instructions', lesson: 'p1/instructions', install: 'AGENTS.md', what: 'Only what an agent cannot infer: commands, conventions, product rules, outside pointers.' },
  { id: 'claude-md', title: 'CLAUDE.md pointer', path: 'instructions/CLAUDE.md', group: 'Instructions', lesson: 'p1/instructions', install: 'CLAUDE.md', what: 'One line that imports AGENTS.md, so every agent tool follows the same rules.' },
  { id: 'require-green', title: 'Require-green Stop hook', path: 'hooks/require-green.sh', group: 'Scripts and hooks', lesson: 'p1/done', install: '.claude/hooks/require-green.sh', what: 'Blocks the agent from finishing while checks fail, without looping forever.' },
  { id: 'guardrails', title: 'Guardrail settings', path: 'settings/guardrails.settings.json', group: 'Settings', lesson: 'p1/guardrails', install: '.claude/settings.json', what: 'Deny rules for secrets and destructive commands, plus the loop-log and Stop hooks.' },
  { id: 'brief-template', title: 'Brief template', path: 'templates/BRIEF.md', group: 'Templates', lesson: 'p1/briefing', install: 'Paste into your request, or keep in docs/', what: 'Outcome, why, constraints, evidence, and what to escalate.' },
  { id: 'skill-explain', title: '/explain-changes skill', path: 'skills/explain-changes/SKILL.md', group: 'Skills', lesson: 'p1/first-skill', install: '~/.claude/skills/explain-changes/SKILL.md', what: 'Explains uncommitted changes, flags risks, and quizzes you before you commit.' },

  // Architecture A1 and Part 2
  { id: 'adr-template', title: 'ADR template', path: 'templates/ADR.md', group: 'Templates', lesson: 'a1/decisions-on-paper', install: 'docs/decisions/NNNN-<slug>.md', what: 'Context, decision, alternatives and honest consequences for one load-bearing decision.' },
  { id: 'spec-template', title: 'Spec template', path: 'templates/SPEC.md', group: 'Templates', lesson: 'p2/architect', install: 'docs/specs/NNNN-<slug>.md', what: 'Goal, decisions, changes, numbered acceptance criteria, out of scope, open questions.' },
  { id: 'skill-scope', title: '/scope skill', path: 'skills/scope/SKILL.md', group: 'Skills', lesson: 'p2/scope', install: '.claude/skills/scope/SKILL.md', what: 'Challenges the idea, then keeps a living plan of small slices with statuses.' },
  { id: 'skill-architect', title: '/architect skill', path: 'skills/architect/SKILL.md', group: 'Skills', lesson: 'p2/architect', install: '.claude/skills/architect/SKILL.md', what: 'Design conversation for one slice; writes a spec with testable criteria and any ADRs.' },
  { id: 'skill-develop', title: '/develop skill', path: 'skills/develop/SKILL.md', group: 'Skills', lesson: 'p2/develop', install: '.claude/skills/develop/SKILL.md', what: 'Builds an approved spec test-first, and stops to ask instead of inventing decisions.' },
  { id: 'skill-verify', title: '/verify skill', path: 'skills/verify/SKILL.md', group: 'Skills', lesson: 'p2/verify-test', install: '.claude/skills/verify/SKILL.md', what: 'Runs the real app against every acceptance criterion and records evidence.' },
  { id: 'skill-review', title: '/review skill', path: 'skills/review/SKILL.md', group: 'Skills', lesson: 'p2/review-sync', install: '.claude/skills/review/SKILL.md', what: 'Fresh-context review against the spec, AGENTS.md and ADRs.' },
  { id: 'skill-document', title: '/document skill', path: 'skills/document/SKILL.md', group: 'Skills', lesson: 'p2/review-sync', install: '.claude/skills/document/SKILL.md', what: 'PR descriptions, changelog entries and release notes from the real diff.' },
  { id: 'skill-sync', title: '/sync skill', path: 'skills/sync/SKILL.md', group: 'Skills', lesson: 'p2/review-sync', install: '.claude/skills/sync/SKILL.md', what: 'Brings AGENTS.md, scope and spec statuses back in line with reality.' },
  { id: 'workflow-md', title: 'WORKFLOW.md', path: 'templates/WORKFLOW.md', group: 'Templates', lesson: 'p2/paths-depths', install: 'WORKFLOW.md or docs/WORKFLOW.md', what: 'The project’s default depth, entry points and overrides.' },

  // Part 3
  { id: 'skill-debug', title: '/debug skill', path: 'skills/debug/SKILL.md', group: 'Skills', lesson: 'p3/debug', install: '.claude/skills/debug/SKILL.md', what: 'Classify, reproduce, isolate, prove, then fix with a regression test.' },
  { id: 'handoff-template', title: 'Handoff note', path: 'templates/HANDOFF.md', group: 'Templates', lesson: 'p3/recover', install: 'HANDOFF.md (temporary, per task)', what: 'Goal, done, decided, tried and failed, current state, next step.' },
  { id: 'skill-audit', title: '/audit skill', path: 'skills/audit/SKILL.md', group: 'Skills', lesson: 'p3/take-over', install: '.claude/skills/audit/SKILL.md', what: 'Maps an inherited codebase from evidence and drafts a short AGENTS.md.' },
  // Architecture A2
  { id: 'threat-model', title: 'Threat model template', path: 'templates/THREAT-MODEL.md', group: 'Templates', lesson: 'a2/threat-model', install: 'docs/security/THREAT-MODEL.md', what: 'Assets, actors, boundaries, STRIDE threats and decisions, plus your agents’ own access.' },

  // Part 4
  { id: 'agent-backend', title: 'backend-builder subagent', path: 'agents/backend-builder.md', group: 'Subagents', lesson: 'p4a/crew-roles', install: '.claude/agents/backend-builder.md', what: 'Builds backend slices test-first in its own worktree; never changes the contract.' },
  { id: 'agent-app', title: 'app-builder subagent', path: 'agents/app-builder.md', group: 'Subagents', lesson: 'p4a/crew-roles', install: '.claude/agents/app-builder.md', what: 'Builds Flutter screens on design tokens, with every state handled.' },
  { id: 'agent-code-reviewer', title: 'code-reviewer subagent', path: 'agents/code-reviewer.md', group: 'Subagents', lesson: 'p4a/crew-roles', install: '.claude/agents/code-reviewer.md', what: 'Read-only, fresh-eyes review against spec, contract, conventions and ADRs.' },
  { id: 'agent-security', title: 'security-reviewer subagent', path: 'agents/security-reviewer.md', group: 'Subagents', lesson: 'p4a/security', install: '.claude/agents/security-reviewer.md', what: 'Scanners, dependency checks, access-control questions. Never edits.' },
  { id: 'agent-qa', title: 'qa-tester subagent', path: 'agents/qa-tester.md', group: 'Subagents', lesson: 'p4b/testing', install: '.claude/agents/qa-tester.md', what: 'Integration and end-to-end tests against real services; edits test folders only.' },
  { id: 'agent-gate', title: 'gate-driver subagent', path: 'agents/gate-driver.md', group: 'Subagents', lesson: 'p4b/review-gate', install: '.claude/agents/gate-driver.md', what: 'A small, cheap model that runs checks and reviews, and parks judgment calls for you.' },
  { id: 'worktreeinclude', title: '.worktreeinclude', path: 'worktree/worktreeinclude.txt', group: 'Settings', lesson: 'p4a/handoffs', install: '.worktreeinclude', what: 'Copies untracked files such as .env into every new worktree.' },
  { id: 'pre-commit', title: 'Pre-commit security gate', path: 'security/pre-commit-config.yaml', group: 'Settings', lesson: 'p4a/security', install: '.pre-commit-config.yaml', what: 'gitleaks and Semgrep on every commit.' },
  { id: 'ci-workflow', title: 'CI workflow', path: 'ci/ci.yml', group: 'Settings', lesson: 'p4b/review-gate', install: '.github/workflows/ci.yml', what: 'The same checks plus secret scanning on every push; pair with branch protection.' },
  { id: 'maestro-flow', title: 'Maestro flow', path: 'testing/maestro-flow.yaml', group: 'Templates', lesson: 'p4b/testing', install: 'flows/add-expense.yaml', what: 'An end-to-end mobile test an agent can write, run and fix.' },
  { id: 'ui-tokens', title: 'Flutter design tokens', path: 'ui/tokens.dart', group: 'Templates', lesson: 'p4b/ui-agents', install: 'lib/theme/tokens.dart', what: 'Spacing, radius and motion tokens, with reduced motion built in.' },
];
