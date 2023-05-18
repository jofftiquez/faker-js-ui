<template>
  <q-layout view="hHh lpR fFf" style="background: rgb(189, 233, 239, 0.5)">
    <q-header class="bg-primary text-white">
      <q-toolbar style="height: 70px">
        <q-btn flat no-caps :to="{ name: 'home' }">
          <img width="50" src="../assets/images/faker-js-ui-logo.png" alt="" />
          <q-toolbar-title> Faker.js UI </q-toolbar-title>
        </q-btn>
        <q-space />
        <q-btn
          label="Give us a ⭐ in GitHub"
          href="https://github.com/jofftiquez/faker-js-ui"
          target="_blank"
          size="md"
          flat
          no-caps
        />
        <!-- <q-btn icon="open_in_new" round flat /> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
