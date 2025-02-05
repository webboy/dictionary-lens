import OpenAI from 'openai'
import type { GermanTranslation } from 'src/types'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

class TranslationService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Since we're using it in browser
    })
  }

  async translateToGerman(word: string): Promise<GermanTranslation> {
    console.log('Translating word:', word)
    try {
      const prompt = `
        Translate the English noun "${word}" to German and provide detailed information.
        Return the response in the following JSON format only:
        {
          "word": "German word",
          "article": "der/die/das",
          "plural": "plural form",
          "examples": ["2-3 example sentences in German"]
        }
        Ensure all examples are complete, grammatically correct German sentences.
      `

      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a precise German language translator, specialized in nouns. Provide only the requested JSON format without any additional text.'
          },
          { role: 'user', content: prompt }
        ],
        model: 'gpt-4o-mini',
        temperature: 0.3, // Lower temperature for more consistent results
        response_format: { type: 'json_object' }
      })

      const response = completion.choices[0]?.message.content

      if (!response) {
        throw new Error('No translation received')
      }

      const parsedResponse = JSON.parse(response)
      this.validateTranslation(parsedResponse)

      return parsedResponse
    } catch (error) {
      console.error('Translation error:', error)
      throw new Error('Failed to translate word')
    }
  }

  private validateTranslation(translation: GermanTranslation): asserts translation is GermanTranslation {
    if (!translation.word) {
      throw new Error('Invalid translation: missing or invalid word')
    }
    if (!translation.article || !['der', 'die', 'das'].includes(translation.article)) {
      throw new Error('Invalid translation: missing or invalid article')
    }
    if (!translation.plural) {
      throw new Error('Invalid translation: missing or invalid plural')
    }
    if (!Array.isArray(translation.examples) || translation.examples.length === 0) {
      throw new Error('Invalid translation: missing or invalid examples')
    }
  }

  validate(): boolean {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured')
    }
    return true
  }
}

export const translationService = new TranslationService()
