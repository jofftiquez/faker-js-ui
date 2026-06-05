// Form auto-fill — the signature extension feature. Ported from v1's
// src-bex/my-content-script.js to a typed module driven by the faker@10
// registry. Engine-agnostic DOM logic (works identically on Chromium + Gecko).
import { fakerMethods } from './faker/registry';
import type { FakerMethod } from './faker/types';

type ApiMethod = [api: string, method: string];

/** input[type] → faker method. */
const fieldTypeMappings: Record<string, ApiMethod> = {
  email: ['internet', 'email'],
  password: ['internet', 'password'],
  tel: ['phone', 'number'],
  url: ['internet', 'url'],
  date: ['date', 'anytime'],
  'datetime-local': ['date', 'anytime'],
  month: ['date', 'month'],
  number: ['number', 'int'],
  search: ['lorem', 'word'],
};

/** Field name/label patterns → faker method (userName → username for faker@10). */
// Specific name patterns precede the generic `/name/` catch-all so that
// `username`/`middleName` aren't swallowed by fullName (a v1 ordering bug).
const fieldNamePatterns: { patterns: RegExp[]; method: ApiMethod }[] = [
  { patterns: [/first.?name/i, /\bfname\b/i, /given.?name/i], method: ['person', 'firstName'] },
  { patterns: [/last.?name/i, /\blname\b/i, /surname/i, /family.?name/i], method: ['person', 'lastName'] },
  { patterns: [/middle.?name/i, /\bmname\b/i], method: ['person', 'middleName'] },
  { patterns: [/user.?name/i, /username/i, /login/i, /handle/i], method: ['internet', 'username'] },
  { patterns: [/full.?name/i, /your.?name/i, /name/i], method: ['person', 'fullName'] },
  { patterns: [/gender/i, /sex/i], method: ['person', 'sex'] },
  { patterns: [/job.?title/i, /position/i, /occupation/i], method: ['person', 'jobTitle'] },
  { patterns: [/bio/i, /about/i, /description/i], method: ['person', 'bio'] },

  { patterns: [/e.?mail/i, /email/i], method: ['internet', 'email'] },
  { patterns: [/phone/i, /mobile/i, /cell/i, /tel/i], method: ['phone', 'number'] },
  { patterns: [/website/i, /url/i, /site/i, /homepage/i], method: ['internet', 'url'] },

  { patterns: [/street/i, /address.?1/i, /address.?line/i], method: ['location', 'streetAddress'] },
  { patterns: [/address.?2/i, /apt/i, /suite/i, /unit/i], method: ['location', 'secondaryAddress'] },
  { patterns: [/city/i, /town/i], method: ['location', 'city'] },
  { patterns: [/state/i, /province/i, /region/i], method: ['location', 'state'] },
  { patterns: [/zip/i, /postal/i, /postcode/i], method: ['location', 'zipCode'] },
  { patterns: [/country/i], method: ['location', 'country'] },

  { patterns: [/company/i, /organization/i, /org/i, /employer/i], method: ['company', 'name'] },

  { patterns: [/birth/i, /dob/i, /birthday/i], method: ['date', 'birthdate'] },
  { patterns: [/date/i], method: ['date', 'anytime'] },

  { patterns: [/title/i, /subject/i, /headline/i], method: ['lorem', 'sentence'] },
  { patterns: [/message/i, /comment/i, /note/i, /feedback/i], method: ['lorem', 'paragraph'] },
  { patterns: [/content/i, /body/i, /text/i], method: ['lorem', 'paragraphs'] },

  { patterns: [/credit.?card/i, /card.?number/i, /cc/i], method: ['finance', 'creditCardNumber'] },
  { patterns: [/cvv/i, /cvc/i, /security.?code/i], method: ['finance', 'creditCardCVV'] },
  { patterns: [/price/i, /amount/i, /cost/i], method: ['commerce', 'price'] },

  { patterns: [/password/i, /pass/i, /pwd/i], method: ['internet', 'password'] },
  { patterns: [/avatar/i, /profile.?pic/i, /photo/i], method: ['image', 'avatar'] },
  { patterns: [/color/i, /colour/i], method: ['color', 'human'] },
];

function methodFor (api: string, name: string): FakerMethod | undefined {
  return fakerMethods.find((m) => m.api === api && m.methodName === name);
}

