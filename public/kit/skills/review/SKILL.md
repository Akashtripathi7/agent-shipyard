---
name: review
description: "A fresh-eyes review of the current branch against its spec, AGENTS.md and ADRs, looking for bugs, security holes, contract drift and weakened tests. Runs in its own context so it doesn't share the builder's blind spots. Use before merging."
argument-hint: "[path to spec]"
context: fork
---

## The change

!`git diff main...HEAD --stat 2>/dev/null || git diff HEAD --stat`

!`git diff main...HEAD 2>/dev/null || git diff HEAD`

## Review it against
- The spec: $ARGUMENTS (read it). Is every acceptance criterion actually covered?
- AGENTS.md rules, and every ADR in docs/decisions.

## Look for, in this order
1. **Correctness:** logic errors, missing edge cases, wrong status codes, off-by-one dates.
2. **Security:** can user A read or change user B's data? Is all input validated? Any secret in
   code or logs? Any new dependency, and is it the real, maintained package?
3. **Contract drift:** does the API or data shape match the spec exactly?
4. **Weakened tests:** did any existing test's expectation change in the same diff as the code?
5. **Architecture:** layering rules broken, decisions silently changed, scope creep.

## Report
Write `docs/reviews/NNNN-review.md`. For each finding: severity (blocker, should-fix, nit), file and
line, what's wrong, why it matters, and a suggested fix. If you find nothing real, say so plainly.
Never invent problems to seem useful.

## Rules
- Read-only. Fixes go back to /develop.
