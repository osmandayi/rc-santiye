'use client'

import { categories } from '@/data/categories'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  selectedCategory: string | null
  onSelect: (slug: string | null) => void
}

export function CategoryFilter({ selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Kategoriler</h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onSelect(null)}
            className={cn(
              'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
              selectedCategory === null ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            Tümü
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <button
              onClick={() => onSelect(cat.slug)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                selectedCategory === cat.slug ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100 text-gray-700'
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
