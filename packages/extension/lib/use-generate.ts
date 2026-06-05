import { ref } from 'vue';
import { toast } from 'vue-sonner';
import type { FakerMethod, MethodParam } from './faker/types';

const FIRST_GENERATE_KEY = 'firstGenerate';

/** Default options object built from a method's param defaults. */
export function defaultOptions (params: MethodParam[]): Record<string, unknown> | undefined {
  if (!params.length) return undefined;
  return Object.fromEntries(params.map((p) => [p.name, p.default]));
}

/** Stringify a generated value for clipboard + preview (objects pretty-printed). */
export function toText (value: unknown): string {
  if (typeof value === 'object' && value !== null) return JSON.stringify(value, null, 2);
  return String(value);
}

/**
 * One-click generate: run the faker method, copy to clipboard, show a preview
 * toast, and surface the first-generate review prompt (v1 parity).
 */
export function useGenerate () {
  const lastValue = ref<unknown>(null);
  const showReview = ref(false);

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
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard may be unavailable (e.g. not focused) — still preview the value.
    }

    const preview = text.length > 220 ? `${text.slice(0, 220)}…` : text;
    toast.success(`${method.name} copied to clipboard!`, { description: preview });

    if (!localStorage.getItem(FIRST_GENERATE_KEY)) {
      localStorage.setItem(FIRST_GENERATE_KEY, 'true');
      setTimeout(() => { showReview.value = true; }, 2000);
    }
  }

  return { generate, lastValue, showReview };
}
