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

    <!-- Detection Service Settings -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Detection Service</div>
        <div class="text-caption q-mb-sm">Some detection services require <strong class="text-negative">API KEY</strong> parameter.
          You can obtain it by checking their respective developer's console.</div>
        <q-item v-for="service in availableServices" :key="service.id" tag="label">
          <q-item-section avatar>
            <q-img :src="service.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ service.name }}</q-item-label>
            <q-item-label caption>{{ service.description }}</q-item-label>

            <!-- API Key Input for services that require it -->
            <div v-if="service.requiresApiKey" class="q-mt-sm">
              <q-input
                v-model="apiKeys[service.id]"
                dense
                outlined
                :type="showApiKey[service.id] ? 'text' : 'password'"
                label="API Key"
                @update:model-value="value => updateApiKey(service.id, value?.toString() || '')"
                :color="apiKeys[service.id] ? 'primary' : 'negative'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showApiKey[service.id] ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="toggleApiKeyVisibility(service.id)"
                  />
                </template>
              </q-input>
            </div>
            <!-- Endpoint Input for services that require it -->
            <div v-if="service.requiresEndpoint" class="q-mt-sm">
              <q-input
                v-model="apiEndpoints[service.id]"
                dense
                outlined
                type="text"
                label="API Endpoint"
                @update:model-value="value => updateEndpoint(service.id, value?.toString() || '')"
                :color="apiEndpoints[service.id] ? 'primary' : 'negative'"
              />
            </div>
          </q-item-section>
          <q-item-section side>
            <q-radio
              v-model="detectionService"
              :val="service.id"
              keep-color
              :color="(service.requiresApiKey && !apiKeys[service.id]) ? 'negative' : 'primary'"
              :disable="(service.requiresApiKey && !apiKeys[service.id])"
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
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingsStore } from 'stores/settingsStore'
import { DetectionServiceFactory } from 'src/services/detection/DetectionServiceFactory'
import type { DetectionServiceType } from 'src/services/detection/DetectionServiceFactory'

const settingsStore = useSettingsStore()

// Camera settings
const cameraType = computed({
  get: () => settingsStore.cameraType,
  set: (value: 'front' | 'back') => settingsStore.setCameraType(value)
})

const cameraOptions = [
  { label: 'Back Camera', value: 'back' },
  { label: 'Front Camera', value: 'front' }
]

// Detection service settings
const detectionService = computed({
  get: () => settingsStore.detectionService,
  set: (value: DetectionServiceType) => settingsStore.setDetectionService(value)
})

const availableServices = DetectionServiceFactory.getAvailableServices()

// API Keys management
const apiKeys = ref<Record<string, string>>({})
const apiEndpoints = ref<Record<string, string>>({})
const showApiKey = ref<Record<string, boolean>>({})


// Initialize API keys from store
availableServices.forEach(service => {
  if (service.requiresApiKey) {
    apiKeys.value[service.id] = settingsStore.getApiKey(service.id) || ''
    showApiKey.value[service.id] = false
  }
  if (service.requiresEndpoint) {
    apiEndpoints.value[service.id] = settingsStore.getEndpoint(service.id) || ''
  }
})

function updateApiKey(service: DetectionServiceType, value: string) {
  settingsStore.setApiKey(service, value)
}

function updateEndpoint(service: DetectionServiceType, value: string) {
  settingsStore.setEndpoint(service, value)
}

function toggleApiKeyVisibility(service: DetectionServiceType) {
  showApiKey.value[service] = !showApiKey.value[service]
}

// Language settings
const language = computed({
  get: () => settingsStore.language,
  set: (value: string) => settingsStore.setLanguage(value)
})

const languageOptions = [
  { label: 'German', value: 'de' }
]
</script>
