---
description: Compare current codebase against the spec and surface any drift
when_to_use: "When the user asks if the code matches the spec, or to audit drift between implementation and spec."
---

1. Read all specs in `specs/`.
2. Identify governing files per spec (by feature name and mentioned paths).
3. Read those files.
4. Report:
   - **Drift** — code does something the spec doesn't mention
   - **Gap** — spec requires something code doesn't implement
   - **Stale** — spec references types/fields that no longer exist
5. Recommend: update spec to match code, or fix code to match spec.
