import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  preparing: { label: 'Hazırlanıyor', className: 'bg-yellow-100 text-yellow-800' },
  shipped: { label: 'Kargoda', className: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Teslim Edildi', className: 'bg-green-100 text-green-800' },
}

interface BadgeProps {
  status: OrderStatus
  className?: string
}

export function Badge({ status, className }: BadgeProps) {
  const { label, className: statusClass } = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusClass, className)}>
      {label}
    </span>
  )
}
