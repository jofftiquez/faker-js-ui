<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <div
    data-testid="popup-root"
    class="min-w-[400px] bg-brand-page text-foreground"
  >
    <AppHeader />

    <!-- The search, method browser, generate/preview and bulk/export UI land
         here in Phases 3-5. -->
    <main class="p-3">
      <p class="text-sm text-muted-foreground">
        Search and generate Faker.js data — coming in the next phase.
      </p>
    </main>
  </div>
</template>
