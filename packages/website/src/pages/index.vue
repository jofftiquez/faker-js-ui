<template>
  <generic-panel>
    <div class="h-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center md:mt-32">
      <div class="order-2 md:order-1 text-center md:text-start">
        <h1 data-aos="fade-down" class="text-5xl md:text-8xl font-bold pb-10 text-transparent bg-clip-text bg-gradient-to-br from-[#843bd7] from-0% to-[#FC39F2] to-100%">Faker.js UI</h1>
        <p data-aos="fade-down" data-aos-delay="200" class="text-2xl mb-10">
          Use Faker.js UI to easiliy generate fake (but realistic) data for testing and development using
          <a class="text-purple-500" href="https://fakerjs.dev/?ref=https://fakerjsui.org" target="_blank">Faker.js</a>.
        </p>
        <p data-aos="fade-down" data-aos-delay="400" class="text-lg mb-10 h-[100px]">
          <i>
            "{{fakeData}}"
          </i>
        </p>
        <div class="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5">
          <a
            href="https://app.fakerjsui.org?ref=https://fakerjsui.org"
            target="_blank"
            data-aos="fade-down"
            data-aos-delay="400"
            class="btn btn-primary"
          >
            Start Faking 👀
          </a>
          <div class="tooltip" data-tip="Now available Chrome Extension!">
            <a
              data-aos="fade-down"
              data-aos-delay="600"
              class="btn btn-primary btn-outline"
              href="https://chrome.google.com/webstore/detail/fakerjs-ui/onahjokmphbfmdihclgeehajfnpkpaja"
              target="_blank"
            >
              Download <i class="lab la-chrome text-2xl ml-2"></i>
            </a>
          </div>
        </div>
      </div>
      <div data-aos="fade-down" class="flex justify-center md:justify-end order-1 md:order-2 mt-10 md:mt-0">
        <img class="w-[200px] md:w-[300px]" src="../assets/images/faker-js-ui-logo.webp" alt="Faker.js UI Logo">
      </div>
    </div>
  </generic-panel>

  <generic-panel class="mt-20 pb-20">
    <footer class="footer footer-center">
      <div class="items-center grid-flow-col">
        <i class="las la-code text-2xl"></i>
        <span class="text-lg">Made with <i class="las la-heart text-red-500"></i> by <a class="text-primary" href="https://twitter.com/jrtiquez" target="_blank">Joff Tiquez</a></span>
      </div>
      <div class="grid-flow-col">
        <a href="https://www.producthunt.com/posts/faker-js-ui?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-faker&#0045;js&#0045;ui" target="_blank">
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=396136&theme=neutral"
            alt="Faker&#0046;js&#0032;UI - Simple&#0032;and&#0032;intuitive&#0032;UI&#0032;for&#0032;Faker&#0046;js | Product Hunt"
            style="height: 47px;" height="47"
          />
        </a>
        <a href="https://github.com/jofftiquez/faker-js-ui">
          <i class="lab la-github text-5xl"></i>
        </a>
      </div>
    </footer>
  </generic-panel>
</template>

<script>
import { useHead } from '#app';
import { definePageMeta } from '#imports';
import { faker } from '@faker-js/faker';
import GenericPanel from '~/components/commons/GenericPanel';
import ogBanner from '../assets/images/fakerjsui-og-banner.webp';

export default {
  components: {
    GenericPanel,
  },
  setup () {
    definePageMeta({
      layout: 'default',
    });

    useHead({
      title: 'Faker.js UI by Joff Tiquez',
      description: 'Use Faker.js UI to easily generate fake (but realistic) data for testing and development using Faker.js',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
      meta: [
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: ogBanner,
        },
      ],
    });

    const fakeData = ref(faker.hacker.phrase());
    function generateFakePhrase () {
      setInterval(() => {
        fakeData.value = faker.hacker.phrase();
      }, 3000);
    }

    onMounted(() => {
      generateFakePhrase();
    });

    return {
      fakeData,
    };
  },
};
</script>

<style scoped>
.panel-blue-gradient {
  background: linear-gradient(135.54deg, #03486A 4.52%, #002B4A 65.48%, #00104A 120.82%);
}

.search-card {
  background: linear-gradient(167.97deg, #004770 8.78%, rgba(0, 35, 88, 0.45) 108.57%);
}

</style>
