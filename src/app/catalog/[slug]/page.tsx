'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/catalog/ProductCard'
import { ShoppingCart, CheckCircle } from 'lucide-react'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const category = categories.find(c => c.id === product.categoryId)
  const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  function handleAddToCart() {
    addItem(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
            <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-text-muted mb-1">{category?.name} · {product.brand}</p>
          <h1 className="text-3xl font-black mb-2">{product.name}</h1>
          <p className="text-text-muted mb-1">Ölçek: <span className="font-semibold text-gray-800">{product.scale}</span></p>
          <div className="flex items-center gap-2 my-4">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {product.inStock ? 'Stokta Mevcut' : 'Stok Yok'}
            </span>
          </div>
          <p className="text-4xl font-black text-primary mb-6">{formatPrice(product.price)}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <ul className="space-y-2 mb-8">
            {product.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={15} className="text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button size="lg" disabled={!product.inStock} onClick={handleAddToCart} className="w-full sm:w-auto">
            <ShoppingCart size={18} className="mr-2" />
            {added ? 'Eklendi!' : 'Sepete Ekle'}
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Benzer Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
