import Link from 'next/link'
import { categories } from '@/data/categories'

export function FeaturedCategories() {
  const featured = categories.slice(0, 6)
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Kategoriler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {featured.map(cat => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-200 group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/catalog" className="text-primary font-semibold hover:underline text-sm">
            Tüm kategorileri gör →
          </Link>
        </div>
      </div>
    </section>
  )
}
