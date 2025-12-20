/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./node_modules/flowbite.{js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#843bd7',
      },
      fontFamily: {
        primary: ['Inter'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        fakerjsui: {
          primary: '#843bd7',
          secondary: '#424242',
          accent: '#82B1FF',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#2196F3',
          success: '#7fad33',
          warning: '#FFC107',
          error: '#f75a5f',
        },
      },
      'light',
    ],
  },
  plugins: [
    '@tailwindcss/forms',
    '@tailwindcss/container-queries',
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
};
