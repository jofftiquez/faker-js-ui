<script setup lang="ts">
import { computed } from 'vue';
import { Settings2 } from '@lucide/vue';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fakerMethods, groupByApi } from '@/lib/faker/registry';
import type { FakerMethod } from '@/lib/faker/types';

const emit = defineEmits<{ select: [method: FakerMethod] }>();
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
          <button
            v-for="m in methods"
            :key="m.searchNeedle"
            type="button"
            class="flex w-full items-center justify-between gap-2 border-t px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
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
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
