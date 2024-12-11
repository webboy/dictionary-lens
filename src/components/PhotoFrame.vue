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
import { ref, onMounted } from 'vue';
import { useYOLO } from '../composables/useYOLO';
import type { Detection } from '../composables/useYOLO'; // Import Detection as a type

defineProps({
  photoSrc: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);
const { loadModel, detectObjects } = useYOLO(); // Only destructure runtime properties
const photoElement = ref<HTMLImageElement | null>(null);
const detections = ref<Detection[]>([]); // Explicitly type detections as Detection[]

onMounted(() => {
  loadModel(); // Load the YOLO model when the component mounts
});

function closeFrame(){
  emit('close');
}

async function processPhoto() {
  if (!photoElement.value) {
    console.error('No photo element available for processing.');
    return;
  }

  detections.value = await detectObjects(photoElement.value); // Use detectObjects from useYOLO
  console.log('Detections:', detections.value);
  drawBoundingBoxes(detections.value);
}

function drawBoundingBoxes(objects: Detection[]) {
  const canvas = document.querySelector('.bounding-box-canvas') as HTMLCanvasElement;
  const context = canvas?.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  objects.forEach(({ bbox, score, class: classId }) => {
    const [x, y, width, height] = bbox;

    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height);

    context.fillStyle = 'red';
    context.font = '16px Arial';
    context.fillText(`Class: ${classId}, Confidence: ${(score * 100).toFixed(1)}%`, x, y - 5);
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
