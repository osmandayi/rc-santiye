import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import React from 'react'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('useCart', () => {
  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('p-001'))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual({ productId: 'p-001', quantity: 1 })
  })

  it('increments quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('p-001'))
    act(() => result.current.addItem('p-001'))
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalItems).toBe(2)
  })

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('p-001'))
    act(() => result.current.removeItem('p-001'))
    expect(result.current.items).toHaveLength(0)
  })

  it('updates quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('p-001'))
    act(() => result.current.updateQuantity('p-001', 5))
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('p-001'))
    act(() => result.current.addItem('p-002'))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
  })
})
