'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, CheckCircle } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { categories } from '@/data/categories'

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  const { addItem } = useCart()
  const category = categories.find(c => c.id === product.categoryId)

  return (
    <div className={`group flex gap-0 rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {/* Accent bar */}
      <div className="w-1 bg-gradient-to-b from-primary to-orange-300 shrink-0" />

      {/* Image */}
      <Link href={`/catalog/${product.slug}`} className="relative w-36 sm:w-44 shrink-0 bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            Stok Yok
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {category && (
              <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {category.icon} {category.name}
              </span>
            )}
            <span className="text-xs text-text-muted">{product.scale}</span>
          </div>
          <Link href={`/catalog/${product.slug}`}>
            <h3 className="font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-text-muted">{product.brand}</p>
          {product.features.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 mt-2 flex-wrap">
              {product.features.slice(0, 2).map(f => (
                <span key={f} className="flex items-center gap-1 text-[11px] text-gray-500">
                  <CheckCircle size={10} className="text-primary shrink-0" />
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
          <span className="text-2xl font-black text-primary">{formatPrice(product.price)}</span>
          <button
            disabled={!product.inStock}
            onClick={() => addItem(product.id)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <ShoppingCart size={14} />
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  )
}
