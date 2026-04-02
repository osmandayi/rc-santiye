import { products } from '@/data/products'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Button } from '@/components/ui/Button'

export function FeaturedProducts() {
  const featured = products.filter(p => p.isFeatured).slice(0, 4)
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-bold">Öne Çıkan Ürünler</h2>
          <Button variant="outline" href="/catalog" size="sm">Tümünü Gör</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
