// src/services/AnalyticsService.ts
import { getAnalytics, logEvent } from 'firebase/analytics';
import { app } from 'src/boot/firebase';
import type { DetectionServiceType } from 'src/services/detection/DetectionServiceFactory'

export class AnalyticsService {
  private analytics = getAnalytics(app);

  // Camera events
  trackCameraOpen() {
    logEvent(this.analytics, 'camera_open');
  }

  trackObjectDetection(objectCount: number, detection: DetectionServiceType) {
    logEvent(this.analytics, 'object_detection', {
      object_count: objectCount,
      detection_service: detection
    });
  }

  // Dictionary events
  trackWordLookUp(word: string, language: string) {
    logEvent(this.analytics, 'word_lookup', {
      word: word,
      language: language
    });
  }
}

export const analyticsService = new AnalyticsService();
