import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const lockFile = join(projectRoot, 'package-lock.json');
const packageFile = join(projectRoot, 'package.json');
const nodeModules = join(projectRoot, 'node_modules');
const nextBinary = join(
  nodeModules,
  '.bin',
  process.platform === 'win32' ? 'next.cmd' : 'next',
);
const installMarker = join(nodeModules, '.portfolio-dependencies');

function dependencyFingerprint() {
  const source = existsSync(lockFile) ? lockFile : packageFile;
  return createHash('sha256').update(readFileSync(source)).digest('hex');
}

const expectedFingerprint = dependencyFingerprint();
const installedFingerprint = existsSync(installMarker)
  ? readFileSync(installMarker, 'utf8').trim()
  : '';

if (existsSync(nextBinary) && installedFingerprint === expectedFingerprint) {
  process.exit(0);
}

console.log('Local dependencies are missing or outdated. Installing them now...');

// npm exposes its CLI path to lifecycle scripts. Running it through the current
// Node executable keeps this bootstrap command portable across Windows/macOS/Linux.
const npmCli = process.env.npm_execpath;
const command = npmCli || (process.platform === 'win32' ? 'npm.cmd' : 'npm');
const args = npmCli
  ? [npmCli, 'install', '--no-audit', '--no-fund']
  : ['install', '--no-audit', '--no-fund'];
const result = spawnSync(npmCli ? process.execPath : command, args, {
  cwd: projectRoot,
  stdio: 'inherit',
});

if (result.error) {
  console.error(`Unable to start npm: ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!existsSync(nextBinary)) {
  console.error('Installation completed, but the Next.js executable is still missing.');
  process.exit(1);
}

mkdirSync(nodeModules, { recursive: true });
writeFileSync(installMarker, `${dependencyFingerprint()}\n`);
