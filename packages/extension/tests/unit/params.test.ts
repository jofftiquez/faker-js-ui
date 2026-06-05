import { describe, it, expect } from 'vitest';
import { initValues, buildOptions } from '@/lib/use-generate';
import { fakerMethods } from '@/lib/faker/registry';

const int = fakerMethods.find((m) => m.searchNeedle === 'Number - Int')!;

describe('parameter helpers', () => {
  it('initValues seeds defaults', () => {
    expect(initValues(int.params)).toEqual({ min: 0, max: 100 });
  });

  it('buildOptions drops empty values', () => {
    expect(buildOptions(int.params, { min: 50, max: '' })).toEqual({ min: 50 });
    expect(buildOptions([], {})).toBeUndefined();
    expect(buildOptions(int.params, { min: '', max: '' })).toBeUndefined();
  });

  it('faker respects the built options (min=max=42 → 42)', async () => {
    const v = await int.fakerFn({ options: buildOptions(int.params, { min: 42, max: 42 }) });
    expect(v).toBe(42);
  });
});
