import { Search, Grid3X3 } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: 'search' | 'grid'
  onTabChange: (tab: 'search' | 'grid') => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700">
      <div className="flex justify-center max-w-sm mx-auto">
        <button
          onClick={() => onTabChange('search')}
          className={`flex-1 flex items-center justify-center py-4 ${
            activeTab === 'search' ? 'text-white' : 'text-gray-500'
          }`}
        >
          <Search size={24} />
        </button>
        <button
          onClick={() => onTabChange('grid')}
          className={`flex-1 flex items-center justify-center py-4 ${
            activeTab === 'grid' ? 'text-white' : 'text-gray-500'
          }`}
        >
          <Grid3X3 size={24} />
        </button>
      </div>
    </div>
  )
}