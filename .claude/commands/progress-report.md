---
description: Generate a human-readable status report from tasks.json
---

1. Read `tasks/tasks.json`.
2. Read the linked spec to get the feature name.
3. Count tasks by status and compute percentages.
4. Output a report:

```
# Progress Report — <feature name>
Date: <today>

## Summary
█████████░░░░░░░░░░░ 45% complete (9/20 tasks)

## By Status
✓ Done        9 tasks
⟳ In Progress 1 task  — Task #10: Add API route
✗ Blocked     2 tasks — Tasks #12, #14 (see below)
○ Pending     8 tasks

## Blocked Tasks
- Task #12: "Add auth middleware" — blocked by: Task #8 not done
- Task #14: "Write E2E tests" — blocked by: Task #12

## Next Up (unblocked)
1. Task #11: "Add request validation"
2. Task #13: "Add error responses"

## Recent Completions
- Task #9: "Add DB migration" (completed today)
- Task #8: "Add user model" (completed yesterday)
```

5. If any tasks have been `in_progress` for more than 1 session (no recent git activity), flag them as potentially stale.
