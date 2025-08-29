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
    
    console.log('Raw Gemini response:', text)
    
    let adviceData
    try {
      // Try parsing with markdown cleanup first
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      adviceData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.log('First parse failed, trying raw text')
      try {
        adviceData = JSON.parse(text)
      } catch (secondParseError) {
        console.error('JSON parse failed on both attempts:', { parseError, secondParseError, rawText: text })
        // Fallback: create default advice if parsing fails
        adviceData = [
          {
            title: "Stay Strong",
            content: "Remember that challenges are opportunities for growth. You've overcome difficulties before.",
            tone: "motivational"
          },
          {
            title: "Take Action",
            content: "Break down your problem into small, manageable steps. Start with just one.",
            tone: "practical"
          },
          {
            title: "Breathe Deep",
            content: "Sometimes the best solution comes when we pause and give ourselves space to think.",
            tone: "gentle"
          }
        ]
      }
    }

    if (!Array.isArray(adviceData)) {
      console.error('Gemini response is not an array:', adviceData)
      throw new Error('Invalid response format from AI')
    }

    return adviceData.map((advice: { title: string; content: string; tone: string }, index: number) => ({
      id: `pin-${Date.now()}-${index}`,
      title: advice.title || "Advice",
      content: advice.content || "Keep going, you've got this!",
      style_type: STYLE_TYPES[index % STYLE_TYPES.length],
      color_scheme: COLOR_SCHEMES[index % COLOR_SCHEMES.length],
      background_image: advice.tone === 'inspirational' ? 'nature' : undefined
    }))
  } catch (error) {
    console.error('Error generating advice pins:', error)
    // Return fallback advice instead of throwing
    return [
      {
        id: `pin-${Date.now()}-0`,
        title: "Keep Going",
        content: "Every challenge is a chance to grow stronger. You've got this!",
        style_type: 'square' as const,
        color_scheme: 'orange-gradient',
      },
      {
        id: `pin-${Date.now()}-1`,
        title: "One Step",
        content: "Focus on taking just one small step forward today.",
        style_type: 'tall' as const,
        color_scheme: 'red-rounded',
      }
    ]
  }
}