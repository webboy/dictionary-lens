import { ref } from 'vue';
import { defineStore } from 'pinia';

export type CameraType = 'front' | 'back';

interface Settings {
  language: string;
  cameraType: CameraType;
}

const STORAGE_KEY = 'dictionary-lens-settings';

const DEFAULT_SETTINGS: Settings = {
  language: 'de',
  cameraType: 'back'
};

const getStoredSettings = (): Settings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
};

export const useSettingsStore = defineStore('settings', () => {
  const language = ref<string>(getStoredSettings().language);
  const cameraType = ref<CameraType>(getStoredSettings().cameraType);

  const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      language: language.value,
      cameraType: cameraType.value
    }));
  };

  const setLanguage = (newLanguage: string) => {
    language.value = newLanguage;
    saveSettings();
  };

  const setCameraType = (type: CameraType) => {
    cameraType.value = type;
    saveSettings();
  };

  const resetToDefaults = () => {
    language.value = DEFAULT_SETTINGS.language;
    cameraType.value = DEFAULT_SETTINGS.cameraType;
    saveSettings();
  };

  return {
    // State
    language,
    cameraType,

    // Actions
    setLanguage,
    setCameraType,
    resetToDefaults
  };
});
