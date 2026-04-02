import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/catalog/ProductCard'
import { CartProvider } from '@/context/CartContext'
import type { Product } from '@/types'

const mockProduct: Product = {
  id: 'p-001',
  name: 'Test Vinç',
  slug: 'test-vinc',
  categoryId: 'cat-2',
  price: 1500,
  images: ['https://example.com/image.jpg'],
  description: 'Test açıklama',
  features: ['Özellik 1'],
  inStock: true,
  isFeatured: false,
  scale: '1:50',
  brand: 'BRUDER',
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />, { wrapper })
    expect(screen.getByText('Test Vinç')).toBeInTheDocument()
    expect(screen.getByText('₺1.500,00')).toBeInTheDocument()
  })

  it('shows "Sepete Ekle" button when in stock', () => {
    render(<ProductCard product={mockProduct} />, { wrapper })
    expect(screen.getByRole('button', { name: /sepete ekle/i })).toBeInTheDocument()
  })

  it('shows "Stok Yok" when out of stock', () => {
    render(<ProductCard product={{ ...mockProduct, inStock: false }} />, { wrapper })
    expect(screen.getByText(/stok yok/i)).toBeInTheDocument()
  })
})
