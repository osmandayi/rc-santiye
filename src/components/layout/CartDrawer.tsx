'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity } = useCart()

  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.productId)
    return product ? { product, quantity: item.quantity } : null
  }).filter(Boolean) as { product: typeof products[0]; quantity: number }[]

  const total = cartProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-surface z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-black text-lg text-text">Sepetim</h2>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-2 transition-colors text-text-muted hover:text-text"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {cartProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-text-muted">
              <ShoppingBag size={48} className="text-border" />
              <p className="text-sm">Sepetiniz boş</p>
              <button onClick={closeDrawer} className="text-primary text-sm font-semibold hover:underline">
                Alışverişe devam et
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cartProducts.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3 py-4">
                  <Link href={`/catalog/${product.slug}`} onClick={closeDrawer} className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/catalog/${product.slug}`} onClick={closeDrawer} className="text-sm font-semibold text-text hover:text-primary line-clamp-2 leading-tight">
                      {product.name}
                    </Link>
                    <p className="text-xs text-text-muted mt-0.5">{product.scale}</p>
                    <p className="text-primary font-black text-sm mt-1">{formatPrice(product.price * quantity)}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => quantity > 1 ? updateQuantity(product.id, quantity - 1) : removeItem(product.id)}
                        className="w-6 h-6 rounded-md border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-text-muted"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-text">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-md border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-text-muted"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartProducts.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm text-text-muted">
              <span>Ara Toplam</span>
              <span className="font-black text-text text-base">{formatPrice(total)}</span>
            </div>
            <Button href="/checkout" size="lg" className="w-full" onClick={closeDrawer}>
              Ödemeye Geç
            </Button>
            <Button href="/cart" variant="outline" size="sm" className="w-full" onClick={closeDrawer}>
              Sepeti Görüntüle
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}
