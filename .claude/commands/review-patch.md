---
description: Review a diff or patch against the spec before merging
---

1. Run `git diff main...HEAD` (or ask the user for the diff to review).
2. Read the relevant spec from `specs/`.
3. For each changed file, evaluate:
   - Does the change align with the spec's Behavior rules?
   - Does it introduce behavior not in the spec?
   - Are error cases handled as the spec requires?
   - Are types and field names consistent with the spec?

4. Output a structured review:
   ```
   APPROVED  - spec-compliant, safe to merge
   CHANGES   - minor issues, list them
   BLOCKED   - spec violation, do not merge, explain what to fix
   ```
