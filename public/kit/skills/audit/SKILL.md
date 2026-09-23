---
name: audit
description: "Learns a codebase I didn't write before anyone changes it: maps what's there, finds the real commands and conventions, flags risks, and drafts a short AGENTS.md from evidence. Use first on any existing or inherited project."
argument-hint: "[area to focus on]"
---

## First look

!`ls -la`

!`git log --oneline -15 2>/dev/null || echo "no git history"`

!`cat AGENTS.md CLAUDE.md 2>/dev/null || echo "no instruction files yet"`

## What to do (focus: $ARGUMENTS)

Read, don't change. Use subagents for broad searches so my context stays small.

1. **Map it.** The stack, the main components and how they talk to each other, where data
   lives, and the entry points (the app's start, the API's routes, background jobs).
2. **Find the real commands.** How to install, run, test, lint and build, proven by running
   them where it's safe. Note any that fail.
3. **Learn the conventions from the code, not from assumptions:** folder structure, naming,
   error handling, how tests are written, how data access is done. Quote one example file for each.
4. **Flag risks:** no tests around important code, secrets in the repo, abandoned dependencies,
   parts that nobody seems to have touched in years, and anything surprising.
5. **Write `docs/audit/AUDIT.md`** with sections: Map, Commands, Conventions (with example files),
   Risks, and Questions for a human.
6. **Draft AGENTS.md** containing only what an agent couldn't infer: the proven commands, the
   conventions that aren't obvious, and warnings about risky areas. Keep it under 40 lines.
   Show it to me before writing it.

## Rules
- Read-only, except for docs/audit/ and the AGENTS.md draft I approve.
- Every claim about the codebase should point to a file. Say "I couldn't tell" rather than guess.
- End with the next step: `/scope` to enrol what exists, then pick a first small change.
