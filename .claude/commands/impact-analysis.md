---
description: Before editing a file, show which spec rules and tasks depend on it
---

1. Ask the user which file(s) they are about to edit (or infer from current task).
2. Read all specs in `specs/`.
3. Search all specs for references to the file's feature, exported symbols, or field names.
4. Read `tasks/tasks.json` — find tasks that mention the file or its feature.
5. Run `git log --oneline -- <file>` to show recent change history.
6. Report:

```
Impact Analysis: src/services/userService.ts

Specs that govern this file:
  - specs/user-create.md — rules 2, 4, 7
  - specs/user-auth.md — rules 1, 3

Tasks that touch this file:
  - Task #3 (done): "Add user creation logic"
  - Task #8 (pending): "Add email validation"

Callers (files that import this):
  - src/api/users.ts
  - src/jobs/syncUsers.ts

Risk: MEDIUM — 2 specs, 2 callers
Recommendation: Run /validate-output after changes.
```

7. If risk is HIGH (3+ specs or 5+ callers), recommend running `/spec-diff` after the change.
