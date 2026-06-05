import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '..');

/**
 * The e2e fixture loads the unpacked Chromium MV3 build from `.output/`, which
 * is gitignored and absent on a clean checkout. Build it here if missing so
 * `bun run test:e2e` works standalone instead of failing with a cryptic
 * "failed to load extension" error.
 */
export default function globalSetup () {
  const manifest = path.join(root, '.output', 'chrome-mv3', 'manifest.json');
  if (!existsSync(manifest)) {
    // eslint-disable-next-line no-console
    console.log('[e2e] chrome-mv3 build missing — running `wxt build`…');
    execSync('wxt build', { cwd: root, stdio: 'inherit' });
  }
}
