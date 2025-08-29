import { AdvicePin } from './gemini'

export interface SearchHistory {
  id: string
  query: string
  pins: AdvicePin[]
  timestamp: number
}

const SEARCH_HISTORY_KEY = 'searchHistory'
const MAX_HISTORY_ITEMS = 10

export function saveSearchToHistory(query: string, pins: AdvicePin[]): void {
  if (typeof window === 'undefined') return

  const history = getSearchHistory()
  const newSearch: SearchHistory = {
    id: `search-${Date.now()}`,
    query,
    pins,
    timestamp: Date.now()
  }

  const updatedHistory = [newSearch, ...history]
    .slice(0, MAX_HISTORY_ITEMS)

  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory))
}

export function getSearchHistory(): SearchHistory[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SEARCH_HISTORY_KEY)
}