'use client'

import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { CartLineItem } from '@/components/checkout/CartLineItem'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { Button } from '@/components/ui/Button'
import { ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items } = useCart()

  const cartProducts = items
    .map(item => {
      const product = products.find(p => p.id === item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter(Boolean) as { product: (typeof products)[0]; quantity: number }[]

  const subtotal = cartProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Sepetiniz Boş</h1>
        <p className="text-text-muted mb-8">Henüz ürün eklemediniz.</p>
        <Button href="/catalog">Alışverişe Başla</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black mb-8">Sepetim</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {cartProducts.map(({ product, quantity }) => (
            <CartLineItem key={product.id} product={product} quantity={quantity} />
          ))}
          <div className="mt-4">
            <Button href="/catalog" variant="ghost" size="sm">← Alışverişe Devam Et</Button>
          </div>
        </div>
        <div>
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  )
}
