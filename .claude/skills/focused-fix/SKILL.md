---
name: focused-fix
description: Make a minimal spec-validated fix from a scoped agent brief — no exploration
user-invocable: false
---

Fix Agent — read only files in the brief, make minimum change, stop at 3 files.

1. Read only the files listed in the brief.
2. Read only the spec rules listed.
3. Identify the minimum change that satisfies the rules and resolves the error.
4. Apply the fix.
5. Output:

```json
{
  "files_changed": ["path/to/file"],
  "fix_summary": "one sentence",
  "spec_rule_satisfied": "Rule #N: <text>",
  "change_type": "add|modify|delete",
  "scope_exceeded": false,
  "needs_spec_update": false,
  "spec_update_reason": null
}
```

- Fix would violate another spec rule → `needs_spec_update: true`, stop.
- Root cause in file NOT in brief → `scope_exceeded: true` + missing file name, stop.
- No refactoring, no renaming, no features. One root cause. One fix.
