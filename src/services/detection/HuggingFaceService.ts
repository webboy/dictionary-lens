import { HfInference } from '@huggingface/inference'
import type { Detection, IDetectionService } from 'src/types/detection'
import { useSettingsStore } from 'stores/settingsStore'

const MODEL_ID = 'facebook/detr-resnet-50'

export class HuggingFaceService implements IDetectionService {
  private hf: HfInference
  readonly name = 'Hugging Face'
  readonly description = "Uses Hugging Face's object detection model"
  readonly requiresApiKey = true
  readonly requiresEndpoint = false

  apiKey = ''

  private getApiKey(): string {
    const settingsStore = useSettingsStore()
    return settingsStore.getApiKey('huggingface') || ''
  }

  constructor() {
    this.apiKey = this.getApiKey()
    this.hf = new HfInference(this.apiKey)
  }

  async detect(imageData: string): Promise<Detection[]> {
    try {
      const response = await this.hf.objectDetection({
        model: MODEL_ID,
        data: await this.processImage(imageData),
      })

      return response.map((item) => ({
        label: item.label.toLowerCase(),
        bbox: [
          item.box.xmin,
          item.box.ymin,
          item.box.xmax - item.box.xmin,
          item.box.ymax - item.box.ymin,
        ],
        score: item.score,
      }))
    } catch (error) {
      console.error('Hugging Face detection error:', error)
      throw new Error('Object detection failed')
    }
  }

  private async processImage(imageData: string): Promise<Blob> {
    const response = await fetch(imageData)
    return await response.blob()
  }

  validate(): boolean {
    if (!this.apiKey) {
      throw new Error('Hugging Face token is not configured')
    }
    return true
  }
}
