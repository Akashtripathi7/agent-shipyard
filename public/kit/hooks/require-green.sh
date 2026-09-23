#!/usr/bin/env bash
# Stop hook: blocks the agent from finishing while checks fail.
# Install at .claude/hooks/require-green.sh and register it under "Stop" in .claude/settings.json.
input=$(cat)
if [ "$(echo "$input" | jq -r '.stop_hook_active')" = "true" ]; then
  exit 0   # already blocked once: let it stop and explain, instead of looping forever
fi
cd "$CLAUDE_PROJECT_DIR" || exit 0
if ! scripts/check.sh > /tmp/claude-check.log 2>&1; then
  echo "Checks are failing. Fix them before you finish:" >&2
  tail -20 /tmp/claude-check.log >&2
  exit 2   # exit code 2 = block the stop, and show stderr to the agent
fi
