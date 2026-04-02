import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface OrderSummaryProps {
  subtotal: number
  showCheckoutButton?: boolean
}

const SHIPPING_FLAT_RATE = 49.9

export function OrderSummary({ subtotal, showCheckoutButton = true }: OrderSummaryProps) {
  const shipping = subtotal > 0 ? SHIPPING_FLAT_RATE : 0
  const total = subtotal + shipping

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="font-bold text-lg mb-4">Sipariş Özeti</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Ara Toplam</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Kargo</span>
          <span className="font-semibold">{subtotal > 0 ? formatPrice(shipping) : '—'}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
          <span className="font-black">Toplam</span>
          <span className="font-black text-primary text-xl">{formatPrice(total)}</span>
        </div>
      </div>
      {showCheckoutButton && subtotal > 0 && (
        <Button href="/checkout" className="w-full mt-5">Ödemeye Geç</Button>
      )}
    </div>
  )
}
