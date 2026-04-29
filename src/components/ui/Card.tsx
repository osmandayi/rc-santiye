import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-surface rounded-2xl shadow-sm border border-border', className)}>
      {children}
    </div>
  )
}
