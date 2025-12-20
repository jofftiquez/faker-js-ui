// const LANG = 'en_US';
// const TYPE = 'website';
// const URL = 'https://hippocrades.com';
// const SITE_NAME = 'hippocrades.com';

// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  preset: 'node-server',

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxt/image',
    'nuxt-gtag',
    '@nuxtjs/partytown',
  ],

  partytown: {
    forward: ['dataLayer.push'],
  },

  nitro: {
    preset: 'firebase',
  },

  gtag: {
    id: 'G-41F9X46SBS',
  },

  srcDir: './src',

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
      signupURL: process.env.SIGNUP_LINK,
      ipStackAPIKey: process.env.IPSTACK_API_KEY,
      ipStackAPIURL: process.env.IPSTACK_API_URL,
    },
  },

  plugins: [
    {
      src: '@/plugins/aos',
      ssr: false,
      mode: 'client',
    },
    // {
    //   src: '@/plugins/v-smooth-scroll',
    //   ssr: true,
    //   // mode: 'client',
    // },
  ],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css',
        },
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6835309878758776',
          async: true,
          crossorigin: 'anonymous',
        },
      ],
      // meta: [
      //   {
      //     hid: 'locale',
      //     name: 'og:locale',
      //     content: LANG,
      //   },
      //   {
      //     hid: 'type',
      //     name: 'og:type',
      //     content: TYPE,
      //   },
      //   {
      //     hid: 'og:url',
      //     name: 'og:url',
      //     content: URL,
      //   },
      //   {
      //     hid: 'og:title',
      //     name: 'og:title',
      //     content: 'Hippocrades - Amazingly fast. Remarkably secure.',
      //   },
      //   {
      //     hid: 'og:site_name',
      //     name: 'og:site_name',
      //     content: SITE_NAME,
      //   },
      //   {
      //     hid: 'og:description',
      //     name: 'og:description',
      //     content: 'World\'s Fastest Healthcare Solutions for Hospitals, Clinics, Pharmacies, & HMOs that work online and offline.',
      //   },
      //   {
      //     hid: 'og:image',
      //     name: 'og:image',
      //     content: import('src/assets/images/ariob-io.png'),
      //   },
      // ],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },

  headlessui: {
    prefix: 'Headless',
  },

  build: {
    extend (config, ctx) {
      config.resolve.symlinks = false;
    },
  },

  image: {
    dir: 'assets/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
      '3xl': 1920,
    },
  },

  devtools: {
    enabled: true,
  },
});
