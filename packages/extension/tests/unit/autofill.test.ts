// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { findMatchingMethod, formatDateValue, triggerInputEvents } from '@/lib/autofill';

function input (attrs: Record<string, string>): HTMLInputElement {
  const el = document.createElement('input');
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

describe('autofill field → faker@10 method mapping', () => {
  const cases: [Record<string, string>, string, string][] = [
    [{ type: 'email' }, 'internet', 'email'],
    [{ type: 'tel' }, 'phone', 'number'],
    [{ type: 'url' }, 'internet', 'url'],
    [{ type: 'number' }, 'number', 'int'],
    [{ type: 'text', name: 'firstName' }, 'person', 'firstName'],
    [{ type: 'text', name: 'lastName' }, 'person', 'lastName'],
    [{ type: 'text', name: 'middleName' }, 'person', 'middleName'],
    [{ type: 'text', name: 'username' }, 'internet', 'username'],
    [{ type: 'text', name: 'fullName' }, 'person', 'fullName'],
    [{ type: 'text', name: 'city' }, 'location', 'city'],
    [{ type: 'text', name: 'state' }, 'location', 'state'],
    [{ type: 'text', name: 'zipCode' }, 'location', 'zipCode'],
    [{ type: 'text', name: 'company' }, 'company', 'name'],
    [{ type: 'text', name: 'jobTitle' }, 'person', 'jobTitle'],
  ];

  for (const [attrs, api, method] of cases) {
    it(`${JSON.stringify(attrs)} → ${api}.${method}`, () => {
      const m = findMatchingMethod(input(attrs));
      expect(m?.api).toBe(api);
      expect(m?.methodName).toBe(method);
    });
  }

  it('username maps to faker@10 `username` (not the removed `userName`)', () => {
    expect(findMatchingMethod(input({ type: 'text', name: 'username' }))?.methodName).toBe('username');
  });

  it('textarea with no name → lorem.paragraph', () => {
    const m = findMatchingMethod(document.createElement('textarea'));
    expect(m?.api).toBe('lorem');
    expect(m?.methodName).toBe('paragraph');
  });

  it('unmatched text input still resolves to a method (word fallback)', () => {
    expect(findMatchingMethod(input({ type: 'text', name: 'xyzzy123' }))).toBeDefined();
  });

  it('formatDateValue formats per input type', () => {
    const d = new Date('2020-05-15T09:30:00');
    expect(formatDateValue(d, 'date')).toBe('2020-05-15');
    expect(formatDateValue(d, 'month')).toBe('2020-05');
    expect(formatDateValue(d, 'datetime-local')).toBe('2020-05-15T09:30');
  });

  it('triggerInputEvents sets the value and dispatches input', () => {
    const el = input({ type: 'text' });
    document.body.appendChild(el);
    let fired = false;
    el.addEventListener('input', () => { fired = true; });
    triggerInputEvents(el, 'hello');
    expect(el.value).toBe('hello');
    expect(fired).toBe(true);
    el.remove();
  });
});
