<template>
  <q-dialog v-model="beastModeDialog" persistent>
    <q-card style="width: 700px;">
      <q-toolbar>
        <q-toolbar-title>{{selectedAction.apiName}} - {{selectedAction.name}}</q-toolbar-title>
        <q-space/>
        <q-btn
          flat
          round
          icon="close"
          @click="beastModeDialog = false"
        />
      </q-toolbar>
      <q-separator/>
      <q-card-section>
        <q-form ref="beastModeFormRef" @submit.prevent="beastModeAction()">
          <q-input
            v-model="bulkMultiplier"
            label="How many times?"
            placeholder="10"
            type="number"
            hint="Press [Enter] to generate"
            min="0"
            autofocus
            outlined
            :rules="[v => !!v || 'This is required', v => v >= 0 || 'Must be greater than 0']"
          >
            <template v-slot:append>
              <q-btn
                label="Generate Bulk"
                color="primary"
                flat
                no-caps
                @click="beastModeAction()"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- TODO: implement history dialog -->
  <!-- <q-dialog v-model="historyDialog">
  </q-dialog> -->

  <q-dialog v-model="firstGenerateDialog">
    <q-card>
      <q-toolbar>
        <q-toolbar-title>We love feedback! 💜</q-toolbar-title>
        <q-space/>
        <q-btn
          flat
          round
          icon="close"
          @click="firstGenerateDialog = false"
        />
      </q-toolbar>
      <q-separator/>
      <q-card-section>
        <p class="text-body1">Did you like this tool? Perhaps looking for something specific? Or maybe you have some suggestions?</p>
        <p class="text-body1">Let us know what you think about our tool by giving us a review in Product Hunt, thank you so much.</p>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <q-space />
        <q-btn
          label="Give us a review"
          color="primary"
          href="https://www.producthunt.com/products/faker-js-ui/reviews/new"
          target="_blank"
          no-caps
          unelevated
        />
        <q-btn
          label="I'll do it later"
          color="negative"
          no-caps
          outline
          @click="firstGenerateDialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page padding style="min-width: 400px">
    <div class="row">
      <div class="col-xs-12 q-pa-sm">
        <q-select
          ref="searchSelectRef"
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

          <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <!-- TODO: remove condition when full bex feature is done -->
            <q-item-section v-if="!isBex" avatar>
              <q-btn
                icon="more_vert"
                round
                flat
                @click.stop="searchSelectRef.hidePopup(); openBeastMode(scope.opt.value)"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        </q-select>
      </div>
    </div>

    <div class="column" v-if="isBex">
      <div class="col-xs-12  q-pa-sm">
        <q-btn
          label="Fill-out fields (Alpha)"
          color="primary"
          class="full-width"
          unelevated
          no-caps
          @click="fillOutFields"
        >
          <q-tooltip bottom>
            Might not fully work yet, but we're working on it!
          </q-tooltip>
        </q-btn>
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
                        @click="invokeFakerFn(action)"
                      >
                        <q-item-section>
                          <q-item-label class="text-weight-regular">{{ action.name }}</q-item-label>
                        </q-item-section>
                        <!-- TODO: remove condition when full bex feature is done -->
                        <q-item-section v-if="!isBex" avatar>
                          <q-btn
                            icon="more_vert"
                            round
                            flat
                            @click.stop="openBeastMode(action)"
                          />
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
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          icon="reviews"
          color="primary"
          fab
          @click="firstGenerateDialog = true"
        >
          <q-tooltip>
            Give us a review
          </q-tooltip>
        </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { fakerMethods } from '../constants/faker';
import { useQuasar, copyToClipboard, Notify } from 'quasar';

export default {
  setup () {
    const $q = useQuasar();
    const isMobile = computed(() => $q.screen.lt.md);

    async function invokeFakerFn ({ name, fakerFn }) {
      const result = await fakerFn();

      await postActions({ name, result });
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

    // Beast Mode
    const selectedAction = ref({});
    const beastModeDialog = ref(false);
    function openBeastMode (action) {
      beastModeDialog.value = true;
      selectedAction.value = action;
    }
    const beastModeFormRef = ref(null);
    const bulkMultiplier = ref(10);
    async function beastModeAction () {
      if (!await beastModeFormRef.value.validate()) {
        return;
      }
      const { fakerFn } = selectedAction.value;
      let i = 0;
      const finalResult = [];
      do {
        const result = await fakerFn();

        finalResult.push(result);
        i++;
      } while (i < bulkMultiplier.value);
      await postActions({ name: selectedAction.value.name, result: finalResult });
      beastModeDialog.value = false;
    }

    // Search
    const searchSelectRef = ref(null);
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
      invokeFakerFn(val.value);
    });

    const firstGenerateDialog = ref(false);
    async function postActions ({ name, result }) {
      if (typeof result === 'object') {
        result = JSON.stringify(result, null, 2);
      }

      await copyToClipboard(result);
      Notify.create({
        html: true,
        message: `
          <div style="display: flex; flex-direction: column; justify-content: center;">
            <div class="text-subtitle1"><b>${name}</b> copied to clipboard!</div>
            <div>
              <q-separator/>
            </div>
            <div style="max-height: 200px; overflow: scroll;">
              <pre style="border-left: 2px solid grey; padding-left: 5px;">${result}</pre>
            </div>
          </div>
        `,
      });
      const firstGenerate = window.localStorage.getItem('firstGenerate');
      if (!firstGenerate) {
        window.localStorage.setItem('firstGenerate', true);
        setTimeout(() => {
          firstGenerateDialog.value = true;
        }, 2000);
      }
    }

    // TODO: implement later
    const rightDrawerOpen = ref(false);

    // TODO: Bex
    const isBex = computed(() => $q.bex);
    async function fillOutFields () {
      console.warn('fakerMethods', fakerMethods);
      $q.bex.send('fakerjsui.fillout', fakerMethods);
    }

    if (isBex.value) {
      $q.bex.on('fakerjsui.domfields', (fields) => {
        console.warn('fakerjsui.domfields', fields);
      });
    }

    return {
      fakerMethodsGroupByApi,
      invokeFakerFn,
      drawer,
      toggleDrawer,
      isMobile,
      openBeastMode,
      searchSelectRef,
      searchModel,
      options,
      filterFn,
      selectedAction,
      beastModeDialog,
      bulkMultiplier,
      beastModeAction,
      beastModeFormRef,
      rightDrawerOpen,
      firstGenerateDialog,
      fillOutFields,
      isBex,
    };
  },
};
</script>
