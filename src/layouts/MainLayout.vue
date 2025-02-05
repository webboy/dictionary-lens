//MainLayout.vue
<template>
  <q-layout view="lHh Lpr lff">
    <!-- Header for non-camera pages -->
    <q-header elevated v-if="!isCameraRoute">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Dictionary Lens
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <q-page-container :class="{ 'no-padding': isCameraRoute }">
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer bordered class="bg-primary">
      <q-tabs
        v-model="currentTab"
        class="text-white"
        active-color="white"
        indicator-color="transparent"
        narrow-indicator
        align="justify"
      >
        <q-tab
          name="camera"
          icon="photo_camera"
          label="Camera"
          to="/"
        />
        <q-tab
          name="dictionary"
          icon="menu_book"
          label="Dictionary"
          to="/dictionary"
        />
        <q-tab
          name="settings"
          icon="settings"
          label="Settings"
          to="/settings"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentTab = ref(route.path === '/' ? 'camera' : route.path.slice(1))

// Hide header and adjust padding for camera route
const isCameraRoute = computed(() => route.path === '/')
</script>

<style>
.no-padding {
  padding: 0 !important;
}

/* Make footer tabs more touch-friendly */
.q-tab {
  padding: 12px 4px;
}

/* Ensure the tabs take equal space */
.q-tabs {
  height: 60px;
}

.q-tab__content {
  min-width: 32px;
  font-size: 12px;
}

.q-tab__icon {
  font-size: 24px;
}
</style>
