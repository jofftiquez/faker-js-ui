import { describe, it, expect } from 'vitest';
import { bulkResult, toJson, convertArrayToCsv } from '@/lib/use-bulk';
import { fakerMethods } from '@/lib/faker/registry';

const email = fakerMethods.find((m) => m.searchNeedle === 'Internet - Email')!;

describe('bulk export', () => {
  it('bulkResult produces N items', async () => {
    const r = await bulkResult(email, 5);
    expect(r).toHaveLength(5);
    expect(r.every((v) => typeof v === 'string' && (v as string).includes('@'))).toBe(true);
  });

  it('clamps negative / non-finite counts to 0', async () => {
    expect(await bulkResult(email, -3)).toHaveLength(0);
    expect(await bulkResult(email, Number.NaN)).toHaveLength(0);
  });

  it('toJson is a pretty-printed array (v1 shape)', () => {
    const json = toJson(['a', 'b']);
    expect(JSON.parse(json)).toEqual(['a', 'b']);
    expect(json).toContain('\n');
  });

  it('convertArrayToCsv: scalar rows one-per-line (v1 shape)', () => {
    expect(convertArrayToCsv(['a', 'b', 'c'])).toBe('a\nb\nc');
  });

  it('convertArrayToCsv: array rows are quoted/escaped', () => {
    expect(convertArrayToCsv([['x', 'y'], ['a,b', 'c"d']])).toBe('"x","y"\n"a,b","c""d"');
  });
});
