---
description: Compare current codebase against the spec and surface any drift
---

1. Read all specs in `specs/`.
2. For each spec, identify the files it governs (based on feature name and paths mentioned).
3. Read those files.
4. Report any behavior in the code that contradicts or is missing from the spec:
   - **Drift:** code does something the spec doesn't mention
   - **Gap:** spec requires something the code doesn't implement
   - **Stale:** spec references types/fields that no longer exist

5. Suggest whether to update the spec to match the code, or fix the code to match the spec.
