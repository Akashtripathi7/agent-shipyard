---
name: scope
description: "Challenges a product idea before any code, then keeps a living plan of what to build, split into small slices with statuses. Use at the start of a new product, to enrol an existing codebase, or to pick the next slice. Run with no arguments to see where the project stands."
argument-hint: "[idea, or 'next']"
---

## Current scope

!`cat docs/scope/SCOPE.md 2>/dev/null || echo "NO SCOPE YET"`

## What to do

**If I gave no arguments and a scope exists:** show a short status (slices done, in progress, next) and stop.

**If there is no scope yet and this is a new idea** ($ARGUMENTS):
1. Challenge the idea before planning it. Ask me, one question at a time, and wait for each answer:
   - Who exactly is this for, and what problem do they have today?
   - What is the smallest version that would prove it's worth building?
   - What will we deliberately NOT build in version 1?
   - Which qualities matter most (speed, security, cost, simplicity) and which can wait?
2. Push back on anything that looks like scope creep. Suggest cuts.
3. Write `docs/scope/SCOPE.md` with: Problem, Users, Version 1 in and out, Qualities that matter,
   and Slices. A slice is a small vertical piece a user could notice, buildable in one or two sessions.
   Each slice has a status: `planned`, `specced`, `built`, `verified`.

**If there is no scope yet but code already exists:** read the codebase, list what already works as
slices marked `built`, then ask me what the next slice should be.

**If I said "next":** propose the next slice with a one-line reason, and wait for my OK.

## Rules
- One question at a time. Never a wall of questions.
- The scope stays coarse: what and why, not how. Design belongs to /architect.
- End by telling me the next step, usually: `/clear`, then `/architect <slice>`.
