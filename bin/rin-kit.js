#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const command = args[0];
const target = args[1] ? path.resolve(args[1]) : process.cwd();

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
  npx rin-kit upgrade            Upgrade commands to latest version
  npx rin-kit status             Show kit status in current project

Examples:
  npx rin-kit init               Install into current directory
  npx rin-kit init ./my-project  Install into ./my-project
  npx rin-kit upgrade            Pull latest commands from GitHub
`);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const files = fs.readdirSync(src);
  let count = 0;
  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.statSync(srcFile).isFile()) {
      const exists = fs.existsSync(destFile);
      fs.copyFileSync(srcFile, destFile);
      if (!exists) count++;
    }
  }
  return count;
}

function addGitignoreEntries(targetDir, entries) {
  const gitignorePath = path.join(targetDir, '.gitignore');
  let content = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';
  let added = 0;
  for (const entry of entries) {
    if (!content.includes(entry)) {
      content += `\n${entry}`;
      added++;
    }
  }
  fs.writeFileSync(gitignorePath, content.trim() + '\n');
  return added;
}

function cmdInit() {
  console.log('\nRin AI Agent Kit — installer');
  console.log('────────────────────────────────');

  if (!fs.existsSync(target)) err(`Directory '${target}' does not exist.`);
  info(`Installing into: ${target}`);
  console.log('');

  // Source: the package's own .claude directory
  const pkgRoot = path.join(__dirname, '..');
  const srcCommands = path.join(pkgRoot, '.claude', 'commands');
  const srcSkills   = path.join(pkgRoot, '.claude', 'skills');
  const srcClaude   = path.join(pkgRoot, '.claude', 'CLAUDE.md');

  // Create directories
  ensureDir(path.join(target, '.claude', 'commands'));
  ensureDir(path.join(target, '.claude', 'skills'));
  ensureDir(path.join(target, 'specs', 'archive'));
  ensureDir(path.join(target, 'plans'));
  ensureDir(path.join(target, 'tasks'));
  ensureDir(path.join(target, 'docs', 'post-mortems'));
  ok('Directories created');

  // Copy commands and skills
  const cmdCount   = copyDir(srcCommands, path.join(target, '.claude', 'commands'));
  const skillCount = copyDir(srcSkills,   path.join(target, '.claude', 'skills'));
  ok(`Commands installed (${fs.readdirSync(path.join(target, '.claude', 'commands')).length} total)`);
  ok(`Skills installed (${fs.readdirSync(path.join(target, '.claude', 'skills')).length} total)`);

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
  ok(`.gitignore updated (${added} entries added)`);

  console.log('');
  console.log('────────────────────────────────');
  console.log(`${GREEN}Rin Kit installed successfully.${RESET}`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Open this project in Claude Code');
  console.log('  2. Run /write-spec to define your first feature');
  console.log('  3. Run /spec-to-plan to generate your task list');
  console.log('  4. Run /task-next to start implementing');
  console.log('');
}

function cmdStatus() {
  const claudeDir = path.join(target, '.claude');
  if (!fs.existsSync(claudeDir)) {
    err('Rin Kit is not installed in this directory. Run: npx rin-kit init');
  }

  const commandCount = fs.existsSync(path.join(claudeDir, 'commands'))
    ? fs.readdirSync(path.join(claudeDir, 'commands')).length : 0;
  const skillCount = fs.existsSync(path.join(claudeDir, 'skills'))
    ? fs.readdirSync(path.join(claudeDir, 'skills')).length : 0;

  const tasksPath = path.join(target, 'tasks', 'tasks.json');
  let taskSummary = 'no tasks.json';
  if (fs.existsSync(tasksPath)) {
    const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
    const done    = tasks.tasks.filter(t => t.status === 'done').length;
    const pending = tasks.tasks.filter(t => t.status === 'pending').length;
    taskSummary = `${done} done, ${pending} pending`;
  }

  console.log('\nRin Kit Status');
  console.log('────────────────────────────────');
  ok(`Commands: ${commandCount}`);
  ok(`Skills:   ${skillCount}`);
  ok(`Tasks:    ${taskSummary}`);
  ok(`Specs:    ${fs.existsSync(path.join(target, 'specs')) ? fs.readdirSync(path.join(target, 'specs')).filter(f => f.endsWith('.md')).length : 0} specs`);
  console.log('');
}

function cmdUpgrade() {
  info('Upgrade: re-run the installer to pull latest commands.');
  info('This will not overwrite CLAUDE.md or tasks.json.');
  console.log('');
  cmdInit();
}

switch (command) {
  case 'init':    cmdInit();    break;
  case 'status':  cmdStatus();  break;
  case 'upgrade': cmdUpgrade(); break;
  default:        showHelp();   break;
}
