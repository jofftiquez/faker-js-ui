<template>
  <div class="parameter-field q-mb-md">
    <!-- Number Input -->
    <q-input
      v-if="param.type === 'number'"
      v-model.number="localValue"
      :label="param.label"
      type="number"
      outlined
      dense
      :hint="param.hint"
      @update:model-value="emitValue"
    />

    <!-- Text Input -->
    <q-input
      v-else-if="param.type === 'text'"
      v-model="localValue"
      :label="param.label"
      outlined
      dense
      :hint="param.hint"
      @update:model-value="emitValue"
    />

    <!-- Select Input -->
    <q-select
      v-else-if="param.type === 'select'"
      v-model="localValue"
      :label="param.label"
      :options="param.options"
      outlined
      dense
      emit-value
      map-options
      :hint="param.hint"
      @update:model-value="emitValue"
    />

    <!-- Boolean Toggle -->
    <q-toggle
      v-else-if="param.type === 'boolean'"
      v-model="localValue"
      :label="param.label"
      @update:model-value="emitValue"
    />

    <!-- Date Input -->
    <q-input
      v-else-if="param.type === 'date'"
      v-model="localValue"
      :label="param.label"
      outlined
      dense
      :hint="param.hint"
      @update:model-value="emitValue"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="localValue" mask="YYYY-MM-DD" @update:model-value="emitValue">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- Fallback Text Input -->
    <q-input
      v-else
      v-model="localValue"
      :label="param.label"
      outlined
      dense
      :hint="param.hint"
      @update:model-value="emitValue"
    />
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
  name: 'ParameterField',
  props: {
    param: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean, Date],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const localValue = ref(props.modelValue ?? props.param.default);

    onMounted(() => {
      if (localValue.value === null || localValue.value === undefined) {
        localValue.value = props.param.default;
      }
    });

    watch(() => props.modelValue, (newVal) => {
      if (newVal !== undefined) {
        localValue.value = newVal;
      }
    });

    const emitValue = () => {
      emit('update:modelValue', localValue.value);
    };

    return {
      localValue,
      emitValue,
    };
  },
};
</script>

<style scoped>
.parameter-field {
  width: 100%;
}
</style>
