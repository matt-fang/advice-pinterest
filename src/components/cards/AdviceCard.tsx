import { AdvicePin } from '@/lib/gemini'
import SquareCard from './SquareCard'
import TallCard from './TallCard'
import QuoteCard from './QuoteCard'

interface AdviceCardProps {
  pin: AdvicePin
}

export default function AdviceCard({ pin }: AdviceCardProps) {
  const { title, content, style_type, color_scheme } = pin

  switch (style_type) {
    case 'square':
      return <SquareCard title={title} content={content} colorScheme={color_scheme} />
    case 'tall':
      return <TallCard title={title} content={content} colorScheme={color_scheme} />
    case 'quote':
      return <QuoteCard title={title} content={content} colorScheme={color_scheme} author="" />
    default:
      return <SquareCard title={title} content={content} colorScheme={color_scheme} />
  }
}