<script setup lang="ts">
import { ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'reka-ui';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { bulkResult, downloadJSON, downloadCSV, toJson } from '@/lib/use-bulk';
import type { FakerMethod } from '@/lib/faker/types';

const props = defineProps<{ open: boolean; method: FakerMethod | null }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const count = ref('10');
watch(() => props.open, (o) => { if (o) count.value = '10'; });

async function run (): Promise<unknown[]> {
  if (!props.method) return [];
  return bulkResult(props.method, Number(count.value));
}

async function generate () {
  const result = await run();
  await navigator.clipboard.writeText(toJson(result)).catch(() => {});
  toast.success(`Generated ${result.length} × ${props.method?.name} — copied as JSON`);
  emit('update:open', false);
}
async function asJson () {
  downloadJSON(await run());
  emit('update:open', false);
}
async function asCsv () {
  downloadCSV(await run());
  emit('update:open', false);
}
</script>

<template>
  <DialogRoot :open="open" @update:open="(v: boolean) => emit('update:open', v)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/40" />
      <DialogContent
        data-testid="bulk-dialog"
        class="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-5 shadow-lg focus:outline-none"
      >
        <DialogTitle class="text-base font-semibold">
          {{ method?.apiName }} — {{ method?.name }}
        </DialogTitle>
        <DialogDescription class="mt-1 text-xs text-muted-foreground">
          Bulk generate and copy/export.
        </DialogDescription>

        <div class="mt-4 space-y-1">
          <label for="bulk-count" class="text-sm font-medium">How many times?</label>
          <Input
            id="bulk-count"
            v-model="count"
            type="number"
            min="0"
            placeholder="10"
            data-testid="bulk-count"
          />
        </div>

        <div class="mt-5 flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm" data-testid="bulk-json" @click="asJson">
            Download JSON
          </Button>
          <Button variant="outline" size="sm" data-testid="bulk-csv" @click="asCsv">
            Download CSV
          </Button>
          <Button size="sm" data-testid="bulk-generate" @click="generate">
            Generate Bulk
          </Button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
