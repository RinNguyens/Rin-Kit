---
description: Save full agent state mid-session so a new session can resume without re-reading everything
---

1. Read `tasks/tasks.json` — capture current task statuses.
2. Run `git log --oneline -5` to capture recent work.
3. Read the active spec and plan.
4. Write `.rin-checkpoint.md`:

```markdown
# Rin Checkpoint
**Saved:** <datetime>

## Progress
- Done: <list of completed task titles>
- In Progress: <current task title and what's been done so far>
- Blocked: <any blocked tasks and why>
- Remaining: <list of pending task titles>

## Active Spec
<file path and version>

## Last Git State
<git log output>

## Resume Instructions
Start a new session and say:
"Load the Rin checkpoint at .rin-checkpoint.md and continue from task #<N>."
```

5. Confirm the checkpoint was written and tell the user they can safely end the session.
