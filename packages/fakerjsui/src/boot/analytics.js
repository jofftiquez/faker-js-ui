import { boot } from 'quasar/wrappers';
import { inject } from '@vercel/analytics';

export default boot(() => {
  inject();
});
