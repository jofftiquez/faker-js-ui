<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import MethodSearch from '@/components/MethodSearch.vue';
import MethodList from '@/components/MethodList.vue';
import ReviewDialog from '@/components/ReviewDialog.vue';
import BulkDialog from '@/components/BulkDialog.vue';
import { Toaster } from '@/components/ui/sonner';
import { useGenerate } from '@/lib/use-generate';
import type { FakerMethod } from '@/lib/faker/types';

const { generate, showReview } = useGenerate();

// Phase 3: methods with params generate with their defaults. Phase 5 opens the
// parameter dialog for these instead.
function handleSelect (method: FakerMethod) {
  void generate(method);
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
      <MethodList @select="handleSelect" @bulk="handleBulk" />
    </main>

    <ReviewDialog v-model:open="showReview" />
    <BulkDialog v-model:open="bulkOpen" :method="bulkMethod" />
    <Toaster position="bottom-center" :duration="4000" rich-colors />
  </div>
</template>
