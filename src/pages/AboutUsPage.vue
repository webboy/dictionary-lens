//AboutUs.vue
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h4 class="text-h4 q-mb-md text-primary">About Dictionary Lens</h4>

      <div class="text-body1 q-mb-lg">
        Dictionary Lens is an innovative language learning tool that combines computer vision with artificial intelligence to help you learn new words in their real-world context.
      </div>

      <h5 class="text-h5 q-mb-md text-primary">Key Features</h5>

      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold">Real-Time Object Detection</q-item-label>
            <q-item-label caption>
              Point your camera at any object to instantly identify and learn its name in your target language.
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold">AI-Powered Translations</q-item-label>
            <q-item-label caption>
              Get accurate translations powered by advanced AI technology, ensuring you learn the most natural and contextually appropriate words.
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold">Personal Dictionary</q-item-label>
            <q-item-label caption>
              Save translations to your personal dictionary for quick reference and review. All data is stored locally on your device.
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold">Example Sentences</q-item-label>
            <q-item-label caption>
              Learn how to use words in context with AI-generated example sentences that demonstrate proper usage.
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold">Privacy-Focused</q-item-label>
            <q-item-label caption>
              Your privacy matters. All processing is done on-device, and no personal data is collected or stored on external servers.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="q-mt-xl">
        <h5 class="text-h5 q-mb-md text-primary">Available Detection Services</h5>
        <div class="row q-col-gutter-md q-mb-lg">
          <div v-for="service in detectionServices" :key="service.id" class="col-6 col-sm-4 col-md-3">
            <q-card class="service-card" :class="{ 'service-unavailable': !service.isAvailable }">
              <q-card-section class="text-center">
                <div class="service-icon q-mb-sm">
                  <img :src="service.icon" :alt="service.name" height="48">
                </div>
                <div class="text-subtitle2">{{ service.name }}</div>
                <q-badge :color="service.isAvailable ? 'positive' : 'red'" class="q-mt-xs">
                  {{ service.isAvailable ? 'Available' : 'Unavailable' }}
                </q-badge>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <div class="q-mt-xl">
        <h5 class="text-h5 q-mb-md text-primary">Technology</h5>
        <p class="text-body1">
          Dictionary Lens utilizes cutting-edge technologies for accurate object detection and natural language processing:
        </p>
        <q-list bordered>
          <q-item v-for="service in detectionServices" :key="service.id"
                  :class="{ 'bg-grey-2': !service.isAvailable }">
            <q-item-section avatar>
              <img :src="service.icon" :alt="service.name" height="32">
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ service.name }}</q-item-label>
              <q-item-label caption>{{ service.description }}</q-item-label>
              <q-item-label :class="(service.isAvailable ? 'text-grey' : 'text-red')" caption v-if="service.requiresApiKey || service.requiresEndpoint">
                <q-icon name="info" size="xs" class="q-mr-xs"/>
                Requires configuration:
                <span v-if="service.requiresApiKey">API Key</span>
                <span v-if="service.requiresApiKey && service.requiresEndpoint">, </span>
                <span v-if="service.requiresEndpoint">Endpoint</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip :color="service.isAvailable ? 'positive' : 'grey'" text-color="white" size="sm">
                {{ service.isAvailable ? 'Active' : 'Inactive' }}
              </q-chip>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="chat" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>OpenAI</q-item-label>
              <q-item-label caption>Natural language processing and translations</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-mt-xl">
        <h5 class="text-h5 q-mb-md text-primary">Contact</h5>
        <p class="text-body1">
          Have questions or suggestions? Contact us at:
          <a href="mailto:nemanjam@greenlinetrading.co.uk" class="text-primary">
            nemanjam@greenlinetrading.co.uk
          </a>
        </p>
      </div>

      <div class="text-caption q-mt-xl text-grey-7">
        Version {{ appVersion }}
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DetectionServiceFactory, type DetectionServiceType } from '../services/detection/DetectionServiceFactory'

interface ServiceInfo {
  id: DetectionServiceType
  name: string
  description: string
  requiresApiKey: boolean
  requiresEndpoint: boolean
  icon: string
  isAvailable: boolean
}

const appVersion = import.meta.env.VITE_APP_VERSION as string

const detectionServices = ref<ServiceInfo[]>([])

onMounted(() => {
  try {
    // Get all available services from the factory
    const services = DetectionServiceFactory.getAvailableServices()

    // Map services and check their availability
    detectionServices.value = services.map(service => {
      try {
        // Try to instantiate the service to check availability
        DetectionServiceFactory.getService(service.id)
        return { ...service, isAvailable: true }
      } catch (error) {
        console.error(`Service ${service.id} unavailable:`, error)
        return { ...service, isAvailable: false }
      }
    })
  } catch (error) {
    console.error('Error initializing detection services:', error)
  }
})
</script>

<style scoped>
.service-card {
  transition: all 0.3s ease;
}

.service-unavailable {
  opacity: 0.7;
}

.service-card:hover {
  transform: translateY(-2px);
}

.service-icon {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon img {
  max-height: 100%;
  width: auto;
}
</style>
