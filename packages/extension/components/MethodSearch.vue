<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { refDebounced, onClickOutside } from '@vueuse/core';
import { Search, Layers } from '@lucide/vue';
import { Input } from '@/components/ui/input';
import { fakerMethods } from '@/lib/faker/registry';
import type { FakerMethod } from '@/lib/faker/types';

const emit = defineEmits<{
  select: [method: FakerMethod];
  bulk: [method: FakerMethod];
}>();

const query = ref('');
const debounced = refDebounced(query, 120);
const open = ref(false);
const root = useTemplateRef<HTMLElement>('root');

onClickOutside(root, () => { open.value = false; });

const results = computed<FakerMethod[]>(() => {
  const q = debounced.value.trim().toLowerCase();
  if (!q) return [];
  return fakerMethods.filter((m) => m.searchNeedle.toLowerCase().includes(q)).slice(0, 8);
});

function choose (m: FakerMethod) {
  emit('select', m);
  query.value = '';
  open.value = false;
}
</script>

<template>
  <div ref="root" class="relative">
    <div class="relative">
      <Search class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        v-model="query"
        type="text"
        placeholder="Full Name, Email, Avatar, etc."
        class="bg-white pl-8"
        aria-label="Search Faker method"
        data-testid="method-search"
        @focus="open = true"
      />
    </div>
    <ul
      v-if="open && results.length"
      class="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
      data-testid="search-results"
    >
      <li v-for="m in results" :key="m.searchNeedle" class="flex items-center">
        <button
          type="button"
          class="flex flex-1 items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
          :data-method="m.searchNeedle"
          @click="choose(m)"
        >
          <span>{{ m.emoji }}</span>
          <span>{{ m.searchNeedle }}</span>
        </button>
        <button
          type="button"
          class="rounded-sm px-2 py-1.5 text-muted-foreground hover:text-foreground"
          :aria-label="`Bulk generate ${m.name}`"
          :data-bulk="m.searchNeedle"
          @click="emit('bulk', m); open = false; query = ''"
        >
          <Layers class="size-4" />
        </button>
      </li>
    </ul>
  </div>
</template>
