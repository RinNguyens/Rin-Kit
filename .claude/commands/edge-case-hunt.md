---
description: From spec constraints, generate inputs likely to break the implementation
---

1. Read the spec from `specs/`.
2. Analyze every Input field for boundary conditions:
   - **Strings**: empty string, whitespace-only, max length + 1, special characters, unicode, null
   - **Numbers**: 0, -1, MAX_SAFE_INTEGER + 1, NaN, Infinity, float when int expected
   - **Arrays**: empty, single item, max size + 1, duplicates, mixed types
   - **Dates**: past, future, epoch, leap day, timezone edge cases
   - **Enums**: valid value, invalid value, undefined, null

3. Cross-reference with spec Constraints to find tighter bounds.
4. Generate a list of edge case test inputs and their expected behavior per the spec.
5. Ask if you should write these as test cases using `/write-tests`.
