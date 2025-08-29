import { ReactNode } from 'react'

interface MasonryGridProps {
  children: ReactNode
  className?: string
}

export default function MasonryGrid({ children, className = '' }: MasonryGridProps) {
  return (
    <div className={`columns-2 gap-4 space-y-0 ${className}`}>
      {children}
    </div>
  )
}