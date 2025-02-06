import type { Detection, IDetectionService } from 'src/types/detection'
import { useSettingsStore } from 'stores/settingsStore'

interface GoogleVisionVertex {
  x: number
  y: number
}

interface GoogleVisionObject {
  name: string
  score: number
  boundingPoly: {
    normalizedVertices: GoogleVisionVertex[]
  }
}

interface GoogleVisionResponse {
  responses: [{
    localizedObjectAnnotations: GoogleVisionObject[]
  }]
  error?: {
    message: string
  }
}

export class GoogleVisionService implements IDetectionService {
  readonly name = 'Google Vision'
  readonly description = 'Uses Google Cloud Vision API for accurate object detection'
  readonly requiresApiKey = true
  readonly requiresEndpoint = false

  private getApiKey(): string {
    const settingsStore = useSettingsStore()
    const apiKey = settingsStore.getApiKey('googlevision')
    if (!apiKey) {
      throw new Error('Google Vision API key is not configured')
    }
    return apiKey
  }

  private async getImageDimensions(imageData: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        })
      }
      img.onerror = reject
      img.src = imageData
    })
  }

  async detect(imageData: string): Promise<Detection[]> {
    try {
      const { width, height } = await this.getImageDimensions(imageData)
      const apiKey = this.getApiKey()
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          requests: [{
            image: { content: imageData.split(',')[1] },
            features: [{ type: 'OBJECT_LOCALIZATION' }]
          }]
        })
      })

      const data: GoogleVisionResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Detection failed')
      }

      return data.responses[0].localizedObjectAnnotations.map((obj) => {
        // Ensure we have all required vertices
        const vertices = obj.boundingPoly.normalizedVertices
        if (vertices.length < 4) {
          throw new Error('Invalid bounding box vertices')
        }

        // Ensure all coordinates have values
        const x0 = vertices[0]?.x ?? 0
        const y0 = vertices[0]?.y ?? 0
        const x1 = vertices[1]?.x ?? 0
        const y2 = vertices[2]?.y ?? 0

        return {
          label: obj.name.toLowerCase(),
          bbox: [
            Math.round(x0 * width),  // x coordinate
            Math.round(y0 * height), // y coordinate
            Math.round((x1 - x0) * width),  // width
            Math.round((y2 - y0) * height)  // height
          ],
          score: obj.score
        }
      })
    } catch (error) {
      console.error('Google Vision detection error:', error)
      throw new Error('Object detection failed')
    }
  }

  validate(): boolean {
    if (!this.getApiKey()) {
      throw new Error('Google API key is not configured')
    }
    return true
  }
}
