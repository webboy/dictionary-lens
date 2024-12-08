<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Dictionary Lens
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="brightness_6"
          aria-label="Toggle Theme"
          @click="toggleTheme"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Navigation
        </q-item-label>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('home')"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('history')"
        >
          <q-item-section avatar>
            <q-icon name="history" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Scan History</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="navigateTo('settings')"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Dark } from 'quasar';

defineOptions({
  name: 'MainLayout'
});

const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleTheme() {
  Dark.set(!Dark.isActive);
}

function navigateTo(routeName: string) {
  router.push({ name: routeName });
}
</script>
