import { ReactNode } from 'react'

interface BaseCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function BaseCard({ children, className = '', style }: BaseCardProps) {
  return (
    <div 
      className={`break-inside-avoid mb-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}