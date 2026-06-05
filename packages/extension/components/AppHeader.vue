<script setup lang="ts">
import { computed } from 'vue';
import { ExternalLink } from '@lucide/vue';
import { getAppVersion } from '@/lib/version';

// `compact` reproduces v1's BEX (popup) affordances: smaller logo/title and the
// "open web app" button. Non-compact mirrors v1's SPA sizing. The extension
// popup is compact; the prop keeps both modes available (issue #20).
const props = withDefaults(defineProps<{ compact?: boolean }>(), {
  compact: true,
});

const version = getAppVersion();
const logoSize = computed(() => (props.compact ? 30 : 50));
const repoUrl = 'https://github.com/jofftiquez/faker-js-ui?ref=fakerjsui-bex';
const appUrl = 'https://app.fakerjsui.org?ref=fakerjsui-bex';
</script>

<template>
  <header
    data-testid="app-header"
    class="flex items-center bg-primary px-3 text-white"
    style="height: 70px"
  >
    <div class="flex items-center">
      <img
        src="/faker-js-ui-logo.png"
        alt="Faker.js UI logo"
        class="mr-2"
        :width="logoSize"
        :height="logoSize"
        :style="{ width: logoSize + 'px', height: logoSize + 'px' }"
      />
      <span :class="compact ? 'text-base font-normal' : 'text-xl font-medium'">
        Faker.js UI
      </span>
      <span
        data-testid="app-version"
        class="ml-2 rounded bg-white px-1.5 py-0.5 text-xs font-normal leading-none text-primary"
      >v{{ version }}</span>
    </div>

    <div class="flex-1" />

    <a
      :href="repoUrl"
      target="_blank"
      rel="noopener"
      class="mr-2 mt-[3px] inline-flex"
      aria-label="GitHub repository stars"
    >
      <img
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/jofftiquez/faker-js-ui?style=social"
      />
    </a>

    <a
      v-if="compact"
      :href="appUrl"
      target="_blank"
      rel="noopener"
      class="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-white/15"
      aria-label="Open the Faker.js UI web app"
      title="Open web app"
    >
      <ExternalLink class="h-[18px] w-[18px]" />
    </a>
  </header>
</template>
