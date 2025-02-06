export interface Detection {
  label: string;
  bbox: [number, number, number, number]; // [x, y, width, height]
  score: number;
}

export interface IDetectionService {
  name: string;
  description: string;
  requiresApiKey: boolean;
  requiresEndpoint: boolean;
  detect(imageData: string): Promise<Detection[]>;
  validate(): boolean;
}
