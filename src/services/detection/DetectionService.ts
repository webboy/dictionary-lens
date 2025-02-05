import { HfInference } from '@huggingface/inference';
import type { Detection } from 'src/types'

const HUGGING_FACE_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;
const MODEL_ID = 'facebook/detr-resnet-50';



class DetectionService {
  private hf: HfInference;

  constructor() {
    this.hf = new HfInference(HUGGING_FACE_TOKEN);
  }

  private isNoun(label: string): boolean {
    // Basic check if the word might be a noun
    // This is a simple heuristic and might need improvement
    return (
      label.length > 1 && // Not a single character
      !label.includes(' ') && // Not a phrase
      !label.includes('_') && // Not a compound word
      /^[a-zA-Z]+$/.test(label) // Only letters
    );
  }

  private async processImage(imageData: string): Promise<Blob> {
    // Convert base64 to blob
    const response = await fetch(imageData);
    return await response.blob();
  }

  private filterDetections(detections: Detection[]): Detection[] {
    return detections
      .filter(detection =>
        // Filter based on confidence score and noun check
        detection.score > 0.5 && this.isNoun(detection.label)
      )
      // Sort by confidence score
      .sort((a, b) => b.score - a.score)
      // Remove duplicates based on label
      .filter((detection, index, self) =>
        index === self.findIndex(d => d.label === detection.label)
      );
  }

  async detect(imageData: string): Promise<Detection[]> {
    try {
      // Remove data URL prefix if present
      //const base64Data = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      const imageBlob = await this.processImage(imageData);

      const result = await this.hf.objectDetection({
        model: MODEL_ID,
        data: imageBlob,
      });

      // Transform and filter the detections
      const detections: Detection[] = result.map(item => ({
        label: item.label.toLowerCase(), // Normalize to lowercase
        bbox: [
          item.box.xmin,
          item.box.ymin,
          item.box.xmax - item.box.xmin, // Convert to width
          item.box.ymax - item.box.ymin  // Convert to height
        ],
        score: item.score
      }));

      return this.filterDetections(detections);

    } catch (error) {
      console.error('Object detection failed:', error);
      throw new Error('Failed to detect objects in image');
    }
  }

  // Method to validate if detection service is properly configured
  validate(): boolean {
    if (!HUGGING_FACE_TOKEN) {
      throw new Error('Hugging Face token is not configured');
    }
    return true;
  }
}

// Export singleton instance
export const detectionService = new DetectionService();
