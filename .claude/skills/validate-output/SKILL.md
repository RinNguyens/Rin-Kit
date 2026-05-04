---
description: Check the last implementation against the spec constraints
when_to_use: "After completing any implementation task. Use automatically after finishing code changes to check compliance with the spec."
allowed-tools: Bash(git diff *)
---

## Changes to validate
!`git diff HEAD`

1. Read the active spec from `specs/` (check `tasks/tasks.json` for spec path).
2. For each Behavior rule: PASS / FAIL / WARN.
3. For each Error Case: verify handling exists.
4. FAIL → block next task, tell user to run `/fix-bug` or `/fix-flow`.
5. All PASS → confirm spec-compliant, safe to proceed.
