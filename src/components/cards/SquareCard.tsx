import BaseCard from './BaseCard'

interface SquareCardProps {
  title: string
  content: string
  colorScheme: string
  onSave?: () => void
  onRemove?: () => void
  onDone?: () => void
  isGridView?: boolean
}

const SERIF_COLOR_SCHEMES = [
  { bg: '#f49405', text: '#f13d05' },
  { bg: '#e0858d', text: '#c9b74a' },
  { bg: '#a4bb1a', text: '#dddde2' },
  { bg: '#e73a26', text: '#6db8bf' },
  { bg: '#f5cae9', text: '#f27202' },
  { bg: '#9dc7a8', text: '#ee6a93' }
]

const SANS_COLOR_SCHEMES = [
  'bg-white text-black',
  'bg-black text-white',
  'bg-stone-100 text-black'
]

export default function SquareCard({ content, colorScheme, onSave, onRemove, onDone, isGridView = false }: SquareCardProps) {
  const useSerif = Math.random() > 0.5
  
  if (useSerif) {
    const serifScheme = SERIF_COLOR_SCHEMES[Math.floor(Math.random() * SERIF_COLOR_SCHEMES.length)]
    return (
      <BaseCard 
        className="rounded-[28px] p-6 aspect-square flex items-center justify-center" 
        style={{ 
          width: '200px', 
          height: '200px',
          backgroundColor: serifScheme.bg,
          color: serifScheme.text
        }}
        onSave={onSave}
        onRemove={onRemove}
        onDone={onDone}
        isGridView={isGridView}
      >
        <div className="w-full h-full flex items-center justify-center">
          <p 
            className="font-bold leading-[1.1]"
            style={{ 
              fontSize: '20px',
              fontFamily: '"Noto Serif JP", serif',
              textAlign: 'justify',
              textJustify: 'inter-word'
            }}
          >
            {content}
          </p>
        </div>
      </BaseCard>
    )
  } else {
    const sansScheme = SANS_COLOR_SCHEMES[Math.floor(Math.random() * SANS_COLOR_SCHEMES.length)]
    return (
      <BaseCard 
        className={`rounded-[28px] p-8 aspect-square flex items-center justify-center ${sansScheme}`} 
        style={{ width: '200px', height: '200px' }}
        onSave={onSave}
        onRemove={onRemove}
        onDone={onDone}
        isGridView={isGridView}
      >
        <div className="text-center">
          <p 
            className="font-medium leading-tight"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            {content}
          </p>
        </div>
      </BaseCard>
    )
  }
}