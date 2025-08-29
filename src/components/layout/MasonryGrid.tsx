import { ReactNode, Children } from 'react'

interface MasonryGridProps {
  children: ReactNode
  className?: string
}

export default function MasonryGrid({ children, className = '' }: MasonryGridProps) {
  const childrenArray = Children.toArray(children)
  const leftColumn: ReactNode[] = []
  const rightColumn: ReactNode[] = []
  
  // Distribute cards into two columns with stable gaps
  childrenArray.forEach((child, index) => {
    // Use index-based seed for consistent random gaps
    const seed = index * 9973 % 500 // Pseudo-random but deterministic
    const randomGap = (seed * 50 / 100) // 20-70px stable gap
    
    const wrappedChild = (
      <div 
        key={index} 
        style={{ marginBottom: `${randomGap}px` }}
      >
        {child}
      </div>
    )
    
    if (index % 2 === 0) {
      leftColumn.push(wrappedChild)
    } else {
      rightColumn.push(wrappedChild)
    }
  })
  
  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex-1 flex flex-col">
        {leftColumn}
      </div>
      <div className="flex-1 flex flex-col">
        {rightColumn}
      </div>
    </div>
  )
}