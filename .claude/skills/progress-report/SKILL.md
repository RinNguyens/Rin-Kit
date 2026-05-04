---
description: Generate a human-readable status report from tasks.json
disable-model-invocation: true
allowed-tools: Bash(cat tasks/tasks.json)
---

## Task state
!`cat tasks/tasks.json`

From the above, compute and output:
```
# Progress Report — <feature>  Date: <today>
█████████░░ <N>% complete (<done>/<total> tasks)
✓ Done <N> | ⟳ In Progress <N> — Task #X: <title> | ✗ Blocked <N> | ○ Pending <N>
Blocked: Task #X blocked by #Y  |  Next up: Task #X, #Y  |  Recent: Task #X (done today)
```
Flag tasks `in_progress` with no recent git activity as potentially stale.
