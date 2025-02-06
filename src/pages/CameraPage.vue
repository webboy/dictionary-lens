//CameraPage.vue
<template>
  <q-page class="camera-page">
    <!-- Camera View -->
    <div class="camera-container">
      <video
        ref="videoRef"
        class="camera-feed"
        autoplay
        playsinline
        muted
      />

      <!-- Detection overlay -->
      <detection-overlay
        v-if="showDetections"
        :image="capturedImage"
        :detections="detections"
        @word-selected="onWordSelected"
        @close="showDetections = false"
      />
    </div>

    <!-- Camera Controls -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" class="full-width">
      <div class="flex justify-center">
        <q-btn
          round
          size="lg"
          color="primary"
          icon="photo_camera"
          :disable="isLoading"
          @click="captureImage"
        />
      </div>
    </q-page-sticky>

    <!-- Translation Dialog -->
    <translation-dialog
      v-model:open="showTranslation"
      :word="selectedWord"
      :translation="translation"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useSettingsStore } from 'stores/settingsStore'
import DetectionOverlay from 'components/DetectionOverlay.vue'
import TranslationDialog from 'components/TranslationDialog.vue'
import { detectionService } from 'src/services/detection/DetectionService'
import { databaseService} from 'src/services/database/DatabaseService'
import { translationService } from 'src/services/translation/TranslationService'
import type { Detection } from 'src/types'
import { Capacitor } from '@capacitor/core'
import { Camera } from '@capacitor/camera'

// Component refs
const videoRef = ref<HTMLVideoElement | null>(null)

// State
const isLoading = ref(false)
const stream = ref<MediaStream | null>(null)
const showDetections = ref(false)
const detections = ref<Detection[]>([])
const capturedImage = ref('')
const showTranslation = ref(false)
const selectedWord = ref('')
const translation = ref<string | null>(null)

// Store
const settingsStore = useSettingsStore()
const $q = useQuasar()

// Check permissions
async function checkPermissions() {
  if (Capacitor.isNativePlatform()) {
    const status = await Camera.requestPermissions();
    if (status.camera !== 'granted') {
      console.error('Camera permission not granted');
      return false;
    }
  }
  return true;
}

// Camera setup
async function setupCamera(): Promise<void> {

  try {
    $q.loading.show({
      message: 'Accessing camera...',
      backgroundColor: 'black'
    })

    // Check permissions
    const hasPermissions = await checkPermissions()
    if (!hasPermissions) {
      throw new Error('Camera permission not granted')
    }

    const constraints = {
      video: {
        facingMode: settingsStore.cameraType === 'front' ? 'user' : 'environment',
      },
      audio: false,
    }

    stream.value = await navigator.mediaDevices.getUserMedia(constraints)

    if (videoRef.value) {
      videoRef.value.srcObject = stream.value
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    $q.notify({
      type: 'negative',
      message: error instanceof Error ? error.message : 'Could not access camera. Please check permissions.',
    })
  } finally {
    $q.loading.hide()
  }
}

// Image capture
async function captureImage(): Promise<void> {
  if (!videoRef.value || isLoading.value) return

  $q.loading.show({
    message: 'Capturing image...',
    backgroundColor: 'black'
  })

  try {
    // Create a canvas to capture the image
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.value.videoWidth
    canvas.height = videoRef.value.videoHeight
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Could not get canvas context')
    }

    // Draw the current frame to canvas
    ctx.drawImage(videoRef.value, 0, 0)

    // Convert to data URL
    capturedImage.value = canvas.toDataURL('image/jpeg')

    // Detect objects in the image
    detections.value = await detectionService.detect(capturedImage.value)
    showDetections.value = true
  } catch (error) {
    console.error('Error capturing image:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to detect objects in the image.',
    })
  } finally {
    $q.loading.hide()
  }
}

// Word selection handler
async function onWordSelected(word: string): Promise<void> {
  $q.loading.show({
    message: 'Searching for translation...',
    backgroundColor: 'black'
  })
  try {

    selectedWord.value = word

    // Check if we already have this translation
    const existingTranslation = await databaseService.getTranslation(word, settingsStore.language)

    if (existingTranslation) {
      translation.value = existingTranslation.translation
    } else {
      // Get new translation
      const translationResult = await translationService.translateToGerman(word)

      // Store in database
      await databaseService.saveWord({
        sourceWord: word,
        language: settingsStore.language,
        targetWord: translationResult.word,
        translation: JSON.stringify(translationResult),
        capturedAt: new Date()
      })

      translation.value = JSON.stringify(translationResult)
    }

    showTranslation.value = true
  } catch (error) {
    console.error('Error getting translation:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to get translation'
    })
  } finally {
    $q.loading.hide()
  }
}

// Lifecycle hooks
onMounted(async () => {
  await setupCamera()
})

onUnmounted(() => {
  // Cleanup camera stream
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
  }
})
</script>

<style scoped>
.camera-page {
  padding: 0;
  height: 100vh;
  position: relative;
  background-color: black;
}

.camera-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.camera-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
