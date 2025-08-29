import { ReactNode, useState, useEffect, useRef } from 'react'

interface BaseCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onSave?: () => void
  onRemove?: () => void
  onDone?: () => void
  pin?: { id: string; title: string; content: string }
  isGridView?: boolean
}

export default function BaseCard({ children, className = '', style, onSave, onRemove, onDone, isGridView = false }: BaseCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`break-inside-avoid mb-4 transition-all duration-700 ease-out transform relative group ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={style}
    >
      {children}
      {isGridView ? (
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onRemove && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onRemove()
              }}
              className="w-8 h-8 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {onDone && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onDone()
              }}
              className="w-8 h-8 bg-green-500/80 hover:bg-green-500 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        onSave && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onSave()
            }}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )
      )}
    </div>
  )
}