import SearchIcon from '@/components/icons/SearchIcon'

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
        className="w-full bg-[#0D0D11] text-[#A4AFC5] placeholder-[#A4AFC580] rounded-full px-6 py-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-[#A4AFC550] font-inter"
      />
      <button
        onClick={onSubmit}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A4AFC5] hover:text-[#A4AFC5] transition-colors"
      >
        <SearchIcon />
      </button>
    </div>
  )
}