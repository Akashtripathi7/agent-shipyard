---
name: debug
description: "Finds the root cause of a bug before fixing anything: reproduce it, isolate it, prove the cause, then fix it with a regression test. Also tells a code bug apart from a polluted session or a wrong foundation. Use whenever something fails, throws or misbehaves."
argument-hint: "[what's wrong]"
---

## Recent context

!`git log -5 --oneline 2>/dev/null || echo "no git history"`

!`git status --short 2>/dev/null || true`

## The problem: $ARGUMENTS

Work through these steps in order. Don't skip ahead to a fix.

1. **Classify it first.** Is this:
   - an **isolated bug** (one behaviour is wrong, reproducibly),
   - a **polluted session** (the agent keeps contradicting itself or repeating a failed fix), or
   - a **wrong foundation** (the bug keeps coming back in new forms because a design decision is wrong)?
   If it's a polluted session, stop: tell me to write a handoff note and start fresh.
   If it's a wrong foundation, stop: tell me which decision looks wrong and suggest /architect.
2. **Reproduce.** Find the smallest set of steps or inputs that makes it happen every time.
   Write it down. If you can't reproduce it, say so and list what you'd need.
3. **Isolate.** Narrow down where it happens: which layer, which function, which input.
   Use logs, a failing test, or bisecting recent commits (git bisect) where useful.
4. **Hypothesise and prove.** State one hypothesis about the cause. Prove or disprove it with a
   test or an experiment before touching the code. Repeat until one hypothesis is proven.
5. **Write a failing regression test** that reproduces the bug. Run it and show it failing.
6. **Fix the cause, not the symptom.** Make the smallest change that makes the test pass.
7. Run `scripts/check.sh`. It must pass.

## Report

```
DEBUG · <one-line summary>
Class:      isolated bug | polluted session | wrong foundation
Reproduce:  <steps>
Cause:      <the proven root cause, and how it was proven>
Fix:        <what changed>
Guarded by: <the regression test>
```

## Rules
- Never "fix" by weakening a test, catching and ignoring an error, or adding a retry around it,
  unless that is genuinely the right fix and you explain why.
- If two fixes in a row fail, stop and re-classify: it may not be an isolated bug.
