// Faker@10 API audit.
//
// Parses the v1 registry (packages/fakerjsui/src/constants/faker.js) to recover
// the exact set of (api, method) pairs v1 shipped, then checks each against the
// installed @faker-js/faker@10 (locale/en): does the method still exist, and
// does it produce a value? Output is ground truth for the v2 remap.
//
// Usage: node scripts/audit-faker.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { faker } from '@faker-js/faker/locale/en';

const dir = path.dirname(fileURLToPath(import.meta.url));
const v1Path = path.resolve(dir, '../../fakerjsui/src/constants/faker.js');
const src = readFileSync(v1Path, 'utf8');

// --- parse v1 api -> [method names] -------------------------------------
const lines = src.split('\n');
let api = null;
const v1 = {};
for (let i = 0; i < lines.length; i++) {
  const a = lines[i].match(/^\s*api:\s*'([^']+)'/);
  if (a) { api = a[1]; v1[api] ??= []; continue; }
  const n = lines[i].match(/^\s*name:\s*'([^']+)'/);
  if (n && api) {
    // A *method* entry's name is followed by `tags:` or `params:`; a *param*
    // object's name is followed by `label:`/`type:`. Disambiguate on the next
    // non-empty line.
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    const next = (lines[j] ?? '').trim();
    if (next.startsWith('tags:') || next.startsWith('params:')) v1[api].push(n[1]);
  }
}

// --- audit against faker@10 ---------------------------------------------
const ok = [];
const missing = [];
const needsArgs = [];
let total = 0;
for (const [a, methods] of Object.entries(v1)) {
  for (const m of methods) {
    total++;
    const fn = faker?.[a]?.[m];
    if (typeof fn !== 'function') { missing.push(`${a}.${m}`); continue; }
    try {
      fn();
      ok.push(`${a}.${m}`);
    } catch (e) {
      // Exists but throws with no args (e.g. needs a required option).
      needsArgs.push(`${a}.${m} :: ${String(e.message).split('\n')[0]}`);
    }
  }
}

console.log(JSON.stringify({
  fakerVersion: faker.constructor?.name ? 'loaded' : 'unknown',
  totals: { total, ok: ok.length, missing: missing.length, needsArgs: needsArgs.length },
  apis: Object.fromEntries(Object.entries(v1).map(([a, m]) => [a, m.length])),
  missing,
  needsArgs,
}, null, 2));
