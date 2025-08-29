import { AdvicePin } from '@/lib/gemini'
import SquareCard from './SquareCard'
import TallCard from './TallCard'
import QuoteCard from './QuoteCard'

interface AdviceCardProps {
  pin: AdvicePin
  onSave?: (pin: AdvicePin) => void
  onRemove?: () => void
  onDone?: () => void
  isGridView?: boolean
}

export default function AdviceCard({ pin, onSave, onRemove, onDone, isGridView = false }: AdviceCardProps) {
  const { title, content, style_type, color_scheme } = pin
  const handleSave = () => onSave?.(pin)

  switch (style_type) {
    case 'square':
      return <SquareCard title={title} content={content} colorScheme={color_scheme} onSave={handleSave} onRemove={onRemove} onDone={onDone} isGridView={isGridView} />
    case 'tall':
      const imageUrl = `/images/${['alex-azabache-RJ_zZKgKrog-unsplash Large.jpeg', 'annie-spratt-2W9wCRzfwcs-unsplash Large.jpeg', 'bob-brewer-0bfSrm93Wlc-unsplash Large.jpeg', 'charles-etoroma-ETHj9rhBn9M-unsplash Large.jpeg', 'chris-henry-oqR2UoEuBQ4-unsplash Large.jpeg'][Math.floor(Math.random() * 5)]}`
      return <TallCard title={title} content={content} colorScheme={color_scheme} onSave={handleSave} imageUrl={imageUrl} onRemove={onRemove} onDone={onDone} isGridView={isGridView} />
    case 'quote':
      return <SquareCard title={title} content={content} colorScheme={color_scheme} onSave={handleSave} onRemove={onRemove} onDone={onDone} isGridView={isGridView} />
    default:
      return <SquareCard title={title} content={content} colorScheme={color_scheme} onSave={handleSave} onRemove={onRemove} onDone={onDone} isGridView={isGridView} />
  }
}