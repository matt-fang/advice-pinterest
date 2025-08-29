import BaseCard from './BaseCard'

interface TallCardProps {
  title: string
  content: string
  colorScheme: string
}

const COLOR_SCHEMES = {
  'dark-yellow': 'bg-slate-800 text-yellow-300',
  'black-rounded': 'bg-black text-white',
  'navy-blue': 'bg-slate-900 text-blue-300',
  'dark-green': 'bg-green-900 text-green-300'
}

export default function TallCard({ content, colorScheme }: TallCardProps) {
  const colorClass = COLOR_SCHEMES[colorScheme as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES['dark-yellow']
  
  return (
    <BaseCard className={`rounded-3xl p-6 ${colorClass}`} style={{ minHeight: '280px' }}>
      <div className="flex flex-col justify-center h-full">
        <p className="text-lg font-medium leading-tight">{content}</p>
      </div>
    </BaseCard>
  )
}