export interface Product {
  id: string
  name: string
  slug: string
  categoryId: string
  price: number
  images: string[]
  description: string
  features: string[]
  inStock: boolean
  isFeatured: boolean
  scale: string
  brand: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
}

export interface ServicePackage {
  id: string
  name: string
  priceRange: string
  features: string[]
  isPopular: boolean
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Stat {
  label: string
  value: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Address {
  fullName: string
  email: string
  phone: string
  line1: string
  city: string
  district: string
  postalCode: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export type OrderStatus = 'preparing' | 'shipped' | 'delivered'

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: OrderStatus
  items: CartItem[]
  total: number
  deliveryAddress: Address
}

export interface DeliveryFormValues {
  fullName: string
  email: string
  phone: string
  line1: string
  city: string
  district: string
  postalCode: string
}

export interface PaymentFormValues {
  cardNumber: string
  cardHolder: string
  expiry: string
  cvv: string
}
