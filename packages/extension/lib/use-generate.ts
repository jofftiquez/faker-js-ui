import { ref } from 'vue';
import { toast } from 'vue-sonner';
import type { FakerMethod, MethodParam } from './faker/types';

const FIRST_GENERATE_KEY = 'firstGenerate';

/** Default options object built from a method's param defaults. */
export function defaultOptions (params: MethodParam[]): Record<string, unknown> | undefined {
  if (!params.length) return undefined;
  return Object.fromEntries(params.map((p) => [p.name, p.default]));
}

/** Mutable values map seeded from param defaults (for the param dialogs). */
export function initValues (params: MethodParam[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const p of params) values[p.name] = p.default;
  return values;
}

/** Build a faker options object from user-entered values (drops empties). */
export function buildOptions (
  params: MethodParam[],
  values: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!params.length) return undefined;
  const opts: Record<string, unknown> = {};
  let has = false;
  for (const p of params) {
    const v = values[p.name];
    if (v !== undefined && v !== null && v !== '') {
      opts[p.name] = v;
      has = true;
    }
  }
  return has ? opts : undefined;
}

/** Stringify a generated value for clipboard + preview (objects pretty-printed). */
export function toText (value: unknown): string {
  if (typeof value === 'object' && value !== null) return JSON.stringify(value, null, 2);
  return String(value);
}

/**
 * One-click generate: run the faker method, copy to clipboard, show a preview
 * toast (full value; the Toaster styles the description as a scrollable
 * monospace block, v1 parity), and surface the first-generate review prompt.
 */
export function useGenerate () {
  const lastValue = ref<unknown>(null);
  const showReview = ref(false);
  let reviewScheduled = false;

  function maybeScheduleReview () {
    if (reviewScheduled || localStorage.getItem(FIRST_GENERATE_KEY)) return;
    reviewScheduled = true;
    setTimeout(() => {
      // Set the one-shot flag only once the dialog actually shows, so a popup
      // that closes before the timer fires doesn't burn the prompt.
      localStorage.setItem(FIRST_GENERATE_KEY, 'true');
      showReview.value = true;
    }, 2000);
  }

  async function generate (method: FakerMethod, options?: Record<string, unknown>) {
    const opts = options ?? defaultOptions(method.params);
    let value: unknown;
    try {
      value = await method.fakerFn({ options: opts });
    } catch (e) {
      toast.error(`Could not generate ${method.name}`, { description: (e as Error).message });
      return;
    }

    lastValue.value = value;
    const text = toText(value);
    // Generous cap so the scrollable preview shows the full value for almost
    // everything (the full value is always on the clipboard regardless).
    const preview = text.length > 5000 ? `${text.slice(0, 5000)}…` : text;

    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      // Clipboard unavailable (e.g. not focused / denied) — don't claim a copy.
    }

    if (copied) {
      toast.success(`${method.name} copied to clipboard!`, { description: preview });
    } else {
      toast(`Generated ${method.name}`, { description: preview });
    }

    maybeScheduleReview();
  }

  return { generate, lastValue, showReview };
}
