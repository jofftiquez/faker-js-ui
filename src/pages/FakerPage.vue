<template>
  <q-page padding style="min-width: 400px">
    <div class="row row-wrap">
      <template
        v-for="(group, apiName) in fakerMethodsGroupByApi"
        :key="apiName"
      >
        <div class="col-xs-12 col-md-4 col-lg-3 q-pa-sm">
          <q-list>
            <q-card flat clickable>
              <q-expansion-item
                class="text-weight-medium text-subtitle1"
                default-opened
                :label="apiName"
              >
                <!-- :default-opened="!isMobile" -->
                <q-list>
                  <div style="height: 250px; overflow: scroll">
                    <template
                      v-for="(action, actionIndex) in group"
                      :key="actionIndex"
                    >
                      <q-separator/>
                      <q-item
                        clickable
                        v-ripple
                        @click="invokeFakerFn(action.fakerFn)"
                      >
                        <q-item-section>
                          <q-item-label class="text-weight-regular">{{ action.name }}</q-item-label>
                        </q-item-section>
                        <!-- <q-item-section avatar>
                          <q-btn
                            icon="chevron_right"
                            round
                            flat
                            @click.stop="openBeastMode(action)"
                          />
                        </q-item-section> -->
                      </q-item>
                    </template>
                  </div>
                </q-list>
              </q-expansion-item>
            </q-card>
          </q-list>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import { computed, ref } from 'vue';
import { fakerMethods } from '../constants/faker';
import { useQuasar } from 'quasar';
export default {
  setup () {
    async function invokeFakerFn (fakerFn) {
      const result = await fakerFn();
      console.log(result);
    }

    const drawer = ref(false);
    function toggleDrawer () {
      drawer.value = !drawer.value;
    }

    const fakerMethodsGroupByApi = computed(() => {
      return fakerMethods.reduce((acc, curr) => {
        const api = curr.apiName;
        if (!acc[api]) {
          acc[api] = [];
        }
        acc[api].push(curr);
        return acc;
      }, {});
    });

    const $q = useQuasar();
    const isMobile = computed(() => $q.screen.lt.md);

    function openBeastMode (action) {
      console.warn('Beast Mode!', action);
    }

    function searchFakerMethods (searchTerm) {
      return fakerMethods.filter((method) => {
        return method.searchNeedle.test(searchTerm);
      });
    }

    return {
      fakerMethodsGroupByApi,
      invokeFakerFn,
      drawer,
      toggleDrawer,
      isMobile,
      openBeastMode,
      searchFakerMethods,
    };
  },
};
</script>
