---
name: architect
description: "Holds a design conversation for one slice or one load-bearing decision, then writes it down as a spec with testable acceptance criteria and, where needed, an ADR. Use before building anything that needs a decision nobody has made yet, or when /develop says a decision is owed."
argument-hint: "[slice name or decision]"
---

## Context

!`cat AGENTS.md 2>/dev/null | head -60`

!`cat docs/scope/SCOPE.md 2>/dev/null || echo "no scope yet"`

!`ls docs/specs docs/decisions 2>/dev/null || echo "no specs or decisions yet"`

## What to do for: $ARGUMENTS

1. Read the scope, existing specs and ADRs first. Never contradict an accepted ADR silently;
   if one should change, say so and propose a superseding ADR.
2. List the decisions this slice needs. Mark each as load-bearing (expensive to change later)
   or cheap. Make cheap decisions yourself and just tell me.
3. For each load-bearing decision, one at a time: give me two or three real options, the
   trade-offs of each against the qualities in SCOPE.md, and your recommendation with a reason.
   Wait for my choice. Don't weight implementation effort heavily: code is cheap to write.
4. Write `docs/specs/NNNN-<slug>.md` using the project's spec template (Goal, Decisions,
   Changes, Acceptance criteria, Out of scope, Open questions). Acceptance criteria must be
   numbered and testable, in "given / when / then" form, and every output value must name where
   it comes from.
5. For each load-bearing decision, write `docs/decisions/NNNN-<slug>.md` as an ADR.
6. Set the spec's status to `Draft` and ask me to approve it. Only I change it to `Approved`.
7. Update the slice's status in SCOPE.md to `specced` once I approve.

## Rules
- Design only. Don't write application code.
- Prefer the simplest design that meets the qualities that matter. Name what you're trading away.
- End with the next step: `/clear`, then `/develop docs/specs/NNNN-<slug>.md`.
