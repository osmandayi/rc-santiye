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
    <Card className={`overflow-hidden group hover:shadow-md transition-shadow flex flex-col ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute top-4 right-[-28px] w-28 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider text-center py-1 rotate-45 shadow-md">
              Stok Yok
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-text-muted mb-1">{product.brand} · {product.scale}</p>
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-3 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto space-y-2 text-center">
          <span className="block text-2xl font-black text-primary">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            disabled={!product.inStock}
            onClick={() => addItem(product.id)}
            className="w-full"
            aria-label="Sepete ekle"
          >
            <ShoppingCart size={14} className="mr-1.5" />
            Sepete Ekle
          </Button>
        </div>
      </div>
    </Card>
  )
}
