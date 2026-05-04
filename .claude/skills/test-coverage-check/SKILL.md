---
description: Map existing tests back to spec rules — show which rules have no test coverage
when_to_use: "After writing tests or when the user asks which spec rules lack test coverage."
---

1. Read the spec from `specs/`.
2. Find test files for the feature.
3. Map each Behavior rule and Error Case to covering test(s).
4. Report:
   ```
   Rule 1: "..." → ✓ test_foo.ts:42
   Rule 2: "..." → ✗ NO TEST
   Error "invalid input" → ✓ test_foo.ts:67
   Coverage: <N>/<total> rules covered (<pct>%)
   ```
5. For each uncovered rule, ask if you should generate a test → if yes, run `/write-tests` scoped to that rule.
