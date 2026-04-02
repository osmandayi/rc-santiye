'use client'

import { useState } from 'react'
import { mockOrders } from '@/data/orders'
import { products } from '@/data/products'
import { Badge } from '@/components/ui/Badge'
import { formatPrice, cn } from '@/lib/utils'
import { ChevronDown, Package } from 'lucide-react'

export default function OrdersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black mb-8">Siparişlerim</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Henüz siparişiniz bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map(order => {
            const isExpanded = expandedId === order.id
            const orderProducts = order.items.map(item => {
              const product = products.find(p => p.id === item.productId)
              return product ? { product, quantity: item.quantity } : null
            }).filter(Boolean) as { product: typeof products[0]; quantity: number }[]

            return (
              <div key={order.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-black text-gray-900">Sipariş #{order.orderNumber}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {new Date(order.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <Badge status={order.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-primary">{formatPrice(order.total)}</span>
                    <ChevronDown
                      size={16}
                      className={cn('text-text-muted transition-transform duration-200', isExpanded && 'rotate-180')}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Ürünler</h4>
                    <div className="space-y-2 mb-4">
                      {orderProducts.map(({ product, quantity }) => (
                        <div key={product.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{product.name} <span className="text-text-muted">×{quantity}</span></span>
                          <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Teslimat Adresi</h4>
                      <p className="text-sm text-gray-700">{order.deliveryAddress.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {order.deliveryAddress.line1}, {order.deliveryAddress.district}, {order.deliveryAddress.city}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
