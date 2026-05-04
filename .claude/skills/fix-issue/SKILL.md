---
description: Fix an issue using the triage → brief → fix → verify pipeline
disable-model-invocation: true
argument-hint: "[issue description or error message]"
---

## Context
!`git diff --name-only HEAD`

Orchestrator role — do not fix code yourself. Manage the pipeline.

**Stage 1 — Triage**
Spawn sub-agent: skill `issue-triage`. Pass: error message + changed files above.
- `needs_escalation: true` → ask user, stop.
- `confidence: low` → warn user, ask to proceed.

**Stage 2 — Brief** (no sub-agent — you do this inline)
From triage JSON, assemble `agent-brief`:
- Role: "Fix Agent" | Task: `error_summary` | Files: `files_to_read` (max 3)
- Spec rules: paste rule text at `spec_rules` indices only — not the whole spec
- Output: focused-fix JSON contract | Constraints: no extra files, max 3 edits, no refactor

**Stage 3 — Fix**
Spawn sub-agent: skill `focused-fix`. Pass brief only — not this conversation.
- `scope_exceeded: true` → add file to brief → re-spawn (max 1 retry)
- `needs_spec_update: true` → pause, ask user

**Stage 4 — Verify**
Run `git diff HEAD` and pass to sub-agent: skill `fix-verifier`. Also pass: spec rules from Stage 2 + error summary.
- `PASS` → commit, mark task done in `tasks/tasks.json`
- `WARN` → show unexpected changes, ask user approve/revert
- `FAIL` → `git restore .` → update brief → restart Stage 3 (max 2 retries)

Report: `Fixed: <summary> | Files: <list> | Rule: <text> | Verdict: PASS | ~<N>tk used`
