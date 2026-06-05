<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';

// Resilient version read: works inside the extension (browser.runtime) and
// also when the built popup.html is opened directly (tests/file://).
function readVersion (): string {
  try {
    return browser?.runtime?.getManifest?.().version ?? '2.0.0';
  } catch {
    return '2.0.0';
  }
}

const version = ref(readVersion());
</script>

<template>
  <main
    data-testid="popup-root"
    class="min-w-[400px] bg-brand-page text-foreground"
  >
    <header
      class="flex h-[70px] items-center gap-2 bg-primary px-4 text-primary-foreground"
    >
      <img
        src="/faker-js-ui-logo.png"
        alt="Faker.js UI logo"
        class="h-[30px] w-[30px]"
      />
      <span class="text-base font-medium">Faker.js UI</span>
      <span
        class="ml-1 rounded bg-white px-1.5 py-0.5 text-xs font-semibold text-primary"
        data-testid="popup-version"
      >v{{ version }}</span>
    </header>

    <section class="space-y-3 p-4">
      <p class="text-sm text-muted-foreground">
        v2 scaffold — WXT + Vue 3 + TypeScript + Tailwind + shadcn-vue.
      </p>
      <Button
        as="a"
        variant="outline"
        size="sm"
        href="https://github.com/jofftiquez/faker-js-ui"
        target="_blank"
        rel="noopener"
      >
        View on GitHub
      </Button>
    </section>
  </main>
</template>
