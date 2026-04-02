import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, centered = false, className }: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-text-muted text-lg">{subtitle}</p>}
    </div>
  )
}
