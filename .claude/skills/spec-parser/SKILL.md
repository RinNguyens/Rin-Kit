---
name: spec-parser
description: Parse a spec file into a structured object — all spec-reading commands use this
user-invocable: false
---

Read the spec file and extract into:

```json
{
  "name": "Feature Name",
  "version": "1.0",
  "status": "draft|approved|imported|deprecated",
  "overview": "...",
  "inputs": [{ "field": "name", "type": "string", "required": true, "description": "..." }],
  "outputs": [{ "field": "id", "type": "string", "description": "..." }],
  "behavior": [{ "rule_number": 1, "text": "..." }],
  "constraints": ["..."],
  "error_cases": [{ "condition": "...", "expected_behavior": "..." }],
  "open_questions": ["..."]
}
```

Flag empty or missing sections as `"status": "incomplete"`. Return the parsed object — do not re-read the spec elsewhere.
