import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  className?: string
}

export default function SearchInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "What's been on your mind?",
  className = '' 
}: SearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full bg-slate-800 text-white placeholder-gray-400 rounded-2xl px-6 py-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
      />
      <button
        onClick={onSubmit}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <Search size={20} />
      </button>
    </div>
  )
}