import { useState, useEffect } from 'react'
import { SearchHistory, getSearchHistory } from '@/lib/localStorage'

interface PreviousChatsProps {
  onSelectChat: (searchHistory: SearchHistory) => void
}

export default function PreviousChats({ onSelectChat }: PreviousChatsProps) {
  const [history, setHistory] = useState<SearchHistory[]>([])

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  if (history.length === 0) {
    return null
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Previous chats</h3>
      <div className="space-y-2">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectChat(item)}
            className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
              {item.query}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {new Date(item.timestamp).toLocaleDateString()} • {item.pins.length} cards
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}