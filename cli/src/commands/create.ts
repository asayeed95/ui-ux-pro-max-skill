import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import ora from 'ora';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface TemplateManifest {
  name: string;
  title: string;
  description: string;
  version: string;
  stack: { framework: string; language: string; styling: string; router: string };
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  designSystemBrief: string;
}

interface CreateOptions {
  template?: string;
  pm?: 'pnpm' | 'npm' | 'bun' | 'yarn';
  skipDesignSystem?: boolean;
  skipInstall?: boolean;
}

const DEFAULT_TEMPLATE = 'killer-landing';

function templatesRoot(): string {
  // dist/index.js → ../assets/templates/projects
  return join(__dirname, '..', 'assets', 'templates', 'projects');
}

function scriptsRoot(): string {
  return join(__dirname, '..', 'assets', 'scripts');
}

function listTemplates(): string[] {
  const root = templatesRoot();
  if (!existsSync(root)) return [];
  return readdirSync(root).filter((d) => {
    const stat = statSync(join(root, d));
    return stat.isDirectory() && existsSync(join(root, d, 'template.json'));
  });
}

function readManifest(template: string): TemplateManifest {
  const manifestPath = join(templatesRoot(), template, 'template.json');
  return JSON.parse(readFileSync(manifestPath, 'utf-8'));
}

/** Copy template files into target dir, skipping template.json itself. */
function copyTemplate(template: string, targetDir: string): number {
  const src = join(templatesRoot(), template);
  let copied = 0;
  function walk(rel: string) {
    const fullSrc = join(src, rel);
    const stat = statSync(fullSrc);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(fullSrc)) {
        walk(join(rel, entry));
      }
      return;
    }
    if (rel === 'template.json') return;
    const fullDest = join(targetDir, rel);
    mkdirSync(dirname(fullDest), { recursive: true });
    copyFileSync(fullSrc, fullDest);
    copied++;
  }
  walk('');
  return copied;
}

async function run(cmd: string, args: string[], cwd: string): Promise<number> {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { cwd, stdio: 'inherit' });
    proc.on('error', () => resolve(1));
    proc.on('exit', (code) => resolve(code ?? 0));
  });
}

function detectPackageManager(): 'pnpm' | 'npm' | 'bun' | 'yarn' {
  for (const pm of ['pnpm', 'bun', 'yarn'] as const) {
    try {
      const proc = require('node:child_process').spawnSync(pm, ['--version'], { stdio: 'ignore' });
      if (proc.status === 0) return pm;
    } catch {
      /* try next */
    }
  }
  return 'npm';
}

/**
 * uipro create <name> [--template killer-landing] [--pm pnpm]
 *
 * Orchestrates: create-next-app → copy template files → install motion-3d
 * deps → lock design system via search.py.
 *
 * The motion-3d stack (framer + R3F + Remotion + lucide + lenis) is added on
 * top of a fresh Next.js scaffold so consumers get the same versions and
 * config the maintained templates were verified against.
 */
export async function createCommand(name: string, opts: CreateOptions = {}): Promise<number> {
  const template = opts.template ?? DEFAULT_TEMPLATE;
  const pm = opts.pm ?? detectPackageManager();

  const available = listTemplates();
  if (!available.includes(template)) {
    console.error(chalk.red(`Unknown template: ${template}`));
    console.error(`Available: ${available.join(', ') || '(none — assets missing)'}`);
    return 1;
  }

  const manifest = readManifest(template);
  const targetDir = join(process.cwd(), name);

  if (existsSync(targetDir)) {
    console.error(chalk.red(`Directory ${targetDir} already exists.`));
    return 1;
  }

  console.log();
  console.log(chalk.bold.cyan(`uipro create ${name}`));
  console.log(chalk.dim(`Template: ${manifest.title}`));
  console.log(chalk.dim(`Stack: ${manifest.stack.framework} + ${manifest.stack.language} + ${manifest.stack.styling}`));
  console.log();

  // 1. Scaffold Next.js
  const scaffoldSpinner = ora(`Scaffolding ${manifest.stack.framework}…`).start();
  scaffoldSpinner.stop();
  console.log(chalk.bold(`\n▸ Scaffolding ${manifest.stack.framework}`));
  const createNextArgs = [
    'create',
    'next-app@latest',
    name,
    '--typescript',
    '--tailwind',
    '--app',
    '--src-dir',
    '--eslint',
    `--use-${pm}`,
    '--turbopack',
    '--import-alias',
    '@/*',
    '--yes',
  ];
  const scaffoldCode = await run(pm === 'npm' ? 'npx' : pm, createNextArgs, process.cwd());
  if (scaffoldCode !== 0) {
    console.error(chalk.red('Scaffold failed.'));
    return scaffoldCode;
  }

  // 2. Copy template files (overwrites scaffold defaults)
  console.log(chalk.bold('\n▸ Applying template files'));
  const copied = copyTemplate(template, targetDir);
  console.log(chalk.dim(`  ${copied} files copied`));

  if (!opts.skipInstall) {
    // 3. Install motion-3d stack
    console.log(chalk.bold('\n▸ Installing motion-3d stack'));
    const deps = Object.keys(manifest.dependencies);
    const devDeps = Object.keys(manifest.devDependencies);

    const addCmd = pm === 'npm' ? 'install' : 'add';
    const installCode = await run(pm, [addCmd, ...deps], targetDir);
    if (installCode !== 0) {
      console.error(chalk.yellow('⚠ Dep install failed — you can retry manually.'));
    }
    if (devDeps.length) {
      const devFlag = pm === 'npm' ? '-D' : pm === 'yarn' ? '--dev' : '-D';
      await run(pm, [addCmd, devFlag, ...devDeps], targetDir);
    }
  }

  // 4. Lock design system via search.py
  if (!opts.skipDesignSystem) {
    console.log(chalk.bold('\n▸ Locking design system'));
    const searchPy = join(scriptsRoot(), 'search.py');
    if (existsSync(searchPy)) {
      const python = process.platform === 'win32' ? 'python' : 'python3';
      await run(
        python,
        [
          searchPy,
          manifest.designSystemBrief,
          '--design-system',
          '--persist',
          '-p',
          name,
        ],
        targetDir
      );
    } else {
      console.log(chalk.yellow('  ⚠ search.py not found — run `uipro init` to install the skill, then re-run --design-system manually.'));
    }
  }

  // 5. Success message
  console.log();
  console.log(chalk.bold.green('✓ Done!'));
  console.log();
  console.log(chalk.bold('Next steps:'));
  console.log(`  cd ${name}`);
  console.log(`  ${pm} dev                              ${chalk.dim('# start the dev server')}`);
  console.log(`  uipro lint src/                      ${chalk.dim('# scan for anti-patterns')}`);
  console.log(`  uipro generate hero --prompt "..."   ${chalk.dim('# generate a Higgsfield hero asset')}`);
  console.log();
  console.log(chalk.dim('Design system locked in:  design-system/' + name.toLowerCase().replace(/\s+/g, '-') + '/MASTER.md'));
  console.log();
  return 0;
}

export function getAvailableTemplates(): { name: string; manifest: TemplateManifest }[] {
  return listTemplates().map((name) => ({ name, manifest: readManifest(name) }));
}
