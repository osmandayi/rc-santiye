'use client'

import { useState, useMemo } from 'react'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { CategoryFilter } from '@/components/catalog/CategoryFilter'
import { SearchBar } from '@/components/catalog/SearchBar'

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name'

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('default')

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedCategory) {
      const cat = categories.find(c => c.slug === selectedCategory)
      if (cat) result = result.filter(p => p.categoryId === cat.id)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
    }
    if (sortKey === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortKey === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortKey === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
    return result
  }, [selectedCategory, searchQuery, sortKey])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black mb-8">Ürün Kataloğu</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
        </aside>

        {/* Main */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="default">Varsayılan Sıralama</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="name">İsim (A-Z)</option>
            </select>
          </div>
          <p className="text-sm text-text-muted mb-4">{filtered.length} ürün bulundu</p>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
