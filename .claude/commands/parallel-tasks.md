---
description: Find independent tasks and run them as parallel sub-agents
---

1. Read `tasks/tasks.json`.
2. Find all `pending` tasks whose `depends_on` are all `done` — these are unblocked.
3. Among the unblocked tasks, identify which are **independent** (don't touch the same files).
   - Read each task's implied file scope from the spec.
   - Flag tasks that likely share files as NOT safe to parallelize.

4. Show the user the parallel-safe task groups:
   ```
   Parallel Group A: Task #2, Task #4 (no shared files)
   Sequential only: Task #3 (modifies same file as Task #2)
   ```

5. Ask for confirmation before spawning agents.
6. For each parallel group, use `/context-pack` to generate a scoped context, then spawn a sub-agent per task.
7. After all agents complete, run `/validate-output` on each result before marking tasks done.
