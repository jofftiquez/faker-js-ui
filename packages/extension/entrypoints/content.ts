import { findAndFillFormFields } from '@/lib/autofill';
import { FILL_MESSAGE, type FillResponse } from '@/lib/messages';

// Auto-fill content script. WXT generates the per-browser registration; uses
// the unified browser.* namespace (no Quasar $q.bex bridge, no chrome.*).
export default defineContentScript({
  matches: ['*://*/*'],
  runAt: 'document_idle',
  main () {
    browser.runtime.onMessage.addListener((message: unknown): Promise<FillResponse> | undefined => {
      if ((message as { type?: string })?.type === FILL_MESSAGE) {
        return findAndFillFormFields().then((count) => ({ count }));
      }
      return undefined;
    });
  },
});
