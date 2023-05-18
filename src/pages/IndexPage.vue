<template>
  <q-drawer show-if-above v-model="toggleDrawer" side="right" bordered>
    <!-- drawer content -->
  </q-drawer>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12">
        <pre></pre>
        <q-list>
          <template v-for="(action, index) in commonActions" :key="index">
            <q-card
              class="q-mb-sm"
              flat
              clickable
              v-ripple
              @click="generateEmail(action.fakerFn)"
            >
              <q-card-section>
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="action.icon"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{action.name}}</q-item-label>
                  </q-item-section>
                  <!-- <q-item-section avatar>
                    <q-btn
                      icon="settings"
                      flat
                      round
                      dense
                      @click.stop="toggleDrawer"
                    />
                  </q-item-section> -->
                </q-item>
              </q-card-section>
            </q-card>
          </template>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { commonActions } from '../constants/faker';
export default {
  setup () {
    async function generateEmail (fakerFn) {
      const email = await fakerFn();
      console.log(email);
    }

    const drawer = ref(false);
    function toggleDrawer () {
      drawer.value = !drawer.value;
    }

    return {
      commonActions,
      generateEmail,
      drawer,
      toggleDrawer,
    };
  },
};
</script>
