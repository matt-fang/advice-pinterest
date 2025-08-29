import { AdvicePin } from '@/lib/gemini'
import MasonryGrid from '@/components/layout/MasonryGrid'
import AdviceCard from '@/components/cards/AdviceCard'
import BottomNavigation from '@/components/ui/BottomNavigation'

interface SearchResultsProps {
  query: string
  pins: AdvicePin[]
  loading: boolean
  activeTab: 'search' | 'grid'
  onTabChange: (tab: 'search' | 'grid') => void
  onBackToSearch: () => void
}

export default function SearchResults({ 
  query, 
  pins, 
  loading, 
  activeTab, 
  onTabChange, 
  onBackToSearch 
}: SearchResultsProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="px-4 pt-6 pb-20">
        {/* Query display */}
        <div className="mb-6">
          <button 
            onClick={onBackToSearch}
            className="text-gray-400 text-sm mb-2"
          >
            ← Back to search
          </button>
          <p className="text-gray-300 text-sm leading-relaxed">
            {query}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        {/* Results */}
        {!loading && pins.length > 0 && (
          <MasonryGrid>
            {pins.map((pin) => (
              <AdviceCard key={pin.id} pin={pin} />
            ))}
          </MasonryGrid>
        )}

        {/* No results */}
        {!loading && pins.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No advice found. Try a different search.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}