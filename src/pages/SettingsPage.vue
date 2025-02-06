//SettingsPage.vue
<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-pb-md">Settings</div>

    <!-- Camera Settings -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Camera</div>
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Camera Type</q-item-label>
            <q-item-label caption>Select which camera to use</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select
              v-model="cameraType"
              :options="cameraOptions"
              dense
              options-dense
              borderless
              emit-value
              map-options
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <!-- Language Settings -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Language</div>
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Target Language</q-item-label>
            <q-item-label caption>Language for translations</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-select
              v-model="language"
              :options="languageOptions"
              dense
              options-dense
              borderless
              emit-value
              map-options
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <!-- App Info -->
    <div class="text-center q-pt-xl">
      <div class="text-caption text-grey-7">Dictionary Lens v{{ AppVersion }}</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from 'stores/settingsStore'

const settingsStore = useSettingsStore()

const AppVersion = import.meta.env.VITE_APP_VERSION

// Camera settings
const cameraType = computed({
  get: () => settingsStore.cameraType,
  set: (value: 'front' | 'back') => settingsStore.setCameraType(value)
})

const cameraOptions = [
  { label: 'Back Camera', value: 'back' },
  { label: 'Front Camera', value: 'front' }
]

// Language settings
const language = computed({
  get: () => settingsStore.language,
  set: (value: string) => settingsStore.setLanguage(value)
})

const languageOptions = [
  { label: 'German', value: 'de' }
  // Add more languages here when supported
]
</script>

<style scoped>
</style>