/** CSS.escape with a fallback (CSS is absent in some non-browser contexts). */
function escapeSelector (value: string): string {
  return typeof CSS !== 'undefined' && CSS.escape
    ? CSS.escape(value)
    : value.replace(/["\\]/g, '\\$&');
}

export function getFieldLabel (field: HTMLElement): string {
  const aria = field.getAttribute('aria-label');
  if (aria) return aria;
  if (field.id) {
    const label = document.querySelector(`label[for="${escapeSelector(field.id)}"]`);
    if (label?.textContent) return label.textContent.trim();
  }
  const parentLabel = field.closest('label');
  if (parentLabel?.textContent) return parentLabel.textContent.trim();
  const labelledBy = field.getAttribute('aria-labelledby');
  if (labelledBy) {
    const el = document.getElementById(labelledBy);
    if (el?.textContent) return el.textContent.trim();
  }
  return '';
}

export function findMatchingMethod (
  field: HTMLInputElement | HTMLTextAreaElement,
): FakerMethod | undefined {
  const fieldType = (field as HTMLInputElement).type || 'text';
  const searchTexts = [
    field.getAttribute('name') ?? '',
    field.id,
    (field as HTMLInputElement).placeholder ?? '',
    getFieldLabel(field),
    field.getAttribute('autocomplete') ?? '',
  ].filter(Boolean);

  // 1. Field type mapping.
  const typeMap = fieldTypeMappings[fieldType];
  if (typeMap) {
    const m = methodFor(typeMap[0], typeMap[1]);
    if (m) return m;
  }

  // 2. Name/label patterns.
  for (const { patterns, method } of fieldNamePatterns) {
    for (const text of searchTexts) {
      if (patterns.some((p) => p.test(text))) {
        const m = methodFor(method[0], method[1]);
        if (m) return m;
      }
    }
  }

  // 3. Registry regex fallback.
  for (const text of searchTexts) {
    const m = fakerMethods.find((fm) => fm.regex.some((r) => r.test(text)));
    if (m) return m;
  }

  // 4/5. Textarea → paragraph, else → word.
  if (field.tagName === 'TEXTAREA') return methodFor('lorem', 'paragraph');
  return methodFor('lorem', 'word');
}

export function triggerInputEvents (field: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto = field.tagName === 'TEXTAREA'
    ? window.HTMLTextAreaElement.prototype
    : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  if (setter) setter.call(field, value);
  else field.value = value;

  field.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  field.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
  field.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));

  // React 16+ controlled-input reset.
  const tracker = (field as unknown as { _valueTracker?: { setValue (v: string): void } })._valueTracker;
  if (tracker) tracker.setValue('');
}

export function formatDateValue (input: unknown, inputType: string): string {
  const date = input instanceof Date ? input : new Date(input as string | number);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  switch (inputType) {
    case 'datetime-local': return `${year}-${month}-${day}T${hours}:${minutes}`;
    case 'month': return `${year}-${month}`;
    case 'time': return `${hours}:${minutes}`;
    default: return `${year}-${month}-${day}`;
  }
}

export function highlightField (field: HTMLElement) {
  const originalOutline = field.style.outline;
  const originalTransition = field.style.transition;
  field.style.transition = 'outline 0.3s ease';
  field.style.outline = '2px solid #843bd7';
  setTimeout(() => {
    field.style.outline = originalOutline;
    setTimeout(() => { field.style.transition = originalTransition; }, 300);
  }, 500);
}

function isVisible (el: HTMLElement): boolean {
  return el.offsetParent !== null;
}

export async function findAndFillFormFields (): Promise<number> {
  const inputTypes = [
    'text', 'email', 'password', 'number', 'tel', 'url', 'search',
    'date', 'datetime-local', 'month', 'time',
  ];
  const inputSelector = inputTypes.map((t) => `input[type="${t}"]`).join(', ');
  // Inputs with no/unknown type default to text.
  const inputs = document.querySelectorAll<HTMLInputElement>(`${inputSelector}, input:not([type])`);
  const textareas = document.querySelectorAll<HTMLTextAreaElement>('textarea');
  const selects = document.querySelectorAll<HTMLSelectElement>('select');
  const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  const radios = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

  const processedRadioGroups = new Set<string>();
  let filled = 0;

  for (const field of inputs) {
    if (field.disabled || field.readOnly || field.type === 'hidden') continue;
    if (!isVisible(field)) continue;
    const method = findMatchingMethod(field);
    if (!method) continue;
    try {
      let value = await method.fakerFn();
      const isDateInput = ['date', 'datetime-local', 'month', 'time'].includes(field.type);
      if (value instanceof Date) {
        // Format Dates for both date-typed and plain text inputs (a /date/ or
        // /birth/ text field maps to a Date method) — never JSON-quote them.
        value = formatDateValue(value, isDateInput ? field.type : 'date');
      } else if (isDateInput) {
        value = formatDateValue(value, field.type);
      }
      if (typeof value === 'object' && value !== null) value = JSON.stringify(value);
      triggerInputEvents(field, String(value));
      highlightField(field);
      filled++;
    } catch (e) {
      console.warn('FakerUI: error filling field', field, e);
    }
  }

  for (const field of textareas) {
    if (field.disabled || field.readOnly || !isVisible(field)) continue;
    const method = findMatchingMethod(field);
    if (!method) continue;
    try {
      const value = await method.fakerFn();
      triggerInputEvents(field, String(value));
      highlightField(field);
      filled++;
    } catch (e) {
      console.warn('FakerUI: error filling textarea', field, e);
    }
  }

  for (const field of selects) {
    if (field.disabled || !isVisible(field)) continue;
    const options = Array.from(field.options).filter((o) => o.value && !o.disabled);
    if (!options.length) continue;
    const pick = options[Math.floor(Math.random() * options.length)]!;
    field.selectedIndex = pick.index;
    field.dispatchEvent(new Event('change', { bubbles: true }));
    highlightField(field);
    filled++;
  }

  for (const field of checkboxes) {
    if (field.disabled || !isVisible(field)) continue;
    field.checked = Math.random() > 0.5;
    field.dispatchEvent(new Event('change', { bubbles: true }));
    highlightField(field);
    filled++;
  }

  for (const field of radios) {
    if (field.disabled || !isVisible(field)) continue;
    const name = field.name;
    if (!name || processedRadioGroups.has(name)) continue;
    const group = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${escapeSelector(name)}"]`);
    if (!group.length) continue;
    const pick = group[Math.floor(Math.random() * group.length)]!;
    pick.checked = true;
    pick.dispatchEvent(new Event('change', { bubbles: true }));
    processedRadioGroups.add(name);
    filled++;
  }

  return filled;
}
