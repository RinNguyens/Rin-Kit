---
name: spec-parser
description: Read a spec file and return a structured object — used by all commands that need spec data
type: skill
---

# Spec Parser Skill

When any command needs to read a spec, use this skill to parse it consistently.

## Steps

1. Read the spec file.
2. Extract into structured sections:

```json
{
  "name": "Feature Name",
  "version": "1.0",
  "status": "draft | approved | imported | deprecated",
  "overview": "...",
  "inputs": [
    { "field": "name", "type": "string", "required": true, "description": "..." }
  ],
  "outputs": [
    { "field": "id", "type": "string", "description": "..." }
  ],
  "behavior": [
    { "rule_number": 1, "text": "..." }
  ],
  "constraints": ["..."],
  "error_cases": [
    { "condition": "...", "expected_behavior": "..." }
  ],
  "open_questions": ["..."]
}
```

3. Flag any section that is empty or missing as `"status": "incomplete"`.

## Usage by other commands

Other commands should call this skill and work from the parsed object — never re-read the spec file themselves. This ensures consistent parsing and reduces duplicate reads.
