---
description: Mark the current task complete and show next steps
disable-model-invocation: true
---

1. Read `tasks/tasks.json`.
2. Ask the user which task ID is complete (or infer from context).
3. Set its `"status"` to `"done"` and add `"completed_at": "<date>"`.
4. Find the next unblocked task (pending + all dependencies done).
5. Show a summary:
   ```
   ✓ Task #N complete: <title>
   → Next: Task #M — <title>
   ```
6. If all tasks are done, congratulate and suggest running `/spec-diff` to confirm full coverage.
