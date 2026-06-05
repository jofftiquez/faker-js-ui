<script setup lang="ts">
import { computed } from 'vue';
import { Settings2, Layers } from '@lucide/vue';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fakerMethods, groupByApi } from '@/lib/faker/registry';
import type { FakerMethod } from '@/lib/faker/types';

const emit = defineEmits<{
  select: [method: FakerMethod];
  bulk: [method: FakerMethod];
}>();
const groups = computed(() => groupByApi(fakerMethods));
</script>

<template>
  <Accordion type="multiple" class="w-full" data-testid="method-list">
    <AccordionItem
      v-for="(methods, apiName) in groups"
      :key="apiName"
      :value="apiName"
    >
      <AccordionTrigger class="px-2 text-sm font-medium">
        {{ apiName }}
      </AccordionTrigger>
      <AccordionContent class="pb-1">
        <div class="max-h-64 overflow-auto">
          <div
            v-for="m in methods"
            :key="m.searchNeedle"
            class="flex items-center border-t"
          >
            <button
              type="button"
              class="flex flex-1 items-center justify-between gap-2 px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
              :data-method="m.searchNeedle"
              @click="emit('select', m)"
            >
              <span>{{ m.name }}</span>
              <Settings2
                v-if="m.params.length"
                class="size-3.5 shrink-0 text-muted-foreground"
                aria-label="has parameters"
              />
            </button>
            <button
              type="button"
              class="px-2 py-2 text-muted-foreground transition-colors hover:text-foreground"
              :aria-label="`Bulk generate ${m.name}`"
              :data-bulk="m.searchNeedle"
              @click="emit('bulk', m)"
            >
              <Layers class="size-4" />
            </button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
