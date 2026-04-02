import type { DeliveryFormValues, CartItem } from '@/types'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { MapPin } from 'lucide-react'

const SHIPPING = 49.9

interface OrderReviewProps {
  delivery: DeliveryFormValues
  items: CartItem[]
  onConfirm: () => void
  onBack: () => void
}

export function OrderReview({ delivery, items, onConfirm, onBack }: OrderReviewProps) {
  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.productId)!
    return { product, quantity: item.quantity }
  })
  const subtotal = cartProducts.reduce((s, { product, quantity }) => s + product.price * quantity, 0)
  const total = subtotal + SHIPPING

  return (
    <div className="space-y-6">
      {/* Delivery */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-primary" />
          <span className="font-semibold text-sm">Teslimat Adresi</span>
        </div>
        <p className="text-sm text-gray-700">{delivery.fullName}</p>
        <p className="text-sm text-gray-600">{delivery.line1}, {delivery.district}, {delivery.city} {delivery.postalCode}</p>
        <p className="text-sm text-gray-600">{delivery.phone} · {delivery.email}</p>
      </div>

      {/* Items */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Ürünler</h3>
        <div className="space-y-2">
          {cartProducts.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{product.name} <span className="text-text-muted">×{quantity}</span></span>
              <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Ara Toplam</span><span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Kargo</span><span>{formatPrice(SHIPPING)}</span>
          </div>
          <div className="flex justify-between font-black text-base pt-1">
            <span>Toplam</span><span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Geri</Button>
        <Button onClick={onConfirm} className="flex-1">Siparişi Onayla ✓</Button>
      </div>
    </div>
  )
}
