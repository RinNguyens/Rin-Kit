---
description: Save full agent state mid-session so a new session can resume without re-reading everything
disable-model-invocation: true
allowed-tools: Bash(git log *)
---

## Recent commits
!`git log --oneline -5`

1. Read `tasks/tasks.json` and active spec.
2. Write `.rin-checkpoint.md`:
   ```
   # Rin Checkpoint  Saved: <datetime>
   Done: <titles> | In Progress: <title + what's done> | Blocked: <tasks+reason> | Remaining: <titles>
   Spec: <path v.version>  Git: <log above>
   Resume: "Load .rin-checkpoint.md and continue from task #<N>."
   ```
3. Confirm checkpoint written; user can safely end session.
