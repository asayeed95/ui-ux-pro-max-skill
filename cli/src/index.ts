#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initCommand } from './commands/init.js';
import { versionsCommand } from './commands/versions.js';
import { updateCommand } from './commands/update.js';
import { uninstallCommand } from './commands/uninstall.js';
import { createCommand, getAvailableTemplates } from './commands/create.js';
import type { AIType } from './types/index.js';
import { AI_TYPES } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

const program = new Command();

program
  .name('uipro')
  .description('CLI to install UI/UX Pro Max skill for AI coding assistants')
  .version(pkg.version);

program
  .command('init')
  .description('Install UI/UX Pro Max skill to current project')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.join(', ')})`)
  .option('-f, --force', 'Overwrite existing files')
  .option('-o, --offline', 'Skip GitHub download, use bundled assets only')
  .option('-g, --global', 'Install globally to home directory (~/) instead of current project')
  .action(async (options) => {
    if (options.ai && !AI_TYPES.includes(options.ai)) {
      console.error(`Invalid AI type: ${options.ai}`);
      console.error(`Valid types: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }
    await initCommand({
      ai: options.ai as AIType | undefined,
      force: options.force,
      offline: options.offline,
      global: options.global,
    });
  });

program
  .command('versions')
  .description('List available versions')
  .action(versionsCommand);

program
  .command('update')
  .description('Update UI/UX Pro Max to latest version')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.join(', ')})`)
  .action(async (options) => {
    if (options.ai && !AI_TYPES.includes(options.ai)) {
      console.error(`Invalid AI type: ${options.ai}`);
      console.error(`Valid types: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }
    await updateCommand({
      ai: options.ai as AIType | undefined,
    });
  });

program
  .command('uninstall')
  .description('Remove UI/UX Pro Max skill from current project or globally')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.join(', ')})`)
  .option('-g, --global', 'Uninstall from home directory (~/) instead of current project')
  .action(async (options) => {
    if (options.ai && !AI_TYPES.includes(options.ai)) {
      console.error(`Invalid AI type: ${options.ai}`);
      console.error(`Valid types: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }
    await uninstallCommand({
      ai: options.ai as AIType | undefined,
      global: options.global,
    });
  });

// ============ Project scaffolding ============
// `uipro create <name>` scaffolds a Next.js project pre-wired with the
// motion-3d stack (Framer Motion + R3F + Remotion + Lenis + Lucide) and
// the ui-ux-pro-max design system locked from the brief.
//
// One paste. Whole site. Native command.
program
  .command('create <name>')
  .description('Scaffold a production-ready project from a uipro template')
  .option(
    '-t, --template <name>',
    'Template to use (default: killer-landing)',
    'killer-landing'
  )
  .option('--pm <manager>', 'Package manager: pnpm | npm | bun | yarn (auto-detected)')
  .option('--skip-install', 'Skip dependency installation')
  .option('--skip-design-system', 'Skip --design-system --persist step')
  .action(async (name: string, options: { template?: string; pm?: string; skipInstall?: boolean; skipDesignSystem?: boolean }) => {
    const code = await createCommand(name, {
      template: options.template,
      pm: options.pm as 'pnpm' | 'npm' | 'bun' | 'yarn' | undefined,
      skipInstall: options.skipInstall,
      skipDesignSystem: options.skipDesignSystem,
    });
    if (code !== 0) process.exit(code);
  });

program
  .command('templates')
  .description('List available templates for `uipro create`')
  .action(() => {
    const templates = getAvailableTemplates();
    if (!templates.length) {
      console.log('No templates available.');
      return;
    }
    console.log('\nAvailable templates:\n');
    for (const { name, manifest } of templates) {
      console.log(`  • ${name}`);
      console.log(`    ${manifest.title}`);
      console.log(`    ${manifest.description}`);
      console.log('');
    }
  });

program.parse();
