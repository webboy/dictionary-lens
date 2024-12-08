<template>
  <div class="button-container">
    <q-btn
      icon="photo_camera"
      unelevated
      color="primary"
      round
      size="lg"
      @click="emitTakePhoto"
      aria-label="Take Photo"
    />
  </div>
</template>

<script setup lang="ts">
// Define the custom event
const emit = defineEmits(['takePhoto']);

function emitTakePhoto() {
  // Emit the "takePhoto" event
  emit('takePhoto');
}
</script>

<style scoped>
.button-container {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
