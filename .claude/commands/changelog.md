---
description: Draft a changelog from completed tasks and spec versions
---

1. Read `tasks/tasks.json` — find all tasks with `"status": "done"`.
2. Read all specs in `specs/` — note their versions.
3. Run `git log --oneline` to verify the task history against commits.
4. Group completed tasks by spec/feature.
5. Draft a changelog entry in Keep-a-Changelog format:

```markdown
## [Unreleased]

### Added
- <task title for new features>

### Changed
- <task title for modifications>

### Fixed
- <task title for bug fixes>

### Spec Changes
- `specs/<name>.md` bumped to v1.1 — <what changed>
```

6. Ask whether to append to an existing `CHANGELOG.md` or create one.
7. Write the file. Do not overwrite existing entries — prepend the new section.
