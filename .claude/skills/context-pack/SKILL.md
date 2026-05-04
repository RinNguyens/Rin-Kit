---
description: Bundle spec + plan + current task into a context file for sub-agents
disable-model-invocation: true
---

1. Read `tasks/tasks.json` — find in-progress task (or ask user).
2. Read linked spec and active plan.
3. Write `.rin-context.md`:
   ```
   # Rin Context Pack  Generated: <date>  Active Task: #<id> — <title>
   ## Spec (authoritative) / Task Definition / Dependencies / Already Done / Constraints
   Implement only task #<id> · do not modify out-of-scope files · validate before reporting done
   ```
4. Tell user to pass `.rin-context.md` as sub-agent input.
