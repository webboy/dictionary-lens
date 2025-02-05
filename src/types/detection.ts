export interface Detection {
  label: string;
  bbox: [number, number, number, number]; // [x, y, width, height]
  score: number;
}
