<template>
  <q-page padding style="min-width: 400px">
    <div class="row">
      <div class="col-xs-12 q-pa-sm">
        <q-select
          v-model="searchModel"
          input-debounce="0"
          label="Search Faker Method"
          style="background-color: white;"
          placeholder="Full Name, Email, Avatar, etc."
          outlined
          hide-selected
          return-object
          use-input
          autofocus
          :options="options"
          @filter="filterFn"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
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
import { computed, ref, watch } from 'vue';
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
      // TODO: implement beast mode
      // utilize each method's parameters
      console.warn('Beast Mode!', action);
    }

    const searchModel = ref(null);
    const stringOptions = fakerMethods.map((method) => {
      return {
        label: method.searchNeedle,
        value: method,
      };
    });
    const options = ref();
    function filterFn (val, update) {
      if (val === '') {
        update(() => {
          options.value = stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = stringOptions.filter(v => {
          return v?.value?.searchNeedle?.toLowerCase().indexOf(needle) > -1;
        });
      });
    }
    watch(searchModel, (val) => {
      if (!val) return;
      invokeFakerFn(val.value.fakerFn);
    });

    return {
      fakerMethodsGroupByApi,
      invokeFakerFn,
      drawer,
      toggleDrawer,
      isMobile,
      openBeastMode,
      searchModel,
      options,
      filterFn,
    };
  },
};
</script>
