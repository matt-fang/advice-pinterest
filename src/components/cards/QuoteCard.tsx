import BaseCard from './BaseCard'

interface QuoteCardProps {
  title: string
  content: string
  colorScheme: string
  author?: string
  onSave?: () => void
}

export default function QuoteCard({ content, colorScheme, author, onSave }: QuoteCardProps) {
  const isNatureQuote = colorScheme === 'nature-quote'
  
  return (
    <BaseCard 
      className={`rounded-3xl p-6 relative overflow-hidden ${
        isNatureQuote 
          ? 'bg-gradient-to-b from-amber-400 to-amber-600' 
          : 'bg-slate-700'
      }`}
      style={{ minHeight: '320px' }}
      onSave={onSave}
    >
      {isNatureQuote && (
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 300\'%3E%3Cdefs%3E%3ClinearGradient id=\'sky\' x1=\'0\' y1=\'0\' x2=\'0\' y2=\'1\'%3E%3Cstop offset=\'0\' stop-color=\'%23fbbf24\'/%3E%3Cstop offset=\'1\' stop-color=\'%23f59e0b\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\'400\' height=\'300\' fill=\'url(%23sky)\'/%3E%3Cpath d=\'M0 200 Q100 180 200 200 T400 200 L400 300 L0 300 Z\' fill=\'%23065f46\'/%3E%3Cpath d=\'M150 220 L160 180 L170 220 M180 200 L190 160 L200 200 M250 210 L260 170 L270 210\' stroke=\'%23064e3b\' stroke-width=\'3\' fill=\'none\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col justify-center h-full text-center">
        <div className="mb-4">
          <span className="text-4xl text-amber-200">&ldquo;</span>
        </div>
        <p className={`text-lg font-medium leading-tight italic mb-4 font-inter ${
          isNatureQuote ? 'text-amber-100' : 'text-[#A4AFC5]'
        }`}>
          {content}
        </p>
        {author && (
          <p className={`text-sm font-semibold font-inter ${
            isNatureQuote ? 'text-amber-200' : 'text-[#A4AFC5]'
          }`}>
            - {author.toUpperCase()}
          </p>
        )}
      </div>
    </BaseCard>
  )
}