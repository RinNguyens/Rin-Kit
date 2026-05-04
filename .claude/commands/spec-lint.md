---
description: Check spec quality — flag missing error cases, ambiguous rules, undefined types
---

1. Read the spec from `specs/`. If multiple, ask which one.
2. Audit the spec against these rules:

   **Structure checks**
   - [ ] Has Overview section
   - [ ] All Inputs have Type and Required columns filled
   - [ ] All Outputs have Type defined
   - [ ] Behavior section has at least 3 numbered rules

   **Quality checks**
   - [ ] No rule uses vague language ("should", "might", "etc.")
   - [ ] Every Input field appears in at least one Behavior rule
   - [ ] Every Output field is produced by at least one Behavior rule
   - [ ] Every Error Case has a defined expected behavior (not just "handle it")

   **Completeness checks**
   - [ ] Auth/permission requirements stated (or explicitly N/A)
   - [ ] Rate limits / performance constraints stated (or explicitly N/A)
   - [ ] At least one Error Case defined

3. Report each issue as:
   - `FAIL` — must fix before planning
   - `WARN` — should fix, won't block
   - `INFO` — suggestion

4. If all pass: confirm the spec is ready for `/spec-to-plan`.
