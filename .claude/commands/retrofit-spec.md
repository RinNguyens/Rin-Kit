---
description: Reverse-engineer a spec from existing code — onboard legacy features into Rin Kit
---

1. Ask the user which feature or file(s) to retrofit. Accept a file path, directory, or feature name.
2. Read the relevant source files.
3. Infer from the code:
   - **Inputs** — function params, API request fields, form fields
   - **Outputs** — return values, API response fields, side effects
   - **Behavior** — what the code does, step by step, in plain rules
   - **Error Cases** — all `catch`, `if (!x)`, status codes, thrown errors
   - **Constraints** — any hardcoded limits, auth checks, env flags

4. Draft the spec using the standard Rin spec template.
5. Mark every inferred rule with `[inferred]` and every unknown with `[unknown — confirm]`.
6. Write to `specs/<feature-name>.md` with `Status: draft`.
7. Tell the user to review the `[inferred]` and `[unknown]` items, then run `/spec-lint` before using it.
