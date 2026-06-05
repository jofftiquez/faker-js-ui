<script setup lang="ts">
import { computed } from 'vue';
import { SwitchRoot, SwitchThumb } from 'reka-ui';
import { Input } from '@/components/ui/input';
import type { MethodParam } from '@/lib/faker/types';

const props = defineProps<{ param: MethodParam }>();
const model = defineModel<unknown>();

const id = computed(() => `param-${props.param.name}`);
</script>

<template>
  <div class="space-y-1">
    <label v-if="param.type !== 'boolean'" :for="id" class="text-xs font-medium">
      {{ param.label }}
    </label>

    <Input
      v-if="param.type === 'number'"
      :id="id"
      type="number"
      :data-testid="`pf-${param.name}`"
      :model-value="(model as number)"
      @update:model-value="model = $event === '' ? undefined : Number($event)"
    />
    <Input
      v-else-if="param.type === 'text'"
      :id="id"
      type="text"
      :data-testid="`pf-${param.name}`"
      :model-value="(model as string)"
      @update:model-value="model = String($event)"
    />
    <Input
      v-else-if="param.type === 'date'"
      :id="id"
      type="date"
      :data-testid="`pf-${param.name}`"
      :model-value="(model as string)"
      @update:model-value="model = String($event)"
    />

    <select
      v-else-if="param.type === 'select'"
      :id="id"
      :data-testid="`pf-${param.name}`"
      class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      :value="model"
      @change="model = ($event.target as HTMLSelectElement).value"
    >
      <option v-for="o in param.options" :key="o.value" :value="o.value">
        {{ o.label }}
      </option>
    </select>

    <label
      v-else-if="param.type === 'boolean'"
      class="flex items-center gap-2 text-sm font-medium"
    >
      <SwitchRoot
        :data-testid="`pf-${param.name}`"
        :model-value="(model as boolean)"
        class="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-input transition-colors data-[state=checked]:bg-primary"
        @update:model-value="model = $event"
      >
        <SwitchThumb
          class="pointer-events-none block size-4 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[18px]"
        />
      </SwitchRoot>
      {{ param.label }}
    </label>

    <p v-if="param.hint" class="text-[11px] text-muted-foreground">
      {{ param.hint }}
    </p>
  </div>
</template>
