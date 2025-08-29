import SearchIcon from '@/components/icons/SearchIcon'
import GridIcon from '@/components/icons/GridIcon'

interface BottomNavigationProps {
  activeTab: 'search' | 'grid'
  onTabChange: (tab: 'search' | 'grid') => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#14151C] border-t border-[#A4AFC520]">
      <div className="flex justify-center max-w-sm mx-auto">
        <button
          onClick={() => onTabChange('search')}
          className={`flex-1 flex items-center justify-center py-4 ${
            activeTab === 'search' ? 'text-[#A4AFC5]' : 'text-[#A4AFC580]'
          }`}
        >
          <SearchIcon />
        </button>
        <button
          onClick={() => onTabChange('grid')}
          className={`flex-1 flex items-center justify-center py-4 ${
            activeTab === 'grid' ? 'text-[#A4AFC5]' : 'text-[#A4AFC580]'
          }`}
        >
          <GridIcon />
        </button>
      </div>
    </div>
  )
}