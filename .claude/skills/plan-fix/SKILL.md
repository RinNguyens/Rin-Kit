---
description: Identify gaps or conflicts in the current plan
disable-model-invocation: true
---

1. Read `plans/` — find the active plan.
2. Read its linked spec.
3. Check the plan for:
   - Tasks that are out of dependency order
   - Tasks that cover things not in the spec
   - Spec requirements that have no corresponding task
   - Ambiguous task descriptions that could lead to incorrect implementation

4. Rewrite or patch `plans/<name>-plan.md` and `tasks/tasks.json` to fix the issues.
5. Summarize what changed and why.
