import { boot } from 'quasar/wrappers';
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

// Define our database schema
interface DictionaryLensDB extends DBSchema {
  words: {
    key: string;  // Will be the English noun
    value: {
      sourceWord: string;     // English noun
      language: string;       // ISO language code (e.g., 'de')
      targetWord: string;     // Word in target language
      translation: string;    // JSON string of language-specific attributes
      capturedAt: Date;       // Timestamp for sorting/filtering
    };
    indexes: {
      'by-source-and-language': [string, string];  // Index for filtering by language
      'by-language': string;  // Index for fetching all words of a specific language
    };
  };
}

// Database version
const DB_VERSION = 1;
const DB_NAME = 'dictionary-lens-db';

// Create a type for our database
export type DictionaryLensDatabase = IDBPDatabase<DictionaryLensDB>;

// Database singleton instance
let db: DictionaryLensDatabase;

// Initialize the database
async function initializeDatabase(): Promise<DictionaryLensDatabase> {
  if (db) return db;

  db = await openDB<DictionaryLensDB>(DB_NAME, DB_VERSION, {
    upgrade(database, oldVersion) {
      if (oldVersion < 1) {
        // Create the words store
        const wordsStore = database.createObjectStore('words', {
          keyPath: 'sourceWord'  // Using English noun as key
        });

        // Create index for language filtering
        wordsStore.createIndex('by-source-and-language', ['sourceWord', 'language']);
        wordsStore.createIndex('by-language', 'language');
      }
    },
    blocked() {
      console.warn('Database blocked: Please close other tabs of this app');
    },
    blocking() {
      console.warn('Database blocking: Please reload this tab');
    },
    terminated() {
      console.error('Database terminated unexpectedly');
    }
  });

  return db;
}

// Export boot function for Quasar
export default boot(async () => {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
});

// Export function to get database instance
export async function getDatabase(): Promise<DictionaryLensDatabase> {
  if (!db) {
    db = await initializeDatabase();
  }
  return db;
}
