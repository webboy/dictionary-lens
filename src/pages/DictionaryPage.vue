//DictionaryPage.vue
<template>
  <q-page class="q-pa-md">
    <!-- Search -->
    <q-input
      v-model="searchQuery"
      dense
      outlined
      placeholder="Search words..."
      class="q-mb-md"
      clearable
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Word List -->
    <q-list separator>
      <q-item
        v-for="entry in dictionaryStore.filteredEntries"
        :key="entry.sourceWord"
        clickable
        v-ripple
        @click="showTranslation(entry)"
      >
        <q-item-section>
          <q-item-label>{{ entry.sourceWord }}</q-item-label>
          <q-item-label caption>{{ entry.targetWord }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Empty State -->
    <div
      v-if="dictionaryStore.entries.length === 0"
      class="text-center q-pa-lg text-grey-7"
    >
      <q-icon name="menu_book" size="48px" />
      <div class="text-h6 q-mt-md">No words in dictionary</div>
      <div class="text-body2">Use the camera to capture and translate words</div>
    </div>

    <!-- Translation Dialog -->
    <translation-dialog
      v-model:open="showDialog"
      :word="selectedWord"
      :translation="selectedTranslation"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDictionaryStore } from 'stores/dictionaryStore'
import TranslationDialog from 'components/TranslationDialog.vue'
import type { WordEntry } from 'src/types'

// Store
const dictionaryStore = useDictionaryStore()

// State
const showDialog = ref(false)
const selectedWord = ref('')
const selectedTranslation = ref<string | null>(null)

// Search binding with store
const searchQuery = computed({
  get: () => dictionaryStore.searchQuery,
  set: (value) => dictionaryStore.setSearchQuery(value)
})

// Methods
function showTranslation(entry: WordEntry) {
  selectedWord.value = entry.sourceWord
  selectedTranslation.value = entry.translation
  showDialog.value = true
}

// Lifecycle
onMounted(async () => {
  await dictionaryStore.loadEntries()
})
</script>
