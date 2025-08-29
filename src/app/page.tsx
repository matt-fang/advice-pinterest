'use client'

import { useState, useRef, useCallback } from 'react'
import { AdvicePin } from '@/lib/gemini'
import { SearchHistory, saveSearchToHistory } from '@/lib/localStorage'
import SearchScreen from '@/components/screens/SearchScreen'
import SearchResults from '@/components/screens/SearchResults'
import MasonryGrid from '@/components/layout/MasonryGrid'
import AdviceCard from '@/components/cards/AdviceCard'
import BottomNavigation from '@/components/ui/BottomNavigation'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'search' | 'results' | 'grid'>('search')
  const [currentQuery, setCurrentQuery] = useState('')
  const [pins, setPins] = useState<AdvicePin[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'search' | 'grid'>('search')
  const [loadingMore, setLoadingMore] = useState(false)
  const [adviceHistory, setAdviceHistory] = useState<string[]>([])
  const [requestCount, setRequestCount] = useState(0)
  const [savedPins, setSavedPins] = useState<AdvicePin[]>([])
  const [completedPins, setCompletedPins] = useState<AdvicePin[]>([])
  const [dailySaveCount, setDailySaveCount] = useState(0)
  const [previousScreen, setPreviousScreen] = useState<'search' | 'results'>('search')
  const observer = useRef<IntersectionObserver | null>(null)

  // Load saved pins and daily count from localStorage on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedPins')
      const today = new Date().toDateString()
      const savedDate = localStorage.getItem('savedPinsDate')
      const todayCount = localStorage.getItem('dailySaveCount')
      
      if (saved) {
        setSavedPins(JSON.parse(saved))
      }
      
      const completed = localStorage.getItem('completedPins')
      if (completed) {
        setCompletedPins(JSON.parse(completed))
      }
      
      if (savedDate === today && todayCount) {
        setDailySaveCount(parseInt(todayCount))
      } else {
        // Reset count for new day
        setDailySaveCount(0)
        localStorage.setItem('savedPinsDate', today)
        localStorage.setItem('dailySaveCount', '0')
      }
    }
  })

  const generateMorePins = async (query: string, append: boolean = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }

    const currentRound = append ? requestCount + 1 : 1
    setRequestCount(currentRound)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query, 
          previousAdvice: adviceHistory,
          round: currentRound 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate advice')
      }

      const data = await response.json()
      const newAdviceContent = data.pins.map((pin: AdvicePin) => pin.content)
      
      setAdviceHistory(prev => [...prev, ...newAdviceContent])
      setPins(prev => append ? [...prev, ...data.pins] : data.pins)
      
      // Save to search history on first round
      if (!append && data.pins.length > 0) {
        saveSearchToHistory(query, data.pins)
      }
    } catch (error) {
      console.error('Search error:', error)
      if (!append) setPins([])
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleSearch = async (query: string) => {
    setCurrentQuery(query)
    setCurrentScreen('results')
    setPreviousScreen('results')
    setAdviceHistory([])
    setRequestCount(0)
    await generateMorePins(query, false)
  }

  const handleSavePin = useCallback((pin: AdvicePin) => {
    if (savedPins.length >= 3) {
      alert('You can only save 3 cards at a time! Remove or complete a card to add more.');
      return;
    }

    const updatedSaved = [...savedPins, pin];
    setSavedPins(updatedSaved);

    // Save to localStorage
    localStorage.setItem('savedPins', JSON.stringify(updatedSaved));

    // Show feedback
    alert(`Card saved! ${3 - updatedSaved.length} slots left.`);
  }, [savedPins]);

  const handleRemovePin = useCallback((pinToRemove: AdvicePin) => {
    const updatedSaved = savedPins.filter(pin => pin.id !== pinToRemove.id);
    setSavedPins(updatedSaved);

    // Save to localStorage
    localStorage.setItem('savedPins', JSON.stringify(updatedSaved));
  }, [savedPins]);

  const handleDonePin = useCallback((pinToDone: AdvicePin) => {
    const updatedSaved = savedPins.filter(pin => pin.id !== pinToDone.id);
    const updatedCompleted = [...completedPins, pinToDone];

    setSavedPins(updatedSaved);
    setCompletedPins(updatedCompleted);

    // Save to localStorage
    localStorage.setItem('savedPins', JSON.stringify(updatedSaved));
    localStorage.setItem('completedPins', JSON.stringify(updatedCompleted));

    // Trigger animation
    const cardElement = document.querySelector(`[data-pin-id="${pinToDone.id}"]`);
    if (cardElement) {
      cardElement.classList.add('animate-pulse', 'scale-105');
      setTimeout(() => {
        cardElement.classList.remove('animate-pulse', 'scale-105');
      }, 500);
    }
  }, [savedPins, completedPins]);

  const lastPinElementRef = useCallback((node: HTMLDivElement) => {
    if (loadingMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && currentQuery) {
        generateMorePins(currentQuery, true)
      }
    })
    if (node) observer.current.observe(node)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, currentQuery])

  const handleBackToSearch = () => {
    setCurrentScreen('search')
    setActiveTab('search')
  }

  const handleTabChange = (tab: 'search' | 'grid') => {
    setActiveTab(tab)
    if (tab === 'grid') {
      setPreviousScreen(currentScreen as 'search' | 'results')
      setCurrentScreen('grid')
    } else {
      setCurrentScreen(previousScreen)
    }
  }

  const handleSelectPreviousChat = (searchHistory: SearchHistory) => {
    setCurrentQuery(searchHistory.query)
    setPins(searchHistory.pins)
    setCurrentScreen('results')
    setPreviousScreen('results')
    setAdviceHistory(searchHistory.pins.map(pin => pin.content))
    setRequestCount(1)
  }

  return (
    <div className="max-w-sm mx-auto bg-[#14151C] min-h-screen">
      {currentScreen === 'search' ? (
        <SearchScreen 
          onSearch={handleSearch}
          onSelectPreviousChat={handleSelectPreviousChat}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      ) : currentScreen === 'results' ? (
        <SearchResults
          query={currentQuery}
          pins={pins}
          loading={loading}
          loadingMore={loadingMore}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onBackToSearch={handleBackToSearch}
          lastPinElementRef={lastPinElementRef}
          onSavePin={handleSavePin}
          savedPins={savedPins}
        />
      ) : (
        <div className="min-h-screen bg-[#14151C] text-[#A4AFC5]">
          <div className="px-4 pt-6 pb-20">
            <div className="flex flex-col justify-center items-center p-8">
              <h1 className="text-3xl font-medium text-[#A4AFC5] leading-tight font-inter">My Strategies</h1>
              <p className="text-sm text-[#A4AFC580] font-inter text-center py-4">Practice these strategies today, and mark them completed once you're done.</p>
            </div>
            {savedPins.length > 0 ? (
              <MasonryGrid>
                {savedPins.map((pin) => (
                  <div key={pin.id} data-pin-id={pin.id}>
                    <AdviceCard 
                      pin={pin} 
                      isGridView={true}
                      onRemove={() => handleRemovePin(pin)}
                      onDone={() => handleDonePin(pin)}
                    />
                  </div>
                ))}
              </MasonryGrid>
            ) : (
              <div className="flex items-center mt-4">
              <img 
                src="/monkey.jpeg" 
                alt="Monkey" 
                className="w-10 h-10 rounded-full mr-4"
              />
              <p className="text-[#A4AFC580] font-inter">no saved cards! head to the search tab to find some :)</p>
            </div>
            )}
            
            {completedPins.length > 0 && (
              <div className="flex flex-col justify-center items-center p-8">
                <h2 className="text-lg font-medium text-[#A4AFC5] mb-4 font-inter">Strategies I Completed</h2>
                <MasonryGrid>
                  {completedPins.map((pin) => (
                    <div key={pin.id} className="opacity-60">
                      <AdviceCard pin={pin} />
                    </div>
                  ))}
                </MasonryGrid>
              </div>
            )}
          </div>
          <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}
    </div>
  )
}
