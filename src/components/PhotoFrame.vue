<template>
  <div class="photo-frame">
    <img
      :src="photoSrc"
      alt="Captured photo"
      class="photo-preview"
      ref="photoElement"
    />

    <!-- Canvas for Bounding Boxes -->
    <canvas ref="canvasElement" class="bounding-box-canvas"></canvas>

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
      unelevated
      color="primary"
      round
      size="lg"
      class="process-btn"
      @click="processPhoto"
      aria-label="Process Photo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

// Define the type for detections
import type { DetectedObject } from '@tensorflow-models/coco-ssd';

defineProps({
  photoSrc: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['close']);
const photoElement = ref<HTMLImageElement | null>(null);
// Explicitly type detections as an array of DetectedObject
const detections = ref<DetectedObject[]>([]);

const canvasElement = ref<HTMLCanvasElement | null>(null);

function closeFrame() {
  emit('close');
}

async function processPhoto() {
  console.log('Loading COCO-SSD model...');
  const model = await cocoSsd.load(); // Load COCO-SSD model

  console.log('photoElement:', photoElement.value); // Debugging line

  if (photoElement.value) {
    console.log('Detecting objects...');
    detections.value = await model.detect(photoElement.value);

    console.log('Detections:', detections.value);
    console.log(`Detected objects: ${detections.value.map(d => d.class).join(', ')}`);
    drawBoundingBoxes(detections.value); // Call function to draw boxes
  } else {
    console.error('No photo element available for processing.');
  }
}

function drawBoundingBoxes(objects: DetectedObject[]) {
  if (!canvasElement.value || !photoElement.value) {
    console.error('Canvas or photo element not available.');
    return;
  }

  const canvas = canvasElement.value;
  const image = photoElement.value;

  // Set canvas size to match the image
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Canvas context not available.');
    return;
  }

  // Clear any existing drawings
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bounding boxes for each detected object
  objects.forEach((object) => {
    const [x, y, width, height] = object.bbox;
    context.strokeStyle = 'red'; // Box color
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height);

    // Draw label
    context.fillStyle = 'red';
    context.font = '16px Arial';
    context.fillText(
      `${object.class} (${(object.score * 100).toFixed(1)}%)`,
      x,
      y > 10 ? y - 5 : 10
    );
  });
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
  justify-content: center; /* Center horizontally */
  align-items: center;    /* Center vertically */
}

.photo-preview {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  position: absolute;
}

.bounding-box-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the canvas */
  width: 90%; /* Match the photo's size */
  height: auto;
  pointer-events: none; /* Allow clicks to pass through to buttons */
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
