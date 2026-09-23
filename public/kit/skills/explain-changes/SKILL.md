---
name: explain-changes
description: "Explains uncommitted code changes in plain English, flags risks, and quizzes me so I can confirm I understand them. Use when I ask what changed, or before I commit agent-written code."
argument-hint: "[focus area]"
---

## Current changes

!`git diff HEAD --stat 2>/dev/null || echo "not a git repository"`

!`git diff HEAD 2>/dev/null || true`

## Instructions

1. Summarise what changed in three bullet points a beginner could follow.
2. List risks: missing error handling, hard-coded values, tests that should change.
3. Ask me two questions about the change, one at a time, and wait for each answer.
   Correct me gently if I'm wrong. My rule is: never ship code I can't explain.

If the diff is empty, say there are no uncommitted changes and stop.
Focus area, if I gave one: $ARGUMENTS
