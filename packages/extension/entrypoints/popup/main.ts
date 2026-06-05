import { createApp } from 'vue';
import App from './App.vue';

// Self-hosted Roboto (v1 parity) — no remote font CDN (MV3-safe).
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/assets/tailwind.css';

createApp(App).mount('#app');
