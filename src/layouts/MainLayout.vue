//MainLayout.vue
<template>
  <q-layout view="lHh Lpr lff">
    <!-- Main Content -->
    <q-page-container :class="{ 'no-padding': isCameraRoute }">
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer bordered elevated class="bg-dark" reveal>
      <div class="row no-wrap justify-evenly q-py-sm">
        <q-btn
          flat
          :to="{ path: '/' }"
          :class="{ 'text-warning': route.name === 'home', 'text-primary': route.name !== 'home' }"
        >
          <div class="column items-center">
            <q-icon name="photo_camera" size="24px" />
            <div class="text-caption q-mt-xs">Camera</div>
          </div>
        </q-btn>

        <q-btn
          flat
          :to="{ path: '/dictionary' }"
          :class="{ 'text-warning': route.name === 'dictionary', 'text-primary': route.name !== 'dictionary' }"
        >
          <div class="column items-center">
            <q-icon name="menu_book" size="24px" />
            <div class="text-caption q-mt-xs">Dictionary</div>
          </div>
        </q-btn>

        <q-btn
          flat
          :to="{ path: '/settings' }"
          :class="{ 'text-warning': route.name === 'settings', 'text-primary': route.name !== 'settings' }"
        >
          <div class="column items-center">
            <q-icon name="settings" size="24px" />
            <div class="text-caption q-mt-xs">Settings</div>
          </div>
        </q-btn>

        <q-btn
          flat
          :class="{ 'text-warning': isInfoRoute, 'text-primary': !isInfoRoute }"
        >
          <div class="column items-center">
            <q-icon name="menu" size="24px" />
            <div class="text-caption q-mt-xs">More</div>
          </div>

          <q-menu anchor="top right" self="bottom right">
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup :to="{ name: 'about' }">
                <q-item-section>About Dictionary Lens</q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="{ name: 'privacy' }">
                <q-item-section>Privacy Policy</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Hide header and adjust padding for camera route
const isCameraRoute = computed(() => route.path === '/')

// Check if current route is about or privacy
const isInfoRoute = computed(() =>
  route.path === '/about' || route.path === '/privacy'
)
</script>

<style>
.no-padding {
  padding: 0 !important;
}
</style>
