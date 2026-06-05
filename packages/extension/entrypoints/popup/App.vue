<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import MethodSearch from '@/components/MethodSearch.vue';
import MethodList from '@/components/MethodList.vue';
import ReviewDialog from '@/components/ReviewDialog.vue';
import BulkDialog from '@/components/BulkDialog.vue';
import ParameterDialog from '@/components/ParameterDialog.vue';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import { useGenerate } from '@/lib/use-generate';
import { FILL_MESSAGE, type FillResponse } from '@/lib/messages';
import type { FakerMethod } from '@/lib/faker/types';

const { generate, showReview } = useGenerate();

// Auto-fill the active tab's form fields (the signature extension feature).
async function fillOutFields () {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    toast.error('No active tab to fill');
    return;
  }
  try {
    const res = (await browser.tabs.sendMessage(tab.id, { type: FILL_MESSAGE })) as FillResponse | undefined;
    const count = res?.count ?? 0;
    if (count > 0) toast.success(`Filled ${count} field${count === 1 ? '' : 's'}`);
    else toast('No fillable fields found on this page');
  } catch {
    toast.error('Could not fill this page', {
      description: 'Open a normal web page (not a browser/internal page) and try again.',
    });
  }
}

// Parameter prompt: methods with params open the parameter dialog; others
// generate immediately.
const paramMethod = ref<FakerMethod | null>(null);
const paramOpen = ref(false);
function handleSelect (method: FakerMethod) {
  if (method.params.length) {
    paramMethod.value = method;
    paramOpen.value = true;
  } else {
    void generate(method);
  }
}
function handleParamGenerate (payload: { method: FakerMethod; options?: Record<string, unknown> }) {
  void generate(payload.method, payload.options);
}

// Bulk generation (v1 "beast mode").
const bulkMethod = ref<FakerMethod | null>(null);
const bulkOpen = ref(false);
function handleBulk (method: FakerMethod) {
  bulkMethod.value = method;
  bulkOpen.value = true;
}
</script>

<template>
  <div
    data-testid="popup-root"
    class="min-w-[400px] bg-brand-page text-foreground"
  >
    <AppHeader />

    <main class="space-y-3 p-3">
      <MethodSearch @select="handleSelect" @bulk="handleBulk" />
      <Button
        class="w-full"
        data-testid="fill-button"
        @click="fillOutFields"
      >
        Fill-out fields
      </Button>
      <MethodList @select="handleSelect" @bulk="handleBulk" />
    </main>

    <ParameterDialog
      v-model:open="paramOpen"
      :method="paramMethod"
      @generate="handleParamGenerate"
    />
    <ReviewDialog v-model:open="showReview" />
    <BulkDialog v-model:open="bulkOpen" :method="bulkMethod" />
    <Toaster
      position="bottom-center"
      :duration="4000"
      rich-colors
      :toast-options="{
        classes: {
          description: 'max-h-48 overflow-auto whitespace-pre-wrap break-words font-mono text-xs',
        },
      }"
    />
  </div>
</template>
