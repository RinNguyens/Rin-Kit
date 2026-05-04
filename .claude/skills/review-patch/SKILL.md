---
description: Review a diff or patch against the spec before merging
when_to_use: "Before merging a branch or when the user asks for a spec review of a diff or patch."
allowed-tools: Bash(git diff *)
---

## Diff to review
!`git diff main...HEAD`

Read the relevant spec from `specs/`. For each changed file:
- Aligns with Behavior rules? · Introduces behavior not in spec? · Error cases handled? · Types/fields consistent?

Output: `APPROVED` (spec-compliant) | `CHANGES` (minor issues, list them) | `BLOCKED` (spec violation, what to fix)
