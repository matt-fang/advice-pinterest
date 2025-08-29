import { useState } from 'react'
import SearchInput from '@/components/ui/SearchInput'
import BottomNavigation from '@/components/ui/BottomNavigation'

interface SearchScreenProps {
  onSearch: (query: string) => void
  activeTab: 'search' | 'grid'
  onTabChange: (tab: 'search' | 'grid') => void
}

export default function SearchScreen({ onSearch, activeTab, onTabChange }: SearchScreenProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex flex-col justify-center items-center min-h-screen px-6 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-300 leading-tight">
            What&apos;s been on<br />your mind?
          </h1>
        </div>
        
        <SearchInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          placeholder="Feeling lonely..."
        />
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}