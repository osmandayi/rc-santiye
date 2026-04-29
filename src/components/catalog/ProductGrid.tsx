'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductListItem } from './ProductListItem'

export type LayoutMode = 'grid' | 'list'

interface ProductGridProps {
  products: Product[]
  layout?: LayoutMode
}

export function ProductGrid({ products, layout = 'grid' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <p className="text-lg">Ürün bulunamadı.</p>
        <p className="text-sm mt-1">Farklı bir kategori veya arama terimi deneyin.</p>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {layout === 'grid' ? (
        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.5), ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.5), ease: 'easeOut' }}
            >
              <ProductListItem product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
