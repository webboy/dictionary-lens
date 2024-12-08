<template>
  <div class="camera-container">
    <video ref="cameraFeed" autoplay playsinline class="camera-feed"></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCamera } from '../composables/useCamera';

const { cameraFeed, initializeCamera } = useCamera();

onMounted(() => {
  initializeCamera();
});
</script>

<style scoped>
.camera-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.camera-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
