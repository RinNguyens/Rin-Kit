---
description: Fix an issue using the 3-stage sub-agent pipeline — triage, fix, verify. Saves tokens and controls scope.
---

You are the **Orchestrator**. You do not fix code yourself. You manage the pipeline.

Read `skill:sub-agent-controller` before proceeding.

---

## Stage 1 — Triage (cheap)

Spawn a sub-agent with skill `issue-triage`. Give it:
- The error message or issue description (verbatim)
- Output of `git diff --name-only` or the files the user mentioned

Wait for the structured triage JSON.

If `needs_escalation: true` → ask the user for more context. Do not proceed.
If `confidence: low` → tell the user and ask if they want to proceed anyway.

---

## Stage 2 — Build the brief (free)

Do not spawn an agent for this. You do it yourself.

Using the triage output, assemble an agent brief (skill: `agent-brief`):
- Role: "Fix Agent"
- Task: one sentence from `error_summary`
- Files to read: `files_to_read` from triage (max 3)
- Spec rules: extract ONLY the rules at `spec_rules` indices from `spec_file` — paste the text, not the whole spec
- Output contract: the `focused-fix` JSON format
- Constraints: do not read other files, max 3 edits, do not refactor

---

## Stage 3 — Fix (scoped)

Spawn a sub-agent with skill `focused-fix`. Give it **only the brief** — not this conversation.

Wait for the structured fix JSON.

If `scope_exceeded: true` → add the missing file to the brief → re-spawn (max 1 retry).
If `needs_spec_update: true` → pause, tell the user, ask whether to update spec or fix differently.

---

## Stage 4 — Verify (cheap)

Spawn a sub-agent with skill `fix-verifier`. Give it:
- The diff from `git diff HEAD` (not files — the diff text)
- The spec rules from the brief (already extracted — reuse from Stage 2)
- The original error summary

Wait for the verify JSON.

**If `verdict: PASS`** → commit the fix, mark the related task done in `tasks/tasks.json`.
**If `verdict: WARN`** → show the user the unexpected changes. Ask whether to approve or revert.
**If `verdict: FAIL`** → run `git restore .` to revert. Extract the failure reason. Update the brief with the correction. Restart from Stage 3. Max 2 retries total.

---

## Final report

```
Issue Fixed: <error_summary>
Files changed: <list>
Spec rule satisfied: <rule text>
Verdict: PASS
Tokens used: ~<estimate based on stages run>
```
