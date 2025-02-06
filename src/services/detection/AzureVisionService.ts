import type { Detection, IDetectionService } from 'src/types/detection'
import { useSettingsStore } from 'stores/settingsStore'

interface AzureDetectedObject {
  boundingBox: {
    x: number
    y: number
    w: number
    h: number
  }
  tags: Array<{
    name: string
    confidence: number
  }>
}

interface AzureResponse {
  objectsResult?: {
    values: AzureDetectedObject[]
  }
  error?: {
    message: string
  }
}

export class AzureVisionService implements IDetectionService {
  readonly name = 'Azure Vision'
  readonly description = 'Uses Azure Computer Vision API for object detection'
  readonly requiresApiKey = true
  readonly requiresEndpoint = true

  private getEndpoint(): string {
    const settingsStore = useSettingsStore()
    const endpoint = settingsStore.getEndpoint('azure')

    if (!endpoint) {
      throw new Error('Azure Vision endpoint is not configured')
    }
    return endpoint.replace(/\/$/, '') // Remove trailing slash if present
  }

  private getApiKey(): string {
    const settingsStore = useSettingsStore()
    const apiKey = settingsStore.getApiKey('azure')
    if (!apiKey) {
      throw new Error('Azure Vision API key is not configured')
    }
    return apiKey
  }

  async detect(imageData: string): Promise<Detection[]> {
    try {
      const endpoint = this.getEndpoint()
      const apiKey = this.getApiKey()

      const url = `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=objects`
      const imageBlob = await fetch(imageData).then(res => res.blob())

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/octet-stream'
        },
        body: imageBlob
      })

      const data: AzureResponse = await response.json()

      console.log('Azure Vision data:', JSON.stringify(data))

      if (!response.ok || !data.objectsResult?.values) {

        throw new Error(data.error?.message || 'Detection failed')
      }

      return data.objectsResult.values.map((obj) => ({
        label: obj.tags[0]?.name.toLowerCase() ?? 'unknown',
        bbox: [
          obj.boundingBox.x,
          obj.boundingBox.y,
          obj.boundingBox.w,
          obj.boundingBox.h
        ],
        score: obj.tags[0]?.confidence ?? 0
      }))
    } catch (error) {
      console.error('Azure Vision detection error:', error)
      throw new Error('Object detection failed')
    }
  }

  validate(): boolean {
    try {
      this.getApiKey()
      this.getEndpoint()
      return true
    } catch {
      return false
    }
  }
}
