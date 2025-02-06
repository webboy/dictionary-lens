import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { DetectionServiceType } from 'src/services/detection/DetectionServiceFactory';

interface Settings {
  language: string;
  cameraType: 'front' | 'back';
  detectionService: DetectionServiceType;
  apiKeys: Partial<Record<DetectionServiceType, string>>
  endpoints: Partial<Record<DetectionServiceType, string>>
}

const STORAGE_KEY = 'dictionary-lens-settings';

const DEFAULT_SETTINGS: Settings = {
  language: 'de',
  cameraType: 'back',
  detectionService: 'tensorflow',
  apiKeys: {},
  endpoints: {}
};

export const useSettingsStore = defineStore('settings', () => {
  // Load stored settings or use defaults
  const stored = localStorage.getItem(STORAGE_KEY);
  const initialSettings = stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;

  // State
  const language = ref(initialSettings.language);
  const cameraType = ref(initialSettings.cameraType);
  const detectionService = ref(initialSettings.detectionService);
  const apiKeys = ref<Partial<Record<DetectionServiceType, string>>>(initialSettings.apiKeys)
  const endpoints = ref<Partial<Record<DetectionServiceType, string>>>(initialSettings.endpoints)

  // Save settings
  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      language: language.value,
      cameraType: cameraType.value,
      detectionService: detectionService.value,
      apiKeys: apiKeys.value,
      endpoints: endpoints.value
    }));
  }

  // Actions
  function setLanguage(newLanguage: string) {
    language.value = newLanguage;
    saveSettings();
  }

  function setCameraType(type: 'front' | 'back') {
    cameraType.value = type;
    saveSettings();
  }

  function setDetectionService(service: DetectionServiceType) {
    detectionService.value = service;
    saveSettings();
  }

  function setApiKey(service: DetectionServiceType, key: string) {
    apiKeys.value = { ...apiKeys.value, [service]: key }
    saveSettings()
  }

  function getApiKey(service: DetectionServiceType): string | undefined {
    return apiKeys.value[service]
  }

  function setEndpoint(service: DetectionServiceType, endpoint: string) {
    endpoints.value = { ...endpoints.value, [service]: endpoint }
    saveSettings()
  }

  function getEndpoint(service: DetectionServiceType): string | undefined {
    return endpoints.value[service]
  }

  return {
    // State
    language,
    cameraType,
    detectionService,
    apiKeys,

    // Actions
    setLanguage,
    setCameraType,
    setDetectionService,
    setApiKey,
    getApiKey,
    setEndpoint,
    getEndpoint
  };
});
