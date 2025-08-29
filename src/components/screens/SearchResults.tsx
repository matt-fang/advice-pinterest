import React from 'react';
import { AdvicePin } from '@/lib/gemini'
import MasonryGrid from '@/components/layout/MasonryGrid'
import AdviceCard from '@/components/cards/AdviceCard'
import BottomNavigation from '@/components/ui/BottomNavigation'

// Memoized AdviceCard to prevent unnecessary re-renders
const MemoizedAdviceCard = React.memo(AdviceCard);

interface SearchResultsProps {
  query: string
  pins: AdvicePin[]
  loading: boolean
  loadingMore: boolean
  activeTab: 'search' | 'grid'
  onTabChange: (tab: 'search' | 'grid') => void
  onBackToSearch: () => void
  lastPinElementRef: (node: HTMLDivElement) => void
  onSavePin: (pin: AdvicePin) => void
  savedPins: AdvicePin[]
}

export default function SearchResults({ 
  query, 
  pins, 
  loading, 
  loadingMore,
  activeTab, 
  onTabChange, 
  onBackToSearch,
  lastPinElementRef,
  onSavePin,
  savedPins
}: SearchResultsProps) {
  return (
    <div className="min-h-screen bg-[#14151C] text-[#A4AFC5]">
      <div className="px-4 pt-6 pb-20">
        {/* Query display */}
        <div className="mb-6">
          <button 
            onClick={onBackToSearch}
            className="text-[#A4AFC580] text-sm mb-2 font-inter"
          >
            ← Back to search
          </button>
          <p className="text-[#A4AFC5] text-sm leading-relaxed font-inter font-medium">
            {query}
          </p>
          <div className="flex items-center mt-4">
            <img 
              src="/monkey.jpeg" 
              alt="Monkey" 
              className="w-10 h-10 rounded-full mr-4"
            />
            <p className="text-[#A4AFC580] font-inter">here's what you could try:</p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A4AFC5]"></div>
          </div>
        )}

        {/* Results */}
        {!loading && activeTab === 'search' && pins.length > 0 && (
          <div className="flex justify-center">
            <MasonryGrid>
              {pins.map((pin, index) => {
                if (index === pins.length - 1) {
                  return (
                    <div key={pin.id} ref={lastPinElementRef}>
                      <MemoizedAdviceCard pin={pin} onSave={onSavePin} />
                    </div>
                  )
                }
                return <MemoizedAdviceCard key={pin.id} pin={pin} onSave={onSavePin} />
              })}
            </MasonryGrid>
          </div>
        )}

        {/* Saved Cards Grid */}
        {activeTab === 'grid' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-[#A4AFC5] font-inter">Your Action Cards</h2>
              <p className="text-sm text-[#A4AFC580] font-inter">Daily saved cards (limit 3)</p>
            </div>
            {savedPins.length > 0 ? (
              <div className="flex justify-center">
                <MasonryGrid>
                  {savedPins.map((pin) => (
                    <MemoizedAdviceCard key={pin.id} pin={pin} />
                  ))}
                </MasonryGrid>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#A4AFC580] font-inter">No saved cards yet. Save some advice from your search!</p>
              </div>
            )}
          </div>
        )}

        {/* Loading more indicator */}
        {loadingMore && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#A4AFC5] opacity-50"></div>
          </div>
        )}

        {/* No results */}
        {!loading && pins.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#A4AFC580] font-inter">No advice found. Try a different search.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}