//DetectionOverlay.vue
<template>
  <div class="absolute-full flex flex-center">
    <!-- Background captured image -->
    <img
      :src="image"
      class="full-width full-height object-cover"
      ref="imageRef"
      @load="onImageLoad"
     alt=""/>

    <!-- Detections overlay -->
    <div class="absolute-full">
      <div
        v-for="(detection, index) in detectionBoxes"
        :key="index"
        class="detection-box cursor-pointer"
        :style="{
          left: `${detection.x}%`,
          top: `${detection.y}%`,
          width: `${detection.width}%`,
          height: `${detection.height}%`
        }"
        @click="$emit('word-selected', detection.label)"
      >
        <div class="detection-label">
          {{ detection.label }}
        </div>
      </div>
    </div>

    <!-- Close button -->
    <q-btn
      round
      color="dark"
      icon="close"
      size="md"
      class="absolute-top-right q-ma-md"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface DetectionBox {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  image: string;
  detections: Array<{
    label: string;
    bbox: [number, number, number, number]; // [x, y, width, height] in pixels
  }>;
}

const props = defineProps<Props>();

const imageRef = ref<HTMLImageElement | null>(null);
const imageSize = ref({ width: 0, height: 0 });

// Convert pixel coordinates to percentages for responsive overlay
const detectionBoxes = computed<DetectionBox[]>(() => {
  if (!imageSize.value.width || !imageSize.value.height) return [];

  return props.detections.map(detection => ({
    label: detection.label,
    x: (detection.bbox[0] / imageSize.value.width) * 100,
    y: (detection.bbox[1] / imageSize.value.height) * 100,
    width: (detection.bbox[2] / imageSize.value.width) * 100,
    height: (detection.bbox[3] / imageSize.value.height) * 100
  }));
});

function onImageLoad() {
  if (imageRef.value) {
    imageSize.value = {
      width: imageRef.value.naturalWidth,
      height: imageRef.value.naturalHeight
    };
  }
}

onMounted(() => {
  if (imageRef.value?.complete) {
    onImageLoad();
  }
});
</script>

<style scoped>
.detection-box {
  position: absolute;
  border: 2px solid #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
  transition: background-color 0.3s ease;
}

.detection-box:hover {
  background-color: rgba(76, 175, 80, 0.3);
}

.detection-label {
  position: absolute;
  top: -25px;
  left: 0;
  background-color: #4CAF50;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.object-cover {
  object-fit: cover;
}
</style>
