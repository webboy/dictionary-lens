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
        <div class="text-h6">{{ word }} - ({{ currentLanguage }})</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section v-if="translation">
        <q-list dense bordered>
          <q-item dense>
            <q-item-section>
              <q-item-label>Article</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ germanTranslation?.article }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item dense>
            <q-item-section>
              <q-item-label>Word</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ germanTranslation?.word }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item dense>
            <q-item-section>
              <q-item-label>Plural</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ germanTranslation?.plural }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-bold">Examples:</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-for="(example, index) in germanTranslation?.examples" :key="index">
                <q-item-section>
                  <q-item-label>{{ example }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item>
        </q-list>
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
