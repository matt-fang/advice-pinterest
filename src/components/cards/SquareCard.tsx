import BaseCard from './BaseCard'

interface SquareCardProps {
  title: string
  content: string
  colorScheme: string
}

const COLOR_SCHEMES = {
  'orange-gradient': 'bg-gradient-to-br from-orange-500 to-orange-600 text-yellow-300',
  'red-rounded': 'bg-red-500 text-yellow-300',
  'blue-gradient': 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
  'purple-gradient': 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
}

export default function SquareCard({ title, content, colorScheme }: SquareCardProps) {
  const colorClass = COLOR_SCHEMES[colorScheme as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES['orange-gradient']
  
  return (
    <BaseCard className={`rounded-3xl p-6 aspect-square flex items-center justify-center ${colorClass}`}>
      <div className="text-center">
        <p className="text-lg font-medium leading-tight">{content}</p>
      </div>
    </BaseCard>
  )
}