---
description: Break a large spec into focused sub-specs when a feature grows too complex
---

1. Read the spec from `specs/`. Ask which one if multiple.
2. Identify natural split boundaries:
   - Distinct user-facing features within the spec
   - Independent data entities
   - Separate API surfaces
   - Frontend vs. backend concerns

3. Show the proposed split to the user:
   ```
   specs/<name>.md →
     specs/<name>-<part-a>.md  (covers: ...)
     specs/<name>-<part-b>.md  (covers: ...)
   ```

4. Ask for confirmation before writing.
5. Write each sub-spec, preserving all relevant Inputs/Outputs/Behavior/Error Cases.
6. Add a cross-reference section at the top of each sub-spec linking to its siblings.
7. Archive the original spec to `specs/archive/<name>.md`.
8. Tell the user to run `/spec-to-plan` on each sub-spec separately.
