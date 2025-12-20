<template>
  <generic-panel>
    <div class="flex flex-col justify-center items-center pt-12">
      <span v-if="error.statusCode === 404" class="text-6xl">🤷‍♂️</span>
      <template v-if="error.statusCode === 404">
        <h1 class="text-8xl text-bold text-heading font-primary">{{error.statusCode}}</h1>
        <p class="font-general">{{error.message}}</p>
      </template>
      <nuxt-link href="/" as="button" class="mt-8 text-primary hover:text-primary border border-primary focus:ring-4 focus:outline-none focus:ring-red-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Go back 🏠
      </nuxt-link>

    </div>
  </generic-panel>
</template>

<script>
import GenericPanel from './components/commons/GenericPanel.vue';
export default {
  components: {
    GenericPanel,
  },
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  setup () {

  },
};
</script>
