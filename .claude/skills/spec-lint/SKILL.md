---
description: Check spec quality — flag missing error cases, ambiguous rules, undefined types
when_to_use: "After writing or updating any spec file. Use automatically before running spec-to-plan to catch quality issues."
---

1. Read the spec from `specs/`. If multiple, ask which one.
2. Check:
   - Structure: Overview exists · Inputs have Type+Required · Outputs have Type · Behavior has ≥3 numbered rules
   - Quality: no "should/might/etc." · every Input appears in a Behavior rule · every Output produced by a rule · every Error Case has defined behavior
   - Completeness: auth requirements stated or N/A · rate limits stated or N/A · ≥1 Error Case
3. Report each issue: `FAIL` (blocks planning) | `WARN` (should fix) | `INFO` (suggestion).
4. All pass → confirm ready for `/spec-to-plan`.
