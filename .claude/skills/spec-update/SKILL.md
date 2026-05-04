---
description: Amend the spec and re-evaluate affected tasks
disable-model-invocation: true
---

1. Read the current spec from `specs/`.
2. Ask the user what needs to change and why.
3. Update the spec file. Bump the version (1.0 → 1.1).
4. Read `tasks/tasks.json` — find tasks whose scope is affected by the change.
5. Mark affected tasks as `"needs-review"` and explain what needs to change.
6. Suggest running `/plan-fix` to reconcile the plan with the updated spec.
