import { ref } from 'vue';
import * as ort from 'onnxruntime-web'; // Import ONNX.js as a namespace

export interface Detection {
  bbox: [number, number, number, number]; // x, y, width, height
  score: number; // Confidence score
  class: number; // Class ID
}

export function useYOLO() {
  const session = ref<ort.InferenceSession | null>(null);

  async function loadModel() {
    try {
      console.log('Initializing ONNX runtime environment...');

      // Load the ONNX model
      //session.value = await ort.InferenceSession.create('/models/yolov8n.onnx');
      console.log('YOLO model loaded successfully:', session.value);
    } catch (error) {
      console.error('Error loading YOLO model:', error);
    }
  }

  async function detectObjects(imageElement: HTMLImageElement): Promise<Detection[]> {
    if (!session.value) {
      console.error('YOLO model not loaded');
      return [];
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 640;
    canvas.height = 640;
    context?.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
    const inputTensor = new Float32Array(640 * 640 * 3); // YOLO expects (1, 3, 640, 640)
    if (imageData) {
      for (let i = 0; i < imageData.data.length; i += 4) {
        const pixelIndex = i / 4;
        inputTensor[pixelIndex * 3] = imageData.data[i] / 255.0; // R
        inputTensor[pixelIndex * 3 + 1] = imageData.data[i + 1] / 255.0; // G
        inputTensor[pixelIndex * 3 + 2] = imageData.data[i + 2] / 255.0; // B
      }
    }

    const feeds = { images: new ort.Tensor('float32', inputTensor, [1, 3, 640, 640]) };
    try {
      const results = await session.value.run(feeds);

      // Process the output tensor
      const output = results['output0'].data as Float32Array; // Assume output is Float32Array
      console.log('Raw output:', output);

      const detections: Detection[] = [];
      // Process the output here (e.g., decode bounding boxes, scores, classes)

      return detections;
    } catch (error) {
      console.error('Error during YOLO inference:', error);
      return [];
    }
  }

  return {
    loadModel,
    detectObjects,
  };
}
