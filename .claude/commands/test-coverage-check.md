---
description: Map existing tests back to spec rules — show which rules have no test coverage
---

1. Read the spec from `specs/`.
2. Read all test files related to the feature (search for the feature name in test directories).
3. For each **Behavior rule** in the spec, find which test(s) cover it.
4. For each **Error Case**, find which test(s) cover it.
5. Report a coverage matrix:

   ```
   Behavior Rule 1: "..." → ✓ covered by test_foo.ts:42
   Behavior Rule 2: "..." → ✗ NO TEST
   Error Case "invalid input" → ✓ covered by test_foo.ts:67
   Error Case "timeout" → ✗ NO TEST
   ```

6. For each uncovered rule, ask if you should generate a test. If yes, run `/write-tests` scoped to that rule.
7. Report overall spec coverage as a percentage.
