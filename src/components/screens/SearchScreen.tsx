import { useState } from 'react'
import SearchInput from '@/components/ui/SearchInput'
import BottomNavigation from '@/components/ui/BottomNavigation'
import PreviousChats from '@/components/ui/PreviousChats'
import { SearchHistory } from '@/lib/localStorage'

interface SearchScreenProps {
  onSearch: (query: string) => void
  onSelectPreviousChat: (searchHistory: SearchHistory) => void
  activeTab: 'search' | 'grid'
  onTabChange: (tab: 'search' | 'grid') => void
}

export default function SearchScreen({ onSearch, onSelectPreviousChat, activeTab, onTabChange }: SearchScreenProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="min-h-screen bg-[#14151C] text-[#A4AFC5]">
      <div className="flex flex-col justify-center items-center min-h-screen w-full max-w-3xl py-6 pb-20">
        <img 
          src="/monkey.jpeg" 
          alt="Monkey" 
          className="w-10 h-10 rounded-full mb-4"
        />
        <div className="text-center mb-12 ">
          <h1 className="text-3xl font-medium text-[#A4AFC5] leading-tight font-inter">
            what's bothering you today?
          </h1>
          <p className="text-[#A4AFC580] font-inter py-4">share what’s on your mind, and i’ll offer gentle, real advice to help you navigate your situation.</p>
        </div>
        
        <SearchInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          placeholder="man i'm feeling bummed about..."
        />
        
        <PreviousChats onSelectChat={onSelectPreviousChat} />
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}