---
description: Before editing a file, show which spec rules and tasks depend on it
when_to_use: "Before editing any file that appears in multiple tasks or specs. Use when the user is about to modify a shared module."
allowed-tools: Bash(git log *)
---

1. Identify file(s) to edit (from user or current task).
2. Read all specs in `specs/` — find references to the file's feature, exported symbols, field names.
3. Read `tasks/tasks.json` — find tasks mentioning the file.
4. Report:
   ```
   Impact: <file>
   Specs: specs/X.md — rules 2,4 | specs/Y.md — rule 1
   Tasks: #3 (done) · #8 (pending)
   Callers: src/api/users.ts · src/jobs/sync.ts
   Risk: LOW|MEDIUM|HIGH
   ```
5. HIGH risk (3+ specs or 5+ callers) → recommend `/spec-diff` after change.
