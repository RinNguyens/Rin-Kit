---
description: Generate boilerplate from a spec section
disable-model-invocation: true
argument-hint: "[spec section: api|schema|ui|types]"
---

1. Read the spec from `specs/`.
2. Ask which section to scaffold (e.g., "API routes", "DB schema", "UI form", "types").
3. Generate idiomatic boilerplate that exactly matches the spec's field names, types, and constraints.
4. Do not add logic not in the spec — only structure.
5. Show the generated files and ask for confirmation before writing.
