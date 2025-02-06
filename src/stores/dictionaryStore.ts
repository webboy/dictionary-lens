import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { databaseService } from 'src/services/database/DatabaseService'
import { useSettingsStore } from './settingsStore'
import type { WordEntry } from 'src/types'

export const useDictionaryStore = defineStore('dictionary', () => {
  // State
  const entries = ref<WordEntry[]>([])
  const searchQuery = ref('')

  // Store
  const settingsStore = useSettingsStore()

  // Getters
  const filteredEntries = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return sortedEntries.value

    return sortedEntries.value.filter(entry =>
      entry.sourceWord.toLowerCase().includes(query) ||
      entry.targetWord.toLowerCase().includes(query)
    )
  })

  const sortedEntries = computed(() => {
    return [...entries.value].sort((a, b) =>
      a.sourceWord.localeCompare(b.sourceWord)
    )
  })

  // Actions
  async function loadEntries(): Promise<WordEntry[]> {
    try {
      return entries.value = await databaseService.getWordsByLanguage(settingsStore.language)
    } catch (error) {
      console.error('Error loading entries:', error)
      return []
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  return {
    entries,
    searchQuery,
    filteredEntries,
    sortedEntries,
    // Actions
    loadEntries,
    setSearchQuery
  }
})
