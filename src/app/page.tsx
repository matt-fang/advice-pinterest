'use client'

import { useState } from 'react'
import { AdvicePin } from '@/lib/gemini'
import SearchScreen from '@/components/screens/SearchScreen'
import SearchResults from '@/components/screens/SearchResults'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'search' | 'results'>('search')
  const [currentQuery, setCurrentQuery] = useState('')
  const [pins, setPins] = useState<AdvicePin[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'search' | 'grid'>('search')

  const handleSearch = async (query: string) => {
    setLoading(true)
    setCurrentQuery(query)
    setCurrentScreen('results')

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate advice')
      }

      const data = await response.json()
      setPins(data.pins)
    } catch (error) {
      console.error('Search error:', error)
      setPins([])
    } finally {
      setLoading(false)
    }
  }

  const handleBackToSearch = () => {
    setCurrentScreen('search')
    setActiveTab('search')
  }

  return (
    <div className="max-w-sm mx-auto bg-slate-900 min-h-screen">
      {currentScreen === 'search' ? (
        <SearchScreen 
          onSearch={handleSearch}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      ) : (
        <SearchResults
          query={currentQuery}
          pins={pins}
          loading={loading}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBackToSearch={handleBackToSearch}
        />
      )}
    </div>
  )
}
