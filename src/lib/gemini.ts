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

const BACKGROUND_IMAGES = [
  'nature', 
  'cityscape', 
  'abstract', 
  'pattern1', 
  'pattern2', 
  'gradient1', 
  'gradient2'
];

export async function generateAdvicePins(userQuery: string, previousAdvice: string[] = [], round: number = 1): Promise<AdvicePin[]> {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 1.2,
      maxOutputTokens: 1000,
    }
  })

  const previousAdviceText = previousAdvice.length > 0 
    ? `\n\nPREVIOUSLY GIVEN ADVICE (DO NOT REPEAT OR REWORD ANY OF THESE):\n${previousAdvice.map(advice => `- ${advice}`).join('\n')}\n\n`
    : ''

  const scopeGuidance = round === 1 
    ? 'Focus on VERY specific, narrow techniques for this exact problem.'
    : round <= 3
    ? 'Expand to related but still specific techniques. Stay concrete.'
    : 'Broaden to general psychological principles but keep them actionable.'

  // Enhanced mood detection for better contextual understanding
  const isMentalHealthQuery = /anxiety|anxious|depressed?|lonely|sad|grief|trauma|panic|worry|stress|overwhelmed|hopeless|suicidal|hurt|broken|lost|empty|tired|exhausted|crying|tears|can't|failing|fail|struggling|drowning/i.test(userQuery)
  const isIntenseDistress = /really|very|extremely|so |totally|completely|absolutely|can't handle|breaking down|falling apart|:[\(\[]|:\(|😢|😭|💔/i.test(userQuery)
  const isLowEnergyMood = /tired|exhausted|drained|no energy|can't move|heavy|stuck|numb|empty/i.test(userQuery)
  
  const prompt = `
You are a warm, understanding psychology expert who gives practical advice that meets people where they are emotionally. For the query: "${userQuery}"

${previousAdviceText}
ROUND ${round}: ${scopeGuidance}

TONE AND STYLE REQUIREMENTS:
- Write in warm, conversational phrases without excessive semicolons or clinical language
- Be professional yet human and approachable
- Match the emotional intensity and context of the user's situation
- Avoid overly cheerful responses to serious emotional distress

${isMentalHealthQuery ? `
EMOTIONAL SUPPORT FOCUS: This person is dealing with real psychological pain. Your advice must be:
- Trauma-informed and gentle, acknowledging their current emotional state
- Evidence-based using CBT, DBT, mindfulness, somatic therapy, attachment theory
- ${isIntenseDistress ? 'VERY gentle and stabilizing - focus on immediate emotional regulation and safety' : 'Supportive but practical - balance warmth with actionable steps'}
- ${isLowEnergyMood ? 'Require minimal energy - focus on tiny, achievable steps' : 'Appropriately matched to their energy level'}
- Focused on nervous system regulation, grounding, and genuine connection
- Avoid any advice that could seem dismissive of their pain
` : `
GENERAL/PRODUCTIVITY FOCUS: Be creative and engaging while staying psychologically grounded
- Use interesting techniques but keep them practical and accessible
- Physical movement, environmental changes, and cognitive strategies work well
- Be warm and encouraging without being overly casual about serious topics
`}

Generate exactly 5 completely NEW pieces of advice that feel genuinely helpful. Requirements:
- ZERO overlap with previous advice (no rewording, no similar concepts)
- Conversational and warm tone, not clinical or formal
- Maximum 15 words each (increased for more natural phrasing)
- ${isMentalHealthQuery ? 'Therapeutically sound and emotionally appropriate for someone in distress' : 'Creative and specific actions that feel doable and interesting'}
- Must be substantive psychological strategies presented in accessible language
- ${isIntenseDistress ? 'EXTREMELY gentle and stabilizing' : 'Appropriately matched to emotional context'}

${isMentalHealthQuery ? `
Examples for emotional support:
- "Notice where you feel tension in your body and gently breathe into those spots"
- "Write three words describing how you feel right now, then crumple the paper"
- "Call or text someone who makes you feel seen and understood"
- "Wrap yourself in something soft and notice the comfort it brings"
` : `
Examples for general productivity:
- "Set timer for 15 minutes and organize just one small corner of your space"
- "Write your biggest worry on paper then do jumping jacks while holding it"
- "Choose one tiny task and do it while standing on one foot"
- "Find the most interesting object near you and focus on it for two minutes"
`}

Format as:
{
  "title": "Warm, relatable title (max 25 chars)",
  "content": "${isMentalHealthQuery ? 'Gentle, supportive guidance' : 'Engaging, specific action'} (max 15 words)",
  "tone": "practical" | "energetic" | "quirky" | "direct" | "playful" | "gentle" | "therapeutic" | "warm" | "understanding"
}

Return valid JSON array with 5 objects. ${isMentalHealthQuery ? 'Prioritize emotional safety and genuine helpfulness over creativity' : 'Balance creativity with psychological wisdom'}
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
      background_image: BACKGROUND_IMAGES[index % BACKGROUND_IMAGES.length] // Assign random background image
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