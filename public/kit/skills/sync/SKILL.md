---
name: sync
description: "Brings the project's context files back in line with reality after a change: AGENTS.md commands and rules, slice statuses in the scope, spec statuses and the ADR list. Use after merging, or whenever the docs might be stale."
---

## Current state

!`cat AGENTS.md 2>/dev/null || echo "no AGENTS.md yet"`

!`cat docs/scope/SCOPE.md 2>/dev/null || echo "no scope yet"`

!`grep -H "^Status:" docs/specs/*.md docs/decisions/*.md 2>/dev/null || echo "no specs or decisions yet"`

## What to do
1. Check every command in AGENTS.md still works (run it, or confirm the script exists).
2. Check every rule in AGENTS.md still matches the code. Flag rules the agent could now infer
   from the code: those should be removed.
3. Check each slice status in SCOPE.md and each spec status against what's actually built,
   verified and merged.
4. Show me the proposed edits as a short list. Apply them only after I say yes.

## Rules
- Keep AGENTS.md short. Prefer deleting a stale line to adding a new one.
- Never change an ADR's decision; only its status (for example, "Superseded by 0007").
