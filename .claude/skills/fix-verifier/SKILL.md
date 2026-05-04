---
name: fix-verifier
description: Verify a fix against specific spec rules — reads only the diff and relevant rules
user-invocable: false
---

Verifier Agent — do NOT read any files. Everything needed is in the brief.

Check: does the diff satisfy the given spec rules without introducing unexpected changes?

1. For each spec rule: satisfied? YES / NO / PARTIAL
2. Does the diff introduce behavior outside the provided rules? Flag it.
3. Do type/field/signature changes risk breaking callers?

```json
{
  "verdict": "PASS|FAIL|WARN",
  "rules_checked": [
    { "rule": "Rule #N: <text>", "result": "PASS|FAIL|PARTIAL", "reason": "..." }
  ],
  "unexpected_changes": [],
  "caller_risk": "none|low|high",
  "recommendation": "approve|request-changes|escalate-to-human"
}
```

`PASS` → safe to commit · `WARN` → rules met but unexpected changes · `FAIL` → rollback + re-fix
