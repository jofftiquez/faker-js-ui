<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 400px; max-width: 500px;">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          <span class="text-weight-bold">{{ method?.apiName }}</span>
          <span class="text-weight-light">.{{ method?.name }}()</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>

      <q-card-section>
        <div class="text-subtitle2 q-mb-md text-grey-7">
          Configure parameters for this method (all optional)
        </div>

        <div v-if="method?.params?.length">
          <ParameterField
            v-for="param in method.params"
            :key="param.name"
            :param="param"
            v-model="paramValues[param.name]"
          />
        </div>
        <div v-else class="text-grey-6 text-center q-pa-md">
          No configurable parameters for this method.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          flat
          label="Use Defaults"
          color="grey-7"
          @click="generateWithDefaults"
        />
        <q-btn
          unelevated
          label="Generate"
          color="primary"
          @click="generate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch, computed } from 'vue';
import ParameterField from './ParameterField.vue';

export default {
  name: 'ParameterDialog',
  components: {
    ParameterField,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    method: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:modelValue', 'generate'],
  setup (props, { emit }) {
    const show = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });

    const paramValues = ref({});

    // Initialize param values when method changes
    watch(() => props.method, (newMethod) => {
      if (newMethod?.params) {
        paramValues.value = {};
        newMethod.params.forEach(param => {
          paramValues.value[param.name] = param.default;
        });
      }
    }, { immediate: true });

    const close = () => {
      show.value = false;
    };

    const buildOptions = () => {
      if (!props.method?.params?.length) {
        return undefined;
      }

      const options = {};
      let hasValues = false;

      props.method.params.forEach(param => {
        const value = paramValues.value[param.name];
        // Only include non-default values or all values if user interacted
        if (value !== undefined && value !== null && value !== '') {
          options[param.name] = value;
          hasValues = true;
        }
      });

      return hasValues ? options : undefined;
    };

    const generate = () => {
      const options = buildOptions();
      emit('generate', {
        method: props.method,
        options,
      });
      close();
    };

    const generateWithDefaults = () => {
      emit('generate', {
        method: props.method,
        options: undefined,
      });
      close();
    };

    return {
      show,
      paramValues,
      close,
      generate,
      generateWithDefaults,
    };
  },
};
</script>
