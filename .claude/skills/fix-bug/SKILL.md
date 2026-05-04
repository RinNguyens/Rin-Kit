---
description: Debug-first, spec-validated bug fix
disable-model-invocation: true
---

1. Ask the user to describe the bug: what happened vs. what was expected.
2. Read the spec for the affected feature.
3. Determine: is this a **code bug** (behavior deviates from spec) or a **spec bug** (spec was wrong)?
4. If code bug:
   - Find the root cause in the code
   - Fix only the minimal change needed
   - Run `/validate-output` after fixing
5. If spec bug:
   - Flag it to the user before touching code
   - Run `/spec-update` first, then fix code to match

Never fix symptoms. Always trace to root cause.
