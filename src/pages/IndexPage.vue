<template>
  <!-- <q-drawer show-if-above v-model="toggleDrawer" side="right" bordered>
  </q-drawer> -->
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
                :default-opened="!isMobile"
                :label="apiName"
              >
                <q-list>
                  <div style="height: 250px; overflow: scroll">
                    <template
                      v-for="(action, actionIndex) in group"
                      :key="actionIndex"
                    >
                      <q-item
                        clickable
                        v-ripple
                        @click="invokeFakerFn(action.fakerFn)"
                      >
                        <q-item-section>
                          <q-item-label class="text-weight-regular">{{ action.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </div>
                </q-list>
              </q-expansion-item>
            </q-card>
          </q-list>
        </div>
      </template>

      <!-- <div class="col-xs-12">
        <q-list>
          <template v-for="(group, apiName) in fakerMethodsGroupByApi" :key="apiName">
            <q-item-label header class="text-weight-bold text-black">{{apiName}}</q-item-label>
            <template v-for="(action, actionIndex) in group" :key="actionIndex">
              <q-card
                class="q-mb-sm"
                flat
                clickable
                v-ripple
                @click="invokeFakerFn(action.fakerFn)"
              >
                <q-card-section>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{action.name}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </template>
          </template>
        </q-list>
      </div> -->
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

    const fakerMethodsGroupByApi = fakerMethods.reduce((acc, curr) => {
      const api = curr.apiName;
      if (!acc[api]) {
        acc[api] = [];
      }
      acc[api].push(curr);
      return acc;
    }, {});

    const $q = useQuasar();
    console.warn($q);
    const isMobile = computed(() => $q.screen.lt.md);
    console.warn('isMobile', isMobile.value);

    return {
      fakerMethodsGroupByApi,
      invokeFakerFn,
      drawer,
      toggleDrawer,
      isMobile,
    };
  },
};
</script>
