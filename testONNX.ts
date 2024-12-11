import * as ort from 'onnxruntime-web';
import { ref } from 'vue';

async function testONNX() {
  const session = ref<ort.InferenceSession | null>(null);

  try {
    console.log('Initializing ONNX runtime environment...');

    // Load the ONNX model
    session.value = await ort.InferenceSession.create('public/models/yolov8n.onnx');
    console.log('YOLO model loaded successfully:', session.value);
  } catch (error) {
    console.error('Error loading YOLO model:', error);
  }
}

testONNX()
