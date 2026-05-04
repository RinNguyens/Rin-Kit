---
description: After a bug, trace it back to the spec gap that allowed it and patch both
disable-model-invocation: true
---

1. Ask user: what went wrong? (behavior, file, function)
2. Read the relevant spec.
3. Trace: code level (file/function) → spec level (missing/ambiguous rule) → process level (which gate should have caught this)
4. Write `docs/post-mortems/<date>-<slug>.md`:
   ```
   # Post-Mortem: <title>  Date: <date>  Severity: low|medium|high
   ## What happened / Root cause / Spec gap / Fix applied / Spec patch / Prevention
   ```
5. Update the spec with the missing/corrected rule.
6. Run `/write-tests` to add a regression test.
