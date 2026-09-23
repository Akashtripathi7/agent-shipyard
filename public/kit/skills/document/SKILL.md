---
name: document
description: "Writes human-facing text from the real diff, not from chat: a pull-request description, a changelog entry, or release notes. Use when a change is verified and reviewed and needs to be communicated."
argument-hint: "[pr | changelog | release]"
---

## The change

!`git log main..HEAD --oneline 2>/dev/null || git log -5 --oneline`

!`git diff main...HEAD --stat 2>/dev/null || git diff HEAD --stat`

## What to write: $ARGUMENTS (default: pr)

**pr:** a pull-request description with: what changed and why (link the spec), how it was verified
(point to docs/reviews), screenshots or command output as evidence, risks, and anything reviewers
should look at closely.

**changelog:** one entry in CHANGELOG.md under "Unreleased", written for users, not developers.

**release:** release notes grouping changes by what users will notice.

## Rules
- Describe only what the diff actually contains. If something in the spec wasn't built, say so.
- Plain language. No filler, no hype.
