'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

interface CartLineItemProps {
  product: Product
  quantity: number
}

export function CartLineItem({ product, quantity }: CartLineItemProps) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <Link href={`/catalog/${product.slug}`} className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/catalog/${product.slug}`} className="font-semibold text-gray-900 hover:text-primary line-clamp-1">
          {product.name}
        </Link>
        <p className="text-xs text-text-muted mt-0.5">{product.brand} · {product.scale}</p>
        <p className="text-primary font-black mt-1">{formatPrice(product.price)}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => quantity > 1 ? updateQuantity(product.id, quantity - 1) : removeItem(product.id)}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Minus size={12} />
        </button>
        <span className="w-8 text-center font-bold text-sm">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>
      <div className="text-right shrink-0">
        <p className="font-black text-gray-900">{formatPrice(product.price * quantity)}</p>
        <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-600 mt-1 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
