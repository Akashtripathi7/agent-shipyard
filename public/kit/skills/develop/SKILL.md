---
name: develop
description: "Builds one approved spec, test-first, and stops to ask instead of inventing any decision the spec doesn't make. Use to implement a spec that /architect wrote and I approved."
argument-hint: "<path to spec>"
---

## Spec

!`cat "$ARGUMENTS" 2>/dev/null || echo "(spec not shown here)"`

If the spec is not shown above, read the file at: $ARGUMENTS

## The gate
1. If the spec is not `Approved`, stop. Tell me what's missing and suggest `/architect`.
2. If building it needs a decision the spec doesn't make (a new dependency, a data change, an
   API shape, a UI behaviour), stop and ask. If I tell you to proceed anyway, record the choice
   under "Assumed (not yet ratified)" in the spec so it's visible.

## Plan
3. Break the work into small tasks (each a few minutes: one test and the code that passes it),
   mapped to acceptance criteria. Show me the list and wait for my OK.

## Build, one task at a time
4. Write the failing test first. Run it and confirm it fails for the right reason.
5. Write the smallest code that makes it pass. Run it again.
6. Follow AGENTS.md: layering rules, product rules, conventions.
7. After all tasks, run `scripts/check.sh`. It must pass.

## Finish
8. Set the spec status to `Built` and the slice in SCOPE.md to `built`.
9. End with a handoff note:

```
HANDOFF · <spec>
Changed:  <files and what>
Verified: <exact commands run and their results>
Assumed:  <anything recorded as assumed, or "nothing">
Next:     /clear, then /verify <spec>
```

## Rules
- Never weaken or delete an existing test to make something pass. Ask me instead.
- Never report something as working without running it.
- Don't commit or push unless I ask.
