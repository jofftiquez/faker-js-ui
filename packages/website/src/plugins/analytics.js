import { inject } from '@vercel/analytics';

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    inject();
  }
});
