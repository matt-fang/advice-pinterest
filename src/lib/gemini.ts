import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export interface AdvicePin {
  id: string
  title: string
  content: string
  style_type: 'square' | 'tall' | 'quote'
  color_scheme: string
  background_image?: string
}

const COLOR_SCHEMES = [
  'orange-gradient',
  'red-rounded', 
  'dark-yellow',
  'black-rounded',
  'nature-quote'
]

const STYLE_TYPES = ['square', 'tall', 'quote'] as const

export async function generateAdvicePins(userQuery: string): Promise<AdvicePin[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `
You are an expert life coach creating helpful, actionable advice. Based on the user's problem: "${userQuery}"

Generate exactly 5 different pieces of advice in JSON format. Each should be:
- Practical and immediately actionable
- Concise (max 50 words)
- Unique in approach/perspective
- Motivating and supportive

Format each as:
{
  "title": "Short catchy title (max 20 chars)",
  "content": "Main advice text (max 50 words)",
  "tone": "motivational" | "practical" | "inspirational" | "gentle" | "energetic"
}

Return as valid JSON array with 5 objects.
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    let adviceData
    try {
      adviceData = JSON.parse(text.replace(/```json\n?|\n?```/g, ''))
    } catch {
      adviceData = JSON.parse(text)
    }

    return adviceData.map((advice: any, index: number) => ({
      id: `pin-${Date.now()}-${index}`,
      title: advice.title,
      content: advice.content,
      style_type: STYLE_TYPES[index % STYLE_TYPES.length],
      color_scheme: COLOR_SCHEMES[index % COLOR_SCHEMES.length],
      background_image: advice.tone === 'inspirational' ? 'nature' : undefined
    }))
  } catch (error) {
    console.error('Error generating advice pins:', error)
    throw new Error('Failed to generate advice pins')
  }
}