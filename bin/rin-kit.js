#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const args    = process.argv.slice(2);
const command = args[0];
const target  = args[1] ? path.resolve(args[1]) : process.cwd();

const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED    = '\x1b[31m';
const RESET  = '\x1b[0m';

const ok   = (msg) => console.log(`${GREEN}✓${RESET} ${msg}`);
const warn = (msg) => console.log(`${YELLOW}⚠${RESET}  ${msg}`);
const err  = (msg) => { console.error(`${RED}✗${RESET} ${msg}`); process.exit(1); };
const info = (msg) => console.log(`  ${msg}`);

function showHelp() {
  console.log(`
Rin AI Agent Kit CLI

Usage:
  npx rin-kit init [directory]   Install Rin Kit into a project
  npx rin-kit upgrade            Upgrade skills to latest version
  npx rin-kit status             Show kit status in current project

Examples:
  npx rin-kit init               Install into current directory
  npx rin-kit init ./my-project  Install into ./my-project
  npx rin-kit upgrade            Pull latest skills
`);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

// Copy all <name>/SKILL.md directories from src to dest
function copySkills(srcSkillsDir, destSkillsDir) {
  ensureDir(destSkillsDir);
  let count = 0;
  for (const name of fs.readdirSync(srcSkillsDir)) {
    const srcFile  = path.join(srcSkillsDir, name, 'SKILL.md');
    const destDir  = path.join(destSkillsDir, name);
    const destFile = path.join(destDir, 'SKILL.md');
    if (!fs.existsSync(srcFile)) continue;
    ensureDir(destDir);
    fs.copyFileSync(srcFile, destFile);
    count++;
  }
  return count;
}

function countSkills(skillsDir) {
  if (!fs.existsSync(skillsDir)) return 0;
  return fs.readdirSync(skillsDir).filter(name => {
    return fs.existsSync(path.join(skillsDir, name, 'SKILL.md'));
  }).length;
}

function addGitignoreEntries(targetDir, entries) {
  const p = path.join(targetDir, '.gitignore');
  let content = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
  let added = 0;
  for (const entry of entries) {
    if (!content.includes(entry)) { content += `\n${entry}`; added++; }
  }
  fs.writeFileSync(p, content.trim() + '\n');
  return added;
}

function cmdInit() {
  console.log('\nRin AI Agent Kit — installer');
  console.log('────────────────────────────────');
  if (!fs.existsSync(target)) err(`Directory '${target}' does not exist.`);
  info(`Installing into: ${target}`);
  console.log('');

  const pkgRoot    = path.join(__dirname, '..');
  const srcSkills  = path.join(pkgRoot, '.claude', 'skills');
  const srcClaude  = path.join(pkgRoot, '.claude', 'CLAUDE.md');
  const destSkills = path.join(target, '.claude', 'skills');

  // Create project structure
  ensureDir(destSkills);
  ensureDir(path.join(target, 'specs', 'archive'));
  ensureDir(path.join(target, 'plans'));
  ensureDir(path.join(target, 'tasks'));
  ensureDir(path.join(target, 'docs', 'post-mortems'));
  ok('Directories created');

  // Copy skills
  const count = copySkills(srcSkills, destSkills);
  ok(`Skills installed (${count} skills)`);

  // CLAUDE.md
  const claudeDest = path.join(target, '.claude', 'CLAUDE.md');
  if (fs.existsSync(claudeDest)) {
    warn('CLAUDE.md already exists — skipping');
  } else {
    fs.copyFileSync(srcClaude, claudeDest);
    ok('CLAUDE.md created');
  }

  // tasks.json
  const tasksPath = path.join(target, 'tasks', 'tasks.json');
  if (fs.existsSync(tasksPath)) {
    warn('tasks/tasks.json already exists — skipping');
  } else {
    fs.writeFileSync(tasksPath, JSON.stringify({ spec: null, tasks: [] }, null, 2) + '\n');
    ok('tasks/tasks.json created');
  }

  // .gitignore
  const added = addGitignoreEntries(target, ['.rin-context.md', '.rin-checkpoint.md', 'handoff.md']);
  if (added > 0) ok(`.gitignore updated (${added} entries added)`);

  console.log('');
  console.log('────────────────────────────────');
  console.log(`${GREEN}Rin Kit installed.${RESET}`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Open this project in Claude Code');
  console.log('  2. /write-spec    — define your first feature');
  console.log('  3. /spec-to-plan  — generate your task list');
  console.log('  4. /task-next     — start implementing');
  console.log('');
}

function cmdStatus() {
  const claudeDir = path.join(target, '.claude');
  if (!fs.existsSync(claudeDir)) {
    err('Rin Kit not installed here. Run: npx rin-kit init');
  }

  const skillCount = countSkills(path.join(claudeDir, 'skills'));
  const tasksPath  = path.join(target, 'tasks', 'tasks.json');
  let taskSummary  = 'no tasks.json';
  if (fs.existsSync(tasksPath)) {
    const data = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
    const done    = data.tasks.filter(t => t.status === 'done').length;
    const pending = data.tasks.filter(t => t.status === 'pending').length;
    taskSummary = `${done} done, ${pending} pending`;
  }
  const specCount = fs.existsSync(path.join(target, 'specs'))
    ? fs.readdirSync(path.join(target, 'specs')).filter(f => f.endsWith('.md')).length : 0;

  console.log('\nRin Kit Status');
  console.log('────────────────────────────────');
  ok(`Skills: ${skillCount}`);
  ok(`Tasks:  ${taskSummary}`);
  ok(`Specs:  ${specCount}`);
  console.log('');
}

function cmdUpgrade() {
  info('Upgrading skills...');
  console.log('');
  cmdInit();
}

switch (command) {
  case 'init':    cmdInit();    break;
  case 'status':  cmdStatus();  break;
  case 'upgrade': cmdUpgrade(); break;
  default:        showHelp();   break;
}
