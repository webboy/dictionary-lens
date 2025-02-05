//TranslationDialog.vue
<template>
  <q-dialog
    :model-value="open"
    @update:model-value="$emit('update:open',$event)"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="translation-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ word }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <template v-if="translation">
          <!-- German specific translation -->
          <template v-if="currentLanguage === 'de'">
            <div class="row q-mb-md">
              <div class="col">
                <div class="text-subtitle2">Article</div>
                <div class="text-h5 q-mt-sm">{{ germanTranslation?.article }}</div>
              </div>
              <div class="col">
                <div class="text-subtitle2">Word</div>
                <div class="text-h5 q-mt-sm">{{ germanTranslation?.word }}</div>
              </div>
              <div class="col">
                <div class="text-subtitle2">Plural</div>
                <div class="text-h5 q-mt-sm">{{ germanTranslation?.plural }}</div>
              </div>
            </div>

            <div class="text-subtitle2">Examples</div>
            <q-list>
              <q-item v-for="(example, index) in germanTranslation?.examples" :key="index">
                <q-item-section>
                  <q-item-label>{{ example }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>

          <!-- Other languages can be added here -->
        </template>

        <div v-else class="text-center q-pa-md">
          <q-spinner-dots color="primary" size="40" />
          <div class="text-subtitle1 q-mt-sm">Loading translation...</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from 'stores/settingsStore'

interface GermanTranslation {
  article: string;
  word: string;
  plural: string;
  examples: string[];
}

interface Props {
  open: boolean;
  word: string;
  translation: string | null;
}

const props = defineProps<Props>();

const settingsStore = useSettingsStore();
const currentLanguage = computed(() => settingsStore.language);

const germanTranslation = computed<GermanTranslation | null>(() => {
  if (!props.translation) return null;
  try {
    return JSON.parse(props.translation);
  } catch {
    console.error('Failed to parse translation data');
    return null;
  }
});
</script>

<style scoped>
.translation-card {
  min-width: 350px;
  max-width: 600px;
  width: 90vw;
}
</style>
