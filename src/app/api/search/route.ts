import { NextRequest, NextResponse } from 'next/server'
import { generateAdvicePins } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, previousAdvice = [], round = 1 } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      )
    }

    const pins = await generateAdvicePins(query, previousAdvice, round)
    
    return NextResponse.json({ pins })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate advice pins' },
      { status: 500 }
    )
  }
}