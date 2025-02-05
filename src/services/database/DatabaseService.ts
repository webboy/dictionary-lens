import { getDatabase } from 'src/boot/db';

export interface WordEntry {
  sourceWord: string;     // English noun (also serves as key)
  language: string;       // ISO language code
  targetWord: string;     // Word in target language
  translation: string;    // JSON string of language-specific attributes
  capturedAt: Date;
}

class DatabaseService {
  // Get a word by its English noun
  async getTranslation(sourceWord: string, language: string): Promise<WordEntry | undefined> {
    const db = await getDatabase();
    try {
      const word = await db.getFromIndex('words', 'by-source-and-language', [sourceWord, language]);
      return word;
    } catch (error) {
      console.error('Error fetching translation:', error);
      throw error;
    }
  }

  // Get all words for a specific language
  async getWordsByLanguage(language: string): Promise<WordEntry[]> {
    const db = await getDatabase();
    try {
      return await db.getAllFromIndex('words', 'by-language', language);
    } catch (error) {
      console.error('Error fetching words by language:', error);
      throw error;
    }
  }

  // Add or update a word
  async saveWord(word: WordEntry): Promise<string> {
    const db = await getDatabase();
    try {
      await db.put('words', {
        ...word,
        capturedAt: word.capturedAt || new Date()
      });
      return word.sourceWord;
    } catch (error) {
      console.error('Error saving word:', error);
      throw error;
    }
  }

  // Delete a word
  async deleteWord(sourceWord: string): Promise<void> {
    const db = await getDatabase();
    try {
      await db.delete('words', sourceWord);
    } catch (error) {
      console.error('Error deleting word:', error);
      throw error;
    }
  }

  // Check if a word exists
  async wordExists(sourceWord: string): Promise<boolean> {
    const db = await getDatabase();
    try {
      const count = await db.count('words', sourceWord);
      return count > 0;
    } catch (error) {
      console.error('Error checking word existence:', error);
      throw error;
    }
  }

  // Get all words (sorted alphabetically by source word)
  async getAllWords(): Promise<WordEntry[]> {
    const db = await getDatabase();
    try {
      const words = await db.getAll('words');
      return words.sort((a, b) => a.sourceWord.localeCompare(b.sourceWord));
    } catch (error) {
      console.error('Error fetching all words:', error);
      throw error;
    }
  }

  // Search words by prefix (for autocomplete)
  async searchWords(prefix: string, language: string): Promise<WordEntry[]> {
    //const db = await getDatabase();
    try {
      const words = await this.getWordsByLanguage(language);
      return words.filter(word =>
        word.sourceWord.toLowerCase().startsWith(prefix.toLowerCase()) ||
        word.targetWord.toLowerCase().startsWith(prefix.toLowerCase())
      ).sort((a, b) => a.sourceWord.localeCompare(b.sourceWord));
    } catch (error) {
      console.error('Error searching words:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const databaseService = new DatabaseService();
