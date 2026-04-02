import type { Order } from '@/types'

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '847291',
    date: '2026-03-15',
    status: 'delivered',
    items: [
      { productId: 'p-001', quantity: 1 },
      { productId: 'p-013', quantity: 2 },
    ],
    total: 2550,
    deliveryAddress: {
      fullName: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0532 111 2233',
      line1: 'Atatürk Cad. No:12 Daire:5',
      city: 'İstanbul',
      district: 'Kadıköy',
      postalCode: '34710',
    },
  },
  {
    id: 'ord-2',
    orderNumber: '915384',
    date: '2026-03-28',
    status: 'shipped',
    items: [
      { productId: 'p-010', quantity: 1 },
    ],
    total: 3200,
    deliveryAddress: {
      fullName: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0532 111 2233',
      line1: 'Atatürk Cad. No:12 Daire:5',
      city: 'İstanbul',
      district: 'Kadıköy',
      postalCode: '34710',
    },
  },
  {
    id: 'ord-3',
    orderNumber: '932017',
    date: '2026-04-01',
    status: 'preparing',
    items: [
      { productId: 'p-004', quantity: 1 },
      { productId: 'p-007', quantity: 1 },
    ],
    total: 2080,
    deliveryAddress: {
      fullName: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0532 111 2233',
      line1: 'Atatürk Cad. No:12 Daire:5',
      city: 'İstanbul',
      district: 'Kadıköy',
      postalCode: '34710',
    },
  },
]
