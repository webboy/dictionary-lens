<template>
  <q-page class="bg-black">
    <!-- Camera Container -->
    <CameraContainer v-if="!showPhotoFrame" />

    <!-- Photo Frame -->
    <PhotoFrame
      v-if="showPhotoFrame"
      :photoSrc="photo"
      @close="handleClosePhotoFrame"
    />

    <!-- Take Photo Button -->
    <TakePhotoButton v-if="!showPhotoFrame" @takePhoto="handleTakePhoto" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCamera } from '../composables/useCamera';
import CameraContainer from 'components/CameraContainer.vue';
import PhotoFrame from 'components/PhotoFrame.vue';
import TakePhotoButton from 'components/TakePhotoButton.vue';

const { capturePhoto } = useCamera();

const showPhotoFrame = ref(false);
const photo = ref('');

function handleTakePhoto() {
  photo.value = capturePhoto(); // Capture photo from the camera feed
  if (photo.value) {
    showPhotoFrame.value = true;
  } else {
    console.error('Failed to capture photo');
  }
}

function handleClosePhotoFrame() {
  photo.value = ''; // Clear the photo when closing the frame
  showPhotoFrame.value = false;
}
</script>



<style scoped>
/* Add any global styles specific to this page here */
</style>
