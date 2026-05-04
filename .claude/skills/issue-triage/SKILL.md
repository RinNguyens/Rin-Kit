---
name: issue-triage
description: Classify and scope an issue before spawning fix agents — reads at most 2 files
user-invocable: false
---

Classify only — do not fix. Read at most **2 files**; if insufficient → `needs_escalation: true`.

Types: `code-bug` | `spec-bug` | `missing-impl` | `type-error` | `flow-error` | `test-failure` | `unknown`

1. Classify issue from error message.
2. Find minimum files to fix (max 3).
3. Find governing spec file + relevant Behavior rule numbers.

Output (JSON only — no prose):
```json
{
  "type": "code-bug|spec-bug|missing-impl|type-error|flow-error|test-failure|unknown",
  "confidence": "high|medium|low",
  "files_to_read": ["path/to/file"],
  "spec_file": "specs/<name>.md",
  "spec_rules": [3, 7],
  "error_summary": "one sentence",
  "needs_escalation": false,
  "escalation_reason": null
}
```

Stop after JSON.
