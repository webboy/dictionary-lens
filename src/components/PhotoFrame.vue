<template>
  <div class="photo-frame">
    <img :src="photoSrc" alt="Captured photo" class="photo-preview" />

    <!-- Close Button -->
    <q-btn
      icon="close"
      flat
      round
      size="lg"
      color="negative"
      class="close"
      @click="closeFrame"
      aria-label="Close Photo Frame"
    />

    <!-- Process Photo Button -->
    <q-btn
      icon="auto_fix_high"
      flat
      round
      size="lg"
      color="primary"
      class="process-btn"
      @click="processPhoto"
      aria-label="Process Photo"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  photoSrc: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['close']);

function closeFrame() {
  emit('close');
}

function processPhoto() {
  console.log('Processing photo to detect elements...');
}
</script>

<style scoped>
.photo-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.photo-preview {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.q-btn {
  position: absolute;
}

.q-btn.close {
  top: 16px;
  right: 16px;
}

.q-btn.process-btn {
  bottom: 16px;
}
</style>
