<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui';
import { X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import ParameterField from './ParameterField.vue';
import { initValues, buildOptions } from '@/lib/use-generate';
import type { FakerMethod } from '@/lib/faker/types';

const props = defineProps<{ open: boolean; method: FakerMethod | null }>();
const emit = defineEmits<{
  'update:open': [value: boolean];
  generate: [payload: { method: FakerMethod; options?: Record<string, unknown> }];
}>();

const values = ref<Record<string, unknown>>({});
watch(
  () => props.method,
  (m) => { values.value = m ? initValues(m.params) : {}; },
  { immediate: true },
);

function generate () {
  if (!props.method) return;
  emit('generate', { method: props.method, options: buildOptions(props.method.params, values.value) });
  emit('update:open', false);
}
function generateDefaults () {
  if (!props.method) return;
  emit('generate', { method: props.method, options: undefined });
  emit('update:open', false);
}
</script>

<template>
  <DialogRoot :open="open" @update:open="(v: boolean) => emit('update:open', v)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/40" />
      <DialogContent
        data-testid="parameter-dialog"
        class="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-5 shadow-lg focus:outline-none"
      >
        <DialogClose
          class="absolute right-3 top-3 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
          aria-label="Close"
        >
          <X class="size-4" />
        </DialogClose>
        <DialogTitle class="text-base font-semibold">
          {{ method?.apiName }} — {{ method?.name }}
        </DialogTitle>
        <DialogDescription class="mt-1 text-xs text-muted-foreground">
          Configure parameters (all optional).
        </DialogDescription>

        <div class="mt-4 space-y-3">
          <ParameterField
            v-for="p in method?.params"
            :key="p.name"
            v-model="values[p.name]"
            :param="p"
          />
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="sm" data-testid="param-defaults" @click="generateDefaults">
            Use Defaults
          </Button>
          <Button size="sm" data-testid="param-generate" @click="generate">
            Generate
          </Button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
