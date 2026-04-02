'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">Stok Yok</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-text-muted mb-1">{product.brand} · {product.scale}</p>
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-black text-primary">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            disabled={!product.inStock}
            onClick={() => addItem(product.id)}
            aria-label="Sepete ekle"
          >
            <ShoppingCart size={14} className="mr-1" />
            Sepete Ekle
          </Button>
        </div>
      </div>
    </Card>
  )
}
