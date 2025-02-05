export interface WordEntry {
  sourceWord: string;     // English noun (also serves as key)
  language: string;       // ISO language code
  targetWord: string;     // Word in target language
  translation: string;    // JSON string of language-specific attributes
  capturedAt: Date;
}
