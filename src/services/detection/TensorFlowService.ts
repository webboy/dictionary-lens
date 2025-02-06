import type { Detection, IDetectionService } from 'src/types/detection';
import { load } from '@tensorflow-models/coco-ssd';
import type {ObjectDetection, DetectedObject} from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export class TensorFlowService implements IDetectionService {
  readonly name = 'TensorFlow.js';
  readonly description = 'Offline detection using TensorFlow.js (COCO-SSD model)';
  readonly requiresApiKey = false;
  readonly requiresEndpoint = false

  private model: ObjectDetection | null = null;
  private isInitialized = false;

  async initialize() {
    if (!this.isInitialized) {
      this.model = await load();
      this.isInitialized = true;
    }
  }

  private async loadImage(imageData: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageData;
    });
  }

  async detect(imageData: string): Promise<Detection[]> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.model) {
        throw new Error('Model not initialized');
      }

      const img = await this.loadImage(imageData);
      const predictions = await this.model.detect(img);

      return predictions.map((pred: DetectedObject) => ({
        label: pred.class.toLowerCase(),
        bbox: [pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3]],
        score: pred.score
      }));
    } catch (error) {
      console.error('TensorFlow detection error:', error);
      throw new Error('Object detection failed');
    }
  }

  validate(): boolean {
    return true; // No API key needed
  }
}
