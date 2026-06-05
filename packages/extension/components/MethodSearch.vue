<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
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
const active = ref(0);
const root = ref<HTMLElement | null>(null);

onClickOutside(root, () => { open.value = false; });

const results = computed<FakerMethod[]>(() => {
  const q = debounced.value.trim().toLowerCase();
  if (!q) return [];
  return fakerMethods.filter((m) => m.searchNeedle.toLowerCase().includes(q)).slice(0, 8);
});
const hasQuery = computed(() => debounced.value.trim().length > 0);

watch(results, () => { active.value = 0; });

// Restore v1's immediate type-to-search: focus the input on mount, and bind
// keyboard navigation natively on the input (most reliable across the shadcn
// Input wrapper).
onMounted(() => {
  const input = root.value?.querySelector('input');
  input?.focus();
  input?.addEventListener('keydown', onKeydown);
});

function choose (m: FakerMethod) {
  emit('select', m);
  query.value = '';
  open.value = false;
}
function bulk (m: FakerMethod) {
  emit('bulk', m);
  query.value = '';
  open.value = false;
}

function onKeydown (e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    open.value = true;
    if (results.value.length) active.value = (active.value + 1) % results.value.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (results.value.length) {
      active.value = (active.value - 1 + results.value.length) % results.value.length;
    }
  } else if (e.key === 'Enter') {
    const m = results.value[active.value];
    if (m) { e.preventDefault(); choose(m); }
  } else if (e.key === 'Escape') {
    open.value = false;
  }
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
        role="combobox"
        aria-label="Search Faker method"
        aria-autocomplete="list"
        aria-controls="search-listbox"
        :aria-expanded="open && hasQuery"
        :aria-activedescendant="open && results.length ? `search-opt-${active}` : undefined"
        data-testid="method-search"
        @focus="open = true"
      />
    </div>
    <ul
      v-if="open && hasQuery"
      id="search-listbox"
      role="listbox"
      class="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
      data-testid="search-results"
    >
      <li
        v-for="(m, i) in results"
        :id="`search-opt-${i}`"
        :key="m.searchNeedle"
        role="option"
        :aria-selected="i === active"
        class="flex items-center rounded-sm"
        :class="i === active ? 'bg-accent' : ''"
      >
        <button
          type="button"
          class="flex flex-1 items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
          :data-method="m.searchNeedle"
          @click="choose(m)"
          @mouseenter="active = i"
        >
          <span>{{ m.emoji }}</span>
          <span>{{ m.searchNeedle }}</span>
        </button>
        <button
          type="button"
          class="rounded-sm px-2 py-1.5 text-muted-foreground hover:text-foreground"
          :aria-label="`Bulk generate ${m.name}`"
          :data-bulk="m.searchNeedle"
          @click="bulk(m)"
        >
          <Layers class="size-4" />
        </button>
      </li>
      <li
        v-if="!results.length"
        class="px-2 py-1.5 text-sm text-muted-foreground"
        data-testid="search-no-results"
        aria-disabled="true"
      >
        No results
      </li>
    </ul>
  </div>
</template>
