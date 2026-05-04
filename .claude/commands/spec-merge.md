---
description: Merge two overlapping specs and resolve conflicts
---

1. List all specs in `specs/`. Ask the user which two to merge.
2. Read both specs fully.
3. Identify overlaps and conflicts:
   - Same field names with different types
   - Contradictory behavior rules
   - Duplicate error cases with different handling
   - Shared inputs that one spec defines and the other doesn't

4. Show a conflict report to the user before merging.
5. For each conflict, ask the user which version wins (or propose a resolution).
6. Write the merged spec to `specs/<merged-name>.md` with:
   - Combined Inputs (deduplicated)
   - Combined Outputs (deduplicated)
   - All Behavior rules renumbered in logical order
   - All Error Cases merged
   - A **Merge Log** section at the bottom listing conflicts and resolutions

7. Ask whether to archive the two source specs to `specs/archive/`.
