---
description: Find code that no spec covers — candidates for safe deletion
---

1. Read all specs in `specs/`.
2. Build a list of all features, functions, fields, and endpoints defined in the specs.
3. Search the codebase for exported functions, API routes, and public interfaces.
4. For each piece of code, check if it maps to something in a spec.
5. Report:
   ```
   COVERED   — src/api/users.ts: POST /users → spec: user-create.md rule 1
   UNCOVERED — src/api/legacy-import.ts: POST /import → no spec found
   UNCOVERED — src/utils/formatDate.ts: formatDateLegacy() → no spec found
   ```

6. For uncovered code, determine if it is:
   - **Truly dead** — not called anywhere → safe to delete
   - **Missing spec** — called, but no spec → recommend running `/retrofit-spec`
   - **Infrastructure** — utilities, helpers with no spec needed → mark as exempt

7. Ask before deleting anything.
