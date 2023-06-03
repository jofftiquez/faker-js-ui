<template>
  <q-layout view="hHR lpR fFr" style="background: rgb(189, 233, 239, 0.5)">
    <q-header class="bg-primary text-white">
      <q-toolbar style="height: 70px">
        <q-btn flat no-caps :to="{ name: 'home' }">
          <img :width="isBex ? 30 : 50" class="q-mr-sm" src="../assets/images/faker-js-ui-logo.png" alt="" />
          <component
            :is="isBex ? 'span' : 'q-toolbar-title'"
            :class="{ 'text-subtitle1': isBex, 'text-h6': !isBex }"
          >
            Faker.js UI
          </component>
        </q-btn>
        <q-space />
        <a
          href="https://github.com/jofftiquez/faker-js-ui?ref=fakerjsui-bex"
          target="_blank"
          class="q-mr-sm"
          style="margin-top: 3px;"
        >
          <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/jofftiquez/faker-js-ui?style=social">
        </a>
        <q-btn
          v-if="isBex"
          href="https://app.fakerjsui.com?ref=fakerjsui-bex"
          target="_blank"
          icon="open_in_new"
          round
          flat
        />
        <!-- <q-btn icon="open_in_new" round flat /> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed } from 'vue';
import { useQuasar } from 'quasar';
export default {
  setup () {
    const $q = useQuasar();
    const isMobile = computed(() => $q.screen.lt.md);
    const isBex = computed(() => $q.bex);
    return {
      isMobile,
      isBex,
    };
  },
};
</script>
