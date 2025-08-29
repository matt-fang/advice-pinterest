import BaseCard from './BaseCard'

interface TallCardProps {
  title: string
  content: string
  colorScheme: string
  onSave?: () => void
  onRemove?: () => void
  onDone?: () => void
  imageUrl?: string
  isGridView?: boolean
}

export default function TallCard({ content, colorScheme, onSave, onRemove, onDone, imageUrl, isGridView = false }: TallCardProps) {
  return (
    <BaseCard 
      className="rounded-[28px] overflow-hidden" 
      style={{ height: '260px', width: '200px' }} 
      onSave={onSave}
      onRemove={onRemove}
      onDone={onDone}
      isGridView={isGridView}
    >
      <div 
        className="relative w-full h-full"
        style={{
          backgroundImage: imageUrl ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("${imageUrl}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-6 left-6 right-6">
          <p 
            className="text-[#C4FF61] font-medium leading-[1.2]"
            style={{ 
              fontSize: '24px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            {content}
          </p>
        </div>
      </div>
    </BaseCard>
  )
}