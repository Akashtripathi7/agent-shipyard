---
name: verify
description: "Proves a built spec works by running the real application against every acceptance criterion and collecting evidence. Never edits code. Use after /develop, before review."
argument-hint: "<path to spec>"
---

## Spec

!`cat "$ARGUMENTS" 2>/dev/null || echo "(spec not shown here)"`

If the spec is not shown above, read the file at: $ARGUMENTS

## What to do
1. Start the real application the way AGENTS.md says (server, app, or CLI). Unit tests passing
   is not enough: this step proves real behaviour.
2. For each acceptance criterion, in order:
   - Do exactly what the criterion describes, against the running app (curl, the CLI, a browser
     or device tool, a screenshot).
   - Record the evidence: the command and its actual output, or the screenshot path.
   - Mark it PASS or FAIL. Include edge cases the criterion implies (empty input, wrong user).
3. Write the results to `docs/reviews/NNNN-verify.md` as a table: criterion, evidence, result.
4. If everything passes, set the spec status to `Verified` and the slice to `verified`.
5. If anything fails, describe exactly how to reproduce it. Do not fix it here.

## Rules
- Read-only for application code. Your job is to prove, not to repair.
- Never mark PASS without evidence you actually observed in this session.
- End with the next step: `/review` if everything passed, otherwise `/develop` or `/debug`.
