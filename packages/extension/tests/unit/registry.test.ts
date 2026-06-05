import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker/locale/en';
import { fakerApis, fakerMethods, groupByApi, startCase } from '@/lib/faker/registry';

const fakerAny = faker as unknown as Record<string, Record<string, unknown>>;

function defaultOptions (params: { name: string; default: unknown }[]) {
  return params.length
    ? Object.fromEntries(params.map((p) => [p.name, p.default]))
    : undefined;
}

describe('faker@10 registry', () => {
  it('exposes a non-trivial number of methods', () => {
    expect(fakerMethods.length).toBeGreaterThan(180);
  });

  it('every registry method exists on faker@10', () => {
    const missing: string[] = [];
    for (const api of fakerApis) {
      for (const m of api.methods) {
        if (typeof fakerAny[api.api]?.[m.name] !== 'function') {
          missing.push(`${api.api}.${m.name}`);
        }
      }
    }
    expect(missing, `missing methods: ${missing.join(', ')}`).toEqual([]);
  });

  it('every method generates a defined value without throwing', async () => {
    const errors: string[] = [];
    for (const method of fakerMethods) {
      try {
        const value = await method.fakerFn({ options: defaultOptions(method.params) });
        if (value === undefined || value === null) {
          errors.push(`${method.searchNeedle}: produced ${String(value)}`);
        }
      } catch (e) {
        errors.push(`${method.searchNeedle}: ${(e as Error).message}`);
      }
    }
    expect(errors, `\n${errors.join('\n')}`).toEqual([]);
  });

  it('emits no faker deprecation warnings when generating', async () => {
    const captured: string[] = [];
    const channels: Array<keyof Console> = ['warn', 'error', 'log'];
    const originals = channels.map((c) => [c, console[c]] as const);
    for (const c of channels) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (console as any)[c] = (...args: unknown[]) => captured.push(args.join(' '));
    }
    try {
      for (const method of fakerMethods) {
        await method.fakerFn({ options: defaultOptions(method.params) });
      }
    } finally {
      for (const [c, fn] of originals) (console as unknown as Record<string, unknown>)[c] = fn;
    }
    const deprecations = captured.filter((m) => /deprecated/i.test(m));
    expect(deprecations, `\n${deprecations.join('\n')}`).toEqual([]);
  });

  it('groups methods by api', () => {
    const grouped = groupByApi(fakerMethods);
    expect(Object.keys(grouped).length).toBe(fakerApis.length);
    expect(grouped['🧑 Person']?.some((m) => m.name === 'First Name')).toBe(true);
  });

  it('startCase formats camelCase and acronyms', () => {
    expect(startCase('firstName')).toBe('First Name');
    expect(startCase('zipCode')).toBe('Zip Code');
    expect(startCase('creditCardNumber')).toBe('Credit Card Number');
  });
});
