<template>
  <div class="main-bg">
    <q-page padding>
      <div class="row justify-center items-center q-mt-xl">
        <div class="col-xs-12 text-center q-mb-xl">
          <img width="190" src="../assets/images/faker-js-ui-logo.png" alt="" />
        </div>
        <div class="columns col-xs-12 col-md-4 items-center text-center q-gutter-md">
          <label class="main-title text-h1 text-bold">Faker.js UI</label>
          <p class="text-body1">
            Use Faker.js UI to easiliy generate fake (but realistic) data for testing and development using
            <a
              href="https://fakerjs.dev/?ref=https://fakerjsui.com"
              target="_blank"
              >Faker.js</a
            >.
          </p>
        </div>
        <div class="col-xs-12 text-center q-mb-xl q-gutter-sm">
          <q-btn
            label="Start Faking! 👀"
            color="primary"
            size="lg"
            unelevated
            rounded
            no-caps
            :to="{ name: 'faker' }"
          />
          <q-btn
            color="primary"
            size="lg"
            outline
            rounded
            no-caps
            :label="`Download v${version}`"
          >
            <q-tooltip bottom>
              Coming soon to Chrome Extension!
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col-xs-12 col-md-3 text-center q-mb-xl q-gutter-sm">
          <p class="text-body1">
            <i>
              "{{fakePhrase}}"
            </i>
          </p>
          - Generated using Faker.js
        </div>
        <div class="col-xs-12 text-center q-mb-xl q-gutter-sm">
          <span class="text-center text-body1">
            Made with 💟 by&nbsp;<a href="https://twitter.com/jrtiquez" target="_blank">Joff Tiquez</a>. Give us a ⭐ in <a href="https://github.com/jofftiquez/faker-js-ui" target="_blank">GitHub</a>.
          </span>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { faker } from '@faker-js/faker';
import pkgJson from '../../package.json';
import { useMeta } from 'quasar';

const version = pkgJson.version;

const metaData = {
  // sets document title
  title: 'Faker.js UI - Home',

  // meta tags
  meta: {
    description: { name: 'description', content: 'Use Faker.js UI to easiliy generate fake (but realistic) data for testing and development using Faker.js' },
    keywords: { name: 'keywords', content: 'Farke.js UI' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - Home`;
      },
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: '{ "@context": "http://schema.org" }',
    },
  },

  // <html> attributes
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    'action-scope': 'xyz', // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)',
  },
};

export default {
  setup () {
    useMeta(metaData);
    const fakePhrase = faker.hacker.phrase();
    return {
      version,
      fakePhrase,
    };
  },
};
</script>

<style scoped>
.main-bg {
  /* background-color: rgb(189, 233, 239, 0.5); */
}

.main-footer {
  /* background-color: rgb(189, 233, 239, 0.5); */
}

.main-title {
  background: linear-gradient(to right, #5c21fe 0%, #9419ff 50%, #cb07e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
