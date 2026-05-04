---
description: Undo the last task's changes and requeue it
---

1. Read `tasks/tasks.json` — find the most recently completed task.
2. Show the user what will be reverted and ask for confirmation.
3. Run `git diff HEAD~1 HEAD` to show what changes will be undone.
4. After confirmation: `git revert HEAD --no-edit`
5. Set the task status back to `"pending"` in `tasks.json`.
6. Tell the user why the rollback happened and suggest running `/plan-fix` if the task itself was flawed.
