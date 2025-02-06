import type { IDetectionService } from 'src/types/detection';
import { HuggingFaceService } from './HuggingFaceService';
import { GoogleVisionService } from './GoogleVisionService';
import { TensorFlowService } from './TensorFlowService';
import { AzureVisionService } from 'src/services/detection/AzureVisionService'

export type DetectionServiceType = 'huggingface' | 'googlevision' | 'tensorflow' | 'azure';

export class DetectionServiceFactory {
  private static services: Record<DetectionServiceType, IDetectionService> = {
    huggingface: new HuggingFaceService(),
    googlevision: new GoogleVisionService(),
    tensorflow: new TensorFlowService(),
    azure: new AzureVisionService()
  };

  private static icons: Record<DetectionServiceType, string> = {
    huggingface: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    googlevision: 'https://lh3.googleusercontent.com/3WKZGqRmGOfmhuJs33YPibctQh15oxz76EA6n7mgZo5Fbx8qUWej2pIHZ0ia4MLI3gNcaQsy6btW09e8cwLXPQ=w46-h46',
    tensorflow: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/TensorFlow_logo.svg/512px-TensorFlow_logo.svg.png',
    azure: 'https://swimburger.net/media/ppnn3pcl/azure.png'
  }

  static getService(type: DetectionServiceType): IDetectionService {
    const service = this.services[type];
    if (!service) {
      throw new Error(`Detection service ${type} not found`);
    }
    service.validate()
    return service;
  }

  static getAvailableServices(): Array<{
    id: DetectionServiceType;
    name: string;
    description: string;
    requiresApiKey: boolean;
    requiresEndpoint: boolean;
    icon: string;
  }> {
    return Object.entries(this.services).map(([id, service]) => ({
      id: id as DetectionServiceType,
      name: service.name,
      description: service.description,
      requiresApiKey: service.requiresApiKey,
      requiresEndpoint: service.requiresEndpoint,
      icon: this.icons[id as DetectionServiceType]
    }));
  }
}
