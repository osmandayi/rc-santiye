# RC İnşaat Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full static Next.js 14 + TypeScript website for RC İnşaat — construction toy e-commerce with birthday party organization services and a complete mock iyzico checkout flow.

**Architecture:** All pages statically rendered via App Router. Content sourced from TypeScript data files in `src/data/`. Cart state managed via React Context (client-side only). Theme controlled via CSS variables from `src/config/theme.ts`. No backend — payment form mocks iyzico fields, submits to a local mock handler.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Lucide React, Jest, React Testing Library

---

## File Map

```
rc-building/
  src/
    app/
      layout.tsx                      root layout, theme injection
      globals.css                     CSS variables + base styles
      page.tsx                        home page
      catalog/page.tsx                product catalog
      catalog/[slug]/page.tsx         product detail
      organization/page.tsx           organization services
      about/page.tsx                  about / vision
      contact/page.tsx                contact form
      cart/page.tsx                   shopping cart
      checkout/page.tsx               3-step checkout
      order-confirmation/page.tsx     post-payment success
      orders/page.tsx                 order history
    components/
      layout/
        Header.tsx
        Footer.tsx
        Navigation.tsx
      ui/
        Button.tsx
        Card.tsx
        Badge.tsx
      home/
        Hero.tsx
        FeaturedCategories.tsx
        ServicesSummary.tsx
        FeaturedProducts.tsx
        WhyUs.tsx
        CtaBanner.tsx
      catalog/
        ProductCard.tsx
        ProductGrid.tsx
        CategoryFilter.tsx
        SearchBar.tsx
      organization/
        PackageCard.tsx
        HowItWorks.tsx
        Faq.tsx
      checkout/
        CartLineItem.tsx
        OrderSummary.tsx
        CheckoutStepper.tsx
        DeliveryForm.tsx
        PaymentForm.tsx
        OrderReview.tsx
      shared/
        SectionTitle.tsx
        StatsBar.tsx
    config/
      theme.ts
    context/
      CartContext.tsx
    data/
      categories.ts
      navigation.ts
      products.ts
      services.ts
      faq.ts
      stats.ts
      orders.ts
    lib/
      utils.ts
    types/
      index.ts
  __tests__/
    lib/utils.test.ts
    context/CartContext.test.tsx
    components/ui/Button.test.tsx
    components/catalog/ProductCard.test.tsx
```

---

## Task 1: Initialize Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `jest.config.ts`, `jest.setup.ts`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd "C:/Users/Pc/Desktop/Projects/rc-building"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Expected: project scaffolded with `src/app/`, `tailwind.config.ts`, `tsconfig.json`.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install lucide-react clsx
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

- [ ] **Step 3: Configure Jest**

Create `jest.config.ts`:
```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Verify setup**

```bash
npx next dev
```

Expected: Next.js dev server starts at `http://localhost:3000` with default page.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 14 project with TypeScript, Tailwind, Jest"
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Write all shared types**

Create `src/types/index.ts`:
```ts
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
```

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Theme System

**Files:**
- Create: `src/config/theme.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create theme config**

Create `src/config/theme.ts`:
```ts
export interface Theme {
  primary: string
  primaryDark: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
}

export const themes: Record<string, Theme> = {
  construction: {
    primary: '#F97316',
    primaryDark: '#C2410C',
    secondary: '#1C1917',
    accent: '#FCD34D',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
  },
  ocean: {
    primary: '#0EA5E9',
    primaryDark: '#0369A1',
    secondary: '#0F172A',
    accent: '#38BDF8',
    background: '#F0F9FF',
    surface: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
  },
  forest: {
    primary: '#16A34A',
    primaryDark: '#15803D',
    secondary: '#1C2B1E',
    accent: '#86EFAC',
    background: '#F0FDF4',
    surface: '#FFFFFF',
    text: '#14532D',
    textMuted: '#6B7280',
  },
  minimal: {
    primary: '#111827',
    primaryDark: '#030712',
    secondary: '#374151',
    accent: '#9CA3AF',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
  },
}

export const activeTheme: Theme = themes.construction
```

- [ ] **Step 2: Write CSS variables into globals.css**

Replace contents of `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #F97316;
  --color-primary-dark: #C2410C;
  --color-secondary: #1C1917;
  --color-accent: #FCD34D;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #111827;
  --color-text-muted: #6B7280;
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
}
```

- [ ] **Step 3: Extend Tailwind config to use CSS variables**

Edit `tailwind.config.ts` — replace the `theme.extend` section:
```ts
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      'primary-dark': 'var(--color-primary-dark)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
      surface: 'var(--color-surface)',
      'text-muted': 'var(--color-text-muted)',
    },
  },
},
```

- [ ] **Step 4: Commit**

```bash
git add src/config/theme.ts src/app/globals.css tailwind.config.ts
git commit -m "feat: add theme system with CSS variables and 4 preset themes"
```

---

## Task 4: Utility Functions

**Files:**
- Create: `src/lib/utils.ts`
- Create: `__tests__/lib/utils.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/lib/utils.test.ts`:
```ts
import { formatPrice, slugify, cn } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats number as Turkish lira', () => {
    expect(formatPrice(1250)).toBe('₺1.250,00')
  })
  it('formats zero', () => {
    expect(formatPrice(0)).toBe('₺0,00')
  })
})

describe('slugify', () => {
  it('converts spaces to hyphens and lowercases', () => {
    expect(slugify('Liebherr LTM 1300')).toBe('liebherr-ltm-1300')
  })
  it('removes special characters', () => {
    expect(slugify('CAT 320 Ekskavatör')).toBe('cat-320-ekskavatör')
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
  it('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined)).toBe('foo')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npx jest __tests__/lib/utils.test.ts
```

Expected: FAIL — "Cannot find module '@/lib/utils'"

- [ ] **Step 3: Implement utils**

Create `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\u00C0-\u024F]/g, '')
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest __tests__/lib/utils.test.ts
```

Expected: PASS — 5 tests

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts __tests__/lib/utils.test.ts
git commit -m "feat: add utility functions (formatPrice, slugify, cn)"
```

---

## Task 5: Mock Data — Categories & Navigation

**Files:**
- Create: `src/data/categories.ts`
- Create: `src/data/navigation.ts`

- [ ] **Step 1: Create categories data**

Create `src/data/categories.ts`:
```ts
import type { Category } from '@/types'

export const categories: Category[] = [
  { id: 'cat-1', name: 'Ekskavatörler', slug: 'ekskavatörler', icon: '🏗️' },
  { id: 'cat-2', name: 'Vinçler', slug: 'vinçler', icon: '🏛️' },
  { id: 'cat-3', name: 'Buldozerler', slug: 'buldozerler', icon: '🚜' },
  { id: 'cat-4', name: 'Kamyonlar', slug: 'kamyonlar', icon: '🚛' },
  { id: 'cat-5', name: 'Mixerler', slug: 'mixerler', icon: '🔄' },
  { id: 'cat-6', name: 'Forkliftler', slug: 'forkliftler', icon: '🏭' },
  { id: 'cat-7', name: 'Kepçeler', slug: 'kepçeler', icon: '⛏️' },
  { id: 'cat-8', name: 'Yükleyiciler', slug: 'yükleyiciler', icon: '🚧' },
  { id: 'cat-9', name: 'İnşaat Setleri', slug: 'inşaat-setleri', icon: '📦' },
  { id: 'cat-10', name: 'Aksesuarlar', slug: 'aksesuarlar', icon: '🔧' },
  { id: 'cat-11', name: 'Özel Seriler', slug: 'özel-seriler', icon: '⭐' },
]
```

- [ ] **Step 2: Create navigation data**

Create `src/data/navigation.ts`:
```ts
import type { NavLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Ürünler', href: '/catalog' },
  { label: 'Organizasyon', href: '/organization' },
  { label: 'Hakkımızda', href: '/about' },
  { label: 'İletişim', href: '/contact' },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/categories.ts src/data/navigation.ts
git commit -m "feat: add categories and navigation mock data"
```

---

## Task 6: Mock Data — Products

**Files:**
- Create: `src/data/products.ts`

- [ ] **Step 1: Create products data**

Create `src/data/products.ts`:
```ts
import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'p-001',
    name: 'Liebherr LTM 1300 Mobil Vinç',
    slug: 'liebherr-ltm-1300-mobil-vinc',
    categoryId: 'cat-2',
    price: 1850,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    ],
    description: 'Liebherr LTM 1300 mobil vincinin 1:50 ölçekli diecast replika modeli. Metal gövde, dönen bom, gerçekçi detaylar.',
    features: ['1:50 Ölçek', 'Metal gövde', 'Döner bom', 'Açılır destekler', 'BRUDER lisanslı'],
    inStock: true,
    isFeatured: true,
    scale: '1:50',
    brand: 'BRUDER',
  },
  {
    id: 'p-002',
    name: 'CAT 320 Ekskavatör',
    slug: 'cat-320-ekskavatör',
    categoryId: 'cat-1',
    price: 1250,
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    ],
    description: 'CAT 320 ekskavatörün 1:50 ölçekli metal replika modeli. Eklem kolları hareketli.',
    features: ['1:50 Ölçek', 'Metal + plastik', 'Hareketli kol', 'CAT lisanslı'],
    inStock: true,
    isFeatured: true,
    scale: '1:50',
    brand: 'SIKU',
  },
  {
    id: 'p-003',
    name: 'Volvo FH Beton Mikseri',
    slug: 'volvo-fh-beton-mikseri',
    categoryId: 'cat-5',
    price: 975,
    images: [
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600',
    ],
    description: 'Volvo FH serisi beton mikseri. Dönen tambur, metal kabin.',
    features: ['1:50 Ölçek', 'Dönen tambur', 'Metal kabin', 'Volvo lisanslı'],
    inStock: true,
    isFeatured: false,
    scale: '1:50',
    brand: 'SIKU',
  },
  {
    id: 'p-004',
    name: 'Liebherr PR 776 Buldozer',
    slug: 'liebherr-pr-776-buldozer',
    categoryId: 'cat-3',
    price: 1100,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    ],
    description: 'Devasa Liebherr PR 776 buldozerin 1:50 ölçekli modeli. Çelik palet görünümü.',
    features: ['1:50 Ölçek', 'Metal bıçak', 'Palet görünümü', 'Liebherr lisanslı'],
    inStock: true,
    isFeatured: true,
    scale: '1:50',
    brand: 'BRUDER',
  },
  {
    id: 'p-005',
    name: 'MAN TGS Damperli Kamyon',
    slug: 'man-tgs-damperli-kamyon',
    categoryId: 'cat-4',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?w=600',
    ],
    description: 'MAN TGS damperli kamyon modeli. Açılır damper mekanizması.',
    features: ['1:50 Ölçek', 'Açılır damper', 'Metal kabin', 'MAN lisanslı'],
    inStock: true,
    isFeatured: false,
    scale: '1:50',
    brand: 'BRUDER',
  },
  {
    id: 'p-006',
    name: 'Toyota 02-8FDF25 Forklift',
    slug: 'toyota-forklift-02-8fdf25',
    categoryId: 'cat-6',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    ],
    description: 'Toyota endüstriyel forklift modeli. Hareketli çatal mekanizması.',
    features: ['1:25 Ölçek', 'Hareketli çatal', 'Döner koltuk', 'Toyota lisanslı'],
    inStock: false,
    isFeatured: false,
    scale: '1:25',
    brand: 'SIKU',
  },
  {
    id: 'p-007',
    name: 'Caterpillar 950M Tekerlekli Yükleyici',
    slug: 'caterpillar-950m-yükleyici',
    categoryId: 'cat-8',
    price: 980,
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
    ],
    description: 'CAT 950M tekerlekli yükleyici. Hareketli kova ve eklem.',
    features: ['1:50 Ölçek', 'Hareketli kova', 'Döner eklem', 'CAT lisanslı'],
    inStock: true,
    isFeatured: true,
    scale: '1:50',
    brand: 'DIECAST MASTERS',
  },
  {
    id: 'p-008',
    name: 'Komatsu PC490LC Ekskavatör',
    slug: 'komatsu-pc490lc-ekskavatör',
    categoryId: 'cat-1',
    price: 1350,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    ],
    description: 'Komatsu PC490LC büyük ekskavatörün metal diecast modeli.',
    features: ['1:50 Ölçek', 'Metal gövde', 'Hareketli kol', 'Komatsu lisanslı'],
    inStock: true,
    isFeatured: false,
    scale: '1:50',
    brand: 'DIECAST MASTERS',
  },
  {
    id: 'p-009',
    name: 'Liebherr LB 28 Delici Makine',
    slug: 'liebherr-lb-28-delici',
    categoryId: 'cat-7',
    price: 2100,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    ],
    description: 'Liebherr LB 28 delici makine modeli. Koleksiyonluk sınırlı üretim.',
    features: ['1:50 Ölçek', 'Sınırlı üretim', 'Metal gövde', 'Liebherr lisanslı'],
    inStock: true,
    isFeatured: true,
    scale: '1:50',
    brand: 'BRUDER',
  },
  {
    id: 'p-010',
    name: 'Büyük İnşaat Sahası Seti',
    slug: 'büyük-inşaat-sahası-seti',
    categoryId: 'cat-9',
    price: 3200,
    images: [
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600',
    ],
    description: '8 araç + trafik konileri + işçi figürleri içeren kapsamlı inşaat sahası oyun seti.',
    features: ['8 araç dahil', 'Figürler dahil', 'Aksesuarlar dahil', 'Hediye kutulu'],
    inStock: true,
    isFeatured: true,
    scale: 'Karma',
    brand: 'RC İnşaat',
  },
  {
    id: 'p-011',
    name: 'Volvo EC480E Paletli Ekskavatör',
    slug: 'volvo-ec480e-paletli-ekskavatör',
    categoryId: 'cat-1',
    price: 1450,
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
    ],
    description: 'Volvo EC480E paletli ekskavatör modeli. Sarı-siyah Volvo renk şeması.',
    features: ['1:50 Ölçek', 'Metal palet', 'Hareketli kol', 'Volvo lisanslı'],
    inStock: true,
    isFeatured: false,
    scale: '1:50',
    brand: 'SIKU',
  },
  {
    id: 'p-012',
    name: 'Demag AC 300-6 Mobil Vinç',
    slug: 'demag-ac300-6-mobil-vinc',
    categoryId: 'cat-2',
    price: 2250,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    ],
    description: 'Demag AC 300-6 altı akslı mobil vinç modeli. Uzayan teleskopik bom.',
    features: ['1:50 Ölçek', 'Teleskopik bom', '6 aks', 'Demag lisanslı'],
    inStock: false,
    isFeatured: false,
    scale: '1:50',
    brand: 'BRUDER',
  },
  {
    id: 'p-013',
    name: 'Aksesuarlar Başlangıç Paketi',
    slug: 'aksesuarlar-başlangıç-paketi',
    categoryId: 'cat-10',
    price: 350,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
    ],
    description: 'Trafik konileri, barikatlar, yol işaretleri ve işçi figürlerinden oluşan başlangıç paketi.',
    features: ['24 parça', 'Plastik malzeme', 'Her ölçekle uyumlu'],
    inStock: true,
    isFeatured: false,
    scale: 'Evrensel',
    brand: 'RC İnşaat',
  },
  {
    id: 'p-014',
    name: 'CAT D11T Buldozer Özel Seri',
    slug: 'cat-d11t-buldozer-özel-seri',
    categoryId: 'cat-11',
    price: 3800,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    ],
    description: 'CAT D11T büyük buldozerin altın kaplama özel seri koleksiyonluk modeli. Numaralı sertifikalı.',
    features: ['1:50 Ölçek', 'Altın kaplama', 'Numaralı sertifika', 'Özel kutu'],
    inStock: true,
    isFeatured: true,
    scale: '1:50',
    brand: 'DIECAST MASTERS',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/products.ts
git commit -m "feat: add mock product data (14 construction toys)"
```

---

## Task 7: Mock Data — Services, FAQ, Stats, Orders

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/faq.ts`
- Create: `src/data/stats.ts`
- Create: `src/data/orders.ts`

- [ ] **Step 1: Create services data**

Create `src/data/services.ts`:
```ts
import type { ServicePackage } from '@/types'

export const servicePackages: ServicePackage[] = [
  {
    id: 'svc-1',
    name: 'Temel Paket',
    priceRange: '₺2.500 – ₺4.000',
    features: [
      'Mekan dekorasyonu (inşaat teması)',
      'İnşaat oyuncağı masaüstü süsler',
      '10 kişiye kadar',
      'Temalı masa örtüsü & balon',
      '2 saatlik etkinlik',
    ],
    isPopular: false,
  },
  {
    id: 'svc-2',
    name: 'Standart Paket',
    priceRange: '₺4.500 – ₺7.000',
    features: [
      'Temel Paket + tüm özellikler',
      '25 kişiye kadar',
      'Profesyonel fotoğraf çekimi',
      'Çocuklara hediye oyuncak',
      'Özel pasta dekorasyonu',
      '3 saatlik etkinlik',
      'Animatör eşliği',
    ],
    isPopular: true,
  },
  {
    id: 'svc-3',
    name: 'Premium Paket',
    priceRange: '₺8.000 – ₺15.000',
    features: [
      'Standart Paket + tüm özellikler',
      'Sınırsız misafir',
      'Video çekim & kurgu',
      'VIP oyuncak hediye sepeti',
      'Mekan belirleme desteği',
      'Tüm gün etkinlik',
      'Catering koordinasyonu',
      'Kişisel organizasyon danışmanı',
    ],
    isPopular: false,
  },
]
```

- [ ] **Step 2: Create FAQ data**

Create `src/data/faq.ts`:
```ts
import type { FaqItem } from '@/types'

export const faqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Organizasyon için ne kadar önceden rezervasyon yapmalıyım?',
    answer: 'En az 2 hafta öncesinden rezervasyon öneriyoruz. Yaz ve tatil dönemlerinde 4 hafta önceden planlamanızı tavsiye ederiz.',
  },
  {
    id: 'faq-2',
    question: 'Mekanı siz mi sağlıyorsunuz?',
    answer: 'Premium pakette mekan belirleme desteği sunuyoruz. Diğer paketlerde kendi mekanınızı temin etmeniz gerekiyor ancak dekorasyon ekibimiz her mekana uyum sağlar.',
  },
  {
    id: 'faq-3',
    question: 'Kaç yaş çocuklar için uygun?',
    answer: '3-12 yaş arası çocuklar için idealdir. Farklı yaş gruplarına yönelik oyun alanları ve aktiviteler tasarlıyoruz.',
  },
  {
    id: 'faq-4',
    question: 'İptal politikanız nedir?',
    answer: 'Etkinlikten 7 gün önce yapılan iptallerde ödemenin %80\'ini iade ediyoruz. 3-7 gün arasında %50, 3 gün içinde iade yapılmamaktadır.',
  },
  {
    id: 'faq-5',
    question: 'Oyuncaklar etkinlik sonrası çocuklarda mı kalıyor?',
    answer: 'Standart ve Premium paketlerde çocuklara hediye oyuncak verilmektedir. Temel pakette bu hizmet dahil değildir ancak ek ücretle eklenebilir.',
  },
]
```

- [ ] **Step 3: Create stats data**

Create `src/data/stats.ts`:
```ts
import type { Stat } from '@/types'

export const stats: Stat[] = [
  { label: 'Ürün Çeşidi', value: '200+' },
  { label: 'Düzenlenen Organizasyon', value: '500+' },
  { label: 'Mutlu Müşteri', value: '3.000+' },
  { label: 'Yıllık Deneyim', value: '8' },
]
```

- [ ] **Step 4: Create mock orders data**

Create `src/data/orders.ts`:
```ts
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
```

- [ ] **Step 5: Commit**

```bash
git add src/data/services.ts src/data/faq.ts src/data/stats.ts src/data/orders.ts
git commit -m "feat: add services, faq, stats, and mock orders data"
```

---

## Task 8: Cart Context

**Files:**
- Create: `src/context/CartContext.tsx`
- Create: `__tests__/context/CartContext.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/context/CartContext.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npx jest __tests__/context/CartContext.test.tsx
```

Expected: FAIL — "Cannot find module '@/context/CartContext'"

- [ ] **Step 3: Implement CartContext**

Create `src/context/CartContext.tsx`:
```tsx
'use client'

import React, { createContext, useContext, useState } from 'react'
import type { CartItem } from '@/types'

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  function addItem(productId: string) {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId)
      if (existing) {
        return prev.map(i =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  function removeItem(productId: string) {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, totalItems, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest __tests__/context/CartContext.test.tsx
```

Expected: PASS — 6 tests

- [ ] **Step 5: Commit**

```bash
git add src/context/CartContext.tsx __tests__/context/CartContext.test.tsx
git commit -m "feat: add CartContext with add/remove/update/clear operations"
```

---

## Task 9: UI Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `__tests__/components/ui/Button.test.tsx`

- [ ] **Step 1: Write Button tests**

Create `__tests__/components/ui/Button.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Tıkla</Button>)
    expect(screen.getByRole('button', { name: 'Tıkla' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Tıkla</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as disabled', () => {
    render(<Button disabled>Tıkla</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run Button tests — verify they fail**

```bash
npx jest __tests__/components/ui/Button.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement Button**

Create `src/components/ui/Button.tsx`:
```tsx
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:opacity-90',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Implement Card**

Create `src/components/ui/Card.tsx`:
```tsx
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-surface rounded-2xl shadow-sm border border-gray-100', className)}>
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Implement Badge**

Create `src/components/ui/Badge.tsx`:
```tsx
import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  preparing: { label: 'Hazırlanıyor', className: 'bg-yellow-100 text-yellow-800' },
  shipped: { label: 'Kargoda', className: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Teslim Edildi', className: 'bg-green-100 text-green-800' },
}

interface BadgeProps {
  status: OrderStatus
  className?: string
}

export function Badge({ status, className }: BadgeProps) {
  const { label, className: statusClass } = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusClass, className)}>
      {label}
    </span>
  )
}
```

- [ ] **Step 6: Run Button tests — verify they pass**

```bash
npx jest __tests__/components/ui/Button.test.tsx
```

Expected: PASS — 3 tests

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/ __tests__/components/ui/
git commit -m "feat: add Button, Card, Badge UI primitives"
```

---

## Task 10: Layout Components

**Files:**
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Implement Navigation**

Create `src/components/layout/Navigation.tsx`:
```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/navigation'
import { cn } from '@/lib/utils'

export function Navigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname()
  return (
    <nav className={cn('flex', mobile ? 'flex-col gap-4' : 'items-center gap-6')}>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'font-medium transition-colors duration-200',
            pathname === link.href
              ? 'text-primary'
              : 'text-gray-600 hover:text-primary'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
```

- [ ] **Step 2: Implement Header**

Create `src/components/layout/Header.tsx`:
```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Navigation } from './Navigation'
import { useCart } from '@/context/CartContext'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary tracking-tight">RC</span>
            <span className="text-2xl font-bold text-secondary">İnşaat</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex">
            <Navigation />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Menüyü aç"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 bg-surface">
          <Navigation mobile />
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Implement Footer**

Create `src/components/layout/Footer.tsx`:
```tsx
import Link from 'next/link'
import { navLinks } from '@/data/navigation'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-black text-primary">RC</span>
              <span className="text-2xl font-bold text-white">İnşaat</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kaliteli inşaat oyuncakları ve unutulmaz doğum günü organizasyonları için doğru adres.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={15} className="text-primary shrink-0" />
                <span>0212 555 66 77</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={15} className="text-primary shrink-0" />
                <span>info@rcinsaat.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <span>Bağcılar, İstanbul</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} RC İnşaat. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Header, Footer, Navigation layout components"
```

---

## Task 11: Shared Components & Root Layout

**Files:**
- Create: `src/components/shared/SectionTitle.tsx`
- Create: `src/components/shared/StatsBar.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Implement SectionTitle**

Create `src/components/shared/SectionTitle.tsx`:
```tsx
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, centered = false, className }: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-text-muted text-lg">{subtitle}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Implement StatsBar**

Create `src/components/shared/StatsBar.tsx`:
```tsx
import { stats } from '@/data/stats'

export function StatsBar() {
  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(stat => (
            <div key={stat.label}>
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className="text-orange-100 text-sm mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update root layout**

Replace `src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RC İnşaat — İnşaat Oyuncakları & Organizasyon',
  description: 'Kaliteli inşaat oyuncakları satışı ve inşaat temalı doğum günü organizasyonu hizmetleri.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/ src/app/layout.tsx
git commit -m "feat: add SectionTitle, StatsBar, and wire up root layout"
```

---

## Task 12: Home Page

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/FeaturedCategories.tsx`
- Create: `src/components/home/ServicesSummary.tsx`
- Create: `src/components/home/FeaturedProducts.tsx`
- Create: `src/components/home/WhyUs.tsx`
- Create: `src/components/home/CtaBanner.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implement Hero**

Create `src/components/home/Hero.tsx`:
```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600')" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-2xl">
          <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Türkiye'nin İnşaat Oyuncağı Uzmanı
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Gerçek İnşaat Deneyimi<br />
            <span className="text-primary">Küçük Ellerde</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
            200'den fazla lisanslı inşaat oyuncağı ve unutulmaz doğum günü organizasyonları için doğru adrestesiniz.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/catalog">Ürünleri Keşfet</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary" asChild>
              <Link href="/organization">Organizasyon</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

Note: `Button` needs `asChild` support. Update `src/components/ui/Button.tsx` — add `asChild?: boolean` prop. When `asChild` is true, render `children` directly (use Slot pattern or simply skip the button wrapper and clone children). For simplicity, add a `href` prop that renders an anchor:

Update `src/components/ui/Button.tsx` — add at the bottom of the component:
```tsx
// In ButtonProps add:
//   href?: string
// In render: if href, return <Link href={href} className={...}>{children}</Link>
// Otherwise return <button ...>
```

Full updated Button:
```tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:opacity-90',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export function Button({ variant = 'primary', size = 'md', className, children, href, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  )
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }
  return <button className={classes} {...props}>{children}</button>
}
```

Remove `asChild` usage — use `href` prop instead. Update `Hero.tsx` accordingly:
```tsx
<Button size="lg" href="/catalog">Ürünleri Keşfet</Button>
<Button size="lg" variant="outline" href="/organization" className="border-white text-white hover:bg-white hover:text-secondary">
  Organizasyon
</Button>
```

- [ ] **Step 2: Implement FeaturedCategories**

Create `src/components/home/FeaturedCategories.tsx`:
```tsx
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
```

- [ ] **Step 3: Implement ServicesSummary**

Create `src/components/home/ServicesSummary.tsx`:
```tsx
import Link from 'next/link'
import { ShoppingBag, PartyPopper, Building2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const services = [
  {
    icon: ShoppingBag,
    title: 'Ürün Satışı',
    description: '200+ lisanslı inşaat oyuncağı. BRUDER, SIKU, Diecast Masters ve daha fazlası.',
    href: '/catalog',
  },
  {
    icon: PartyPopper,
    title: 'Organizasyon',
    description: 'İnşaat temalı unutulmaz doğum günü partileri. 3 farklı paket seçeneği.',
    href: '/organization',
  },
  {
    icon: Building2,
    title: 'Kurumsal Paketler',
    description: 'Okul ve kurum etkinlikleri için özel toplu sipariş ve organizasyon paketleri.',
    href: '/contact',
  },
]

export function ServicesSummary() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(svc => (
            <Card key={svc.title} className="p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svc.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{svc.description}</p>
              <Link href={svc.href} className="text-primary font-semibold text-sm hover:underline">
                Daha Fazla →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Implement FeaturedProducts**

Create `src/components/home/FeaturedProducts.tsx`:
```tsx
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
```

- [ ] **Step 5: Implement WhyUs**

Create `src/components/home/WhyUs.tsx`:
```tsx
import { Shield, Truck, Star, Headphones } from 'lucide-react'

const reasons = [
  { icon: Shield, title: 'Kaliteli Ürünler', description: 'Tüm ürünlerimiz lisanslı ve kalite sertifikalı markalardan.' },
  { icon: Truck, title: 'Hızlı Teslimat', description: 'Türkiye genelinde 2-3 iş günü içinde kapınıza teslim.' },
  { icon: Star, title: 'Özel Organizasyon', description: 'Her detayı düşünülmüş, kişiye özel organizasyon deneyimi.' },
  { icon: Headphones, title: 'Müşteri Desteği', description: 'Satış öncesi ve sonrası 7/24 WhatsApp desteği.' },
]

export function WhyUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Neden RC İnşaat?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map(r => (
            <div key={r.title} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4">
                <r.icon size={26} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Implement CtaBanner**

Create `src/components/home/CtaBanner.tsx`:
```tsx
import { Button } from '@/components/ui/Button'

export function CtaBanner() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          Unutulmaz bir organizasyon için<br />
          <span className="text-primary">bizi arayın</span>
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Çocuğunuzun doğum gününü inşaat temalı bir maceraya dönüştürelim.
        </p>
        <Button size="lg" href="/contact">İletişime Geç</Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Assemble home page**

Replace `src/app/page.tsx`:
```tsx
import { Hero } from '@/components/home/Hero'
import { FeaturedCategories } from '@/components/home/FeaturedCategories'
import { ServicesSummary } from '@/components/home/ServicesSummary'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { WhyUs } from '@/components/home/WhyUs'
import { StatsBar } from '@/components/shared/StatsBar'
import { CtaBanner } from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ServicesSummary />
      <FeaturedProducts />
      <StatsBar />
      <WhyUs />
      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 8: Verify in browser**

```bash
npx next dev
```

Navigate to `http://localhost:3000`. Expected: home page renders with hero, categories, services, products, stats, and CTA sections.

- [ ] **Step 9: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: build home page with all sections"
```

---

## Task 13: Product Catalog Components

**Files:**
- Create: `src/components/catalog/ProductCard.tsx`
- Create: `src/components/catalog/ProductGrid.tsx`
- Create: `src/components/catalog/CategoryFilter.tsx`
- Create: `src/components/catalog/SearchBar.tsx`
- Create: `__tests__/components/catalog/ProductCard.test.tsx`

- [ ] **Step 1: Write ProductCard tests**

Create `__tests__/components/catalog/ProductCard.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npx jest __tests__/components/catalog/ProductCard.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Implement ProductCard**

Create `src/components/catalog/ProductCard.tsx`:
```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">Stok Yok</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-text-muted mb-1">{product.brand} · {product.scale}</p>
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-black text-primary">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            disabled={!product.inStock}
            onClick={() => addItem(product.id)}
            aria-label="Sepete ekle"
          >
            <ShoppingCart size={14} className="mr-1" />
            Sepete Ekle
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npx jest __tests__/components/catalog/ProductCard.test.tsx
```

Expected: PASS — 3 tests

- [ ] **Step 5: Implement ProductGrid**

Create `src/components/catalog/ProductGrid.tsx`:
```tsx
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <p className="text-lg">Ürün bulunamadı.</p>
        <p className="text-sm mt-1">Farklı bir kategori veya arama terimi deneyin.</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Implement CategoryFilter**

Create `src/components/catalog/CategoryFilter.tsx`:
```tsx
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
```

- [ ] **Step 7: Implement SearchBar**

Create `src/components/catalog/SearchBar.tsx`:
```tsx
'use client'

import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Ürün ara...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </div>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/catalog/ __tests__/components/catalog/
git commit -m "feat: add ProductCard, ProductGrid, CategoryFilter, SearchBar components"
```

---

## Task 14: Catalog Page

**Files:**
- Create: `src/app/catalog/page.tsx`
- Create: `src/app/catalog/[slug]/page.tsx`

- [ ] **Step 1: Implement catalog page**

Create `src/app/catalog/page.tsx`:
```tsx
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
```

- [ ] **Step 2: Implement product detail page**

Create `src/app/catalog/[slug]/page.tsx`:
```tsx
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
```

- [ ] **Step 3: Verify in browser**

```bash
npx next dev
```

Navigate to `http://localhost:3000/catalog`. Test search, filter by category, sorting. Click a product to verify detail page.

- [ ] **Step 4: Commit**

```bash
git add src/app/catalog/
git commit -m "feat: add catalog and product detail pages with search/filter/sort"
```

---

## Task 15: Organization Page

**Files:**
- Create: `src/components/organization/PackageCard.tsx`
- Create: `src/components/organization/HowItWorks.tsx`
- Create: `src/components/organization/Faq.tsx`
- Create: `src/app/organization/page.tsx`

- [ ] **Step 1: Implement PackageCard**

Create `src/components/organization/PackageCard.tsx`:
```tsx
import { CheckCircle } from 'lucide-react'
import type { ServicePackage } from '@/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PackageCardProps {
  pkg: ServicePackage
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className={cn('p-6 flex flex-col', pkg.isPopular && 'border-2 border-primary ring-2 ring-primary/20 relative')}>
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
          En Popüler
        </div>
      )}
      <h3 className="text-xl font-black mb-1">{pkg.name}</h3>
      <p className="text-2xl font-black text-primary mb-6">{pkg.priceRange}</p>
      <ul className="space-y-3 flex-1 mb-8">
        {pkg.features.map(feature => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
      <Button href="/contact" variant={pkg.isPopular ? 'primary' : 'outline'} className="w-full">
        Teklif Al
      </Button>
    </Card>
  )
}
```

- [ ] **Step 2: Implement HowItWorks**

Create `src/components/organization/HowItWorks.tsx`:
```tsx
import { Phone, Calendar, PartyPopper } from 'lucide-react'

const steps = [
  { icon: Phone, step: '01', title: 'İletişime Geçin', description: 'Bize ulaşın, tarih ve kişi sayısı gibi temel bilgileri paylaşın.' },
  { icon: Calendar, step: '02', title: 'Planlama', description: 'Uzman ekibimiz sizinle iletişimde kalarak tüm detayları planlar.' },
  { icon: PartyPopper, step: '03', title: 'Etkinlik Günü', description: 'Siz sadece eğlenin, gerisini biz halledelim.' },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-primary/20" />
          {steps.map(s => (
            <div key={s.step} className="flex flex-col items-center text-center relative">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <s.icon size={32} className="text-white" />
              </div>
              <span className="text-xs font-black text-primary/50 tracking-widest mb-1">ADIM {s.step}</span>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Implement Faq**

Create `src/components/organization/Faq.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '@/data/faq'
import { cn } from '@/lib/utils'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {faqItems.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                {item.question}
                <ChevronDown
                  size={18}
                  className={cn('shrink-0 text-primary transition-transform duration-200', openId === item.id && 'rotate-180')}
                />
              </button>
              {openId === item.id && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Assemble organization page**

Create `src/app/organization/page.tsx`:
```tsx
import Image from 'next/image'
import { servicePackages } from '@/data/services'
import { PackageCard } from '@/components/organization/PackageCard'
import { HowItWorks } from '@/components/organization/HowItWorks'
import { Faq } from '@/components/organization/Faq'
import { CtaBanner } from '@/components/home/CtaBanner'

export default function OrganizationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-secondary text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            İnşaat Temalı <span className="text-primary">Doğum Günü</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Çocuğunuzun hayalindeki inşaat sahası partisini gerçeğe dönüştürüyoruz.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-3">Organizasyon Paketleri</h2>
          <p className="text-center text-text-muted mb-12">İhtiyacınıza uygun paketi seçin</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {servicePackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Mock gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Geçmiş Organizasyonlardan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
              'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={src} alt={`Organizasyon ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/organization/ src/app/organization/
git commit -m "feat: add organization page with packages, how-it-works, gallery, FAQ"
```

---

## Task 16: About & Contact Pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Implement about page**

Create `src/app/about/page.tsx`:
```tsx
import Image from 'next/image'
import { StatsBar } from '@/components/shared/StatsBar'
import { Target, Eye } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Hakkımızda</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            2018'den bu yana inşaat oyuncakları dünyasının tutku dolu adresi.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6">Hikayemiz</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                RC İnşaat, 2018 yılında İstanbul'da küçük bir oyuncak mağazası olarak kuruldu. Kurucularımızın inşaat araçlarına olan tutkusu, kısa sürede Türkiye'nin önde gelen inşaat oyuncağı uzmanlarından birine dönüştü.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bugün 200'den fazla ürün çeşidi, 3.000'i aşkın mutlu müşteri ve 500'den fazla başarılı organizasyonla çocukların hayal dünyasını renklendirelim.
              </p>
              <p className="text-gray-600 leading-relaxed">
                BRUDER, SIKU ve Diecast Masters gibi dünya markalarının Türkiye distribütörlüğünü yürütüyor, aynı zamanda özel inşaat temalı doğum günü organizasyonları düzenliyoruz.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                alt="RC İnşaat hikayesi"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-3">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Her çocuğun hayal kurmasına, keşfetmesine ve yaratıcılığını geliştirmesine katkı sağlayan kaliteli oyuncakları en erişilebilir şekilde sunmak.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Eye size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-3">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Türkiye'nin her şehrinde bir RC İnşaat deneyimi yaşatmak; çocukların inşaat dünyasıyla tanışmasına öncülük eden lider marka olmak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Implement contact page**

Create `src/app/contact/page.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black text-center mb-3">İletişim</h1>
      <p className="text-center text-text-muted mb-12">Size nasıl yardımcı olabiliriz?</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Mesajınız İletildi!</h3>
              <p className="text-green-700">En kısa sürede size dönüş yapacağız.</p>
              <Button className="mt-4" onClick={() => setSubmitted(false)} variant="outline">Yeni Mesaj Gönder</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ad Soyad</label>
                  <input required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Ahmet Yılmaz" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta</label>
                  <input required type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="ahmet@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Konu</label>
                <select required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option value="">Konu seçin...</option>
                  <option>Ürün Bilgisi</option>
                  <option>Organizasyon Talebi</option>
                  <option>Toplu Sipariş</option>
                  <option>Şikayet / Öneri</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mesaj</label>
                <textarea required rows={5} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Mesajınızı yazın..." />
              </div>
              <Button type="submit" size="lg" className="w-full">Gönder</Button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          {[
            { icon: Phone, label: 'Telefon', value: '0212 555 66 77' },
            { icon: Mail, label: 'E-posta', value: 'info@rcinsaat.com' },
            { icon: MapPin, label: 'Adres', value: 'Güneşli Mah. Sanayi Cad. No:42, Bağcılar / İstanbul' },
            { icon: Clock, label: 'Çalışma Saatleri', value: 'Hafta içi 09:00 – 18:00\nCumartesi 10:00 – 16:00' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{item.label}</p>
                <p className="text-gray-800 font-medium whitespace-pre-line">{item.value}</p>
              </div>
            </div>
          ))}

          {/* Maps placeholder */}
          <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center border border-gray-200">
            <p className="text-text-muted text-sm">Google Harita buraya entegre edilecek</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/about/ src/app/contact/
git commit -m "feat: add about and contact pages"
```

---

## Task 17: Cart Page

**Files:**
- Create: `src/components/checkout/CartLineItem.tsx`
- Create: `src/components/checkout/OrderSummary.tsx`
- Create: `src/app/cart/page.tsx`

- [ ] **Step 1: Implement CartLineItem**

Create `src/components/checkout/CartLineItem.tsx`:
```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

interface CartLineItemProps {
  product: Product
  quantity: number
}

export function CartLineItem({ product, quantity }: CartLineItemProps) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <Link href={`/catalog/${product.slug}`} className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/catalog/${product.slug}`} className="font-semibold text-gray-900 hover:text-primary line-clamp-1">
          {product.name}
        </Link>
        <p className="text-xs text-text-muted mt-0.5">{product.brand} · {product.scale}</p>
        <p className="text-primary font-black mt-1">{formatPrice(product.price)}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => quantity > 1 ? updateQuantity(product.id, quantity - 1) : removeItem(product.id)}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Minus size={12} />
        </button>
        <span className="w-8 text-center font-bold text-sm">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>
      <div className="text-right shrink-0">
        <p className="font-black text-gray-900">{formatPrice(product.price * quantity)}</p>
        <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-600 mt-1 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement OrderSummary**

Create `src/components/checkout/OrderSummary.tsx`:
```tsx
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface OrderSummaryProps {
  subtotal: number
  showCheckoutButton?: boolean
}

const SHIPPING_FLAT_RATE = 49.9

export function OrderSummary({ subtotal, showCheckoutButton = true }: OrderSummaryProps) {
  const shipping = subtotal > 0 ? SHIPPING_FLAT_RATE : 0
  const total = subtotal + shipping

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="font-bold text-lg mb-4">Sipariş Özeti</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Ara Toplam</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Kargo</span>
          <span className="font-semibold">{subtotal > 0 ? formatPrice(shipping) : '—'}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
          <span className="font-black">Toplam</span>
          <span className="font-black text-primary text-xl">{formatPrice(total)}</span>
        </div>
      </div>
      {showCheckoutButton && subtotal > 0 && (
        <Button href="/checkout" className="w-full mt-5">Ödemeye Geç</Button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Implement cart page**

Create `src/app/cart/page.tsx`:
```tsx
'use client'

import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { CartLineItem } from '@/components/checkout/CartLineItem'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { Button } from '@/components/ui/Button'
import { ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items } = useCart()

  const cartProducts = items
    .map(item => {
      const product = products.find(p => p.id === item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter(Boolean) as { product: (typeof products)[0]; quantity: number }[]

  const subtotal = cartProducts.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Sepetiniz Boş</h1>
        <p className="text-text-muted mb-8">Henüz ürün eklemediniz.</p>
        <Button href="/catalog">Alışverişe Başla</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black mb-8">Sepetim</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {cartProducts.map(({ product, quantity }) => (
            <CartLineItem key={product.id} product={product} quantity={quantity} />
          ))}
          <div className="mt-4">
            <Button href="/catalog" variant="ghost" size="sm">← Alışverişe Devam Et</Button>
          </div>
        </div>
        <div>
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/checkout/CartLineItem.tsx src/components/checkout/OrderSummary.tsx src/app/cart/
git commit -m "feat: add cart page with line items, quantity controls, and order summary"
```

---

## Task 18: Checkout Page

**Files:**
- Create: `src/components/checkout/CheckoutStepper.tsx`
- Create: `src/components/checkout/DeliveryForm.tsx`
- Create: `src/components/checkout/PaymentForm.tsx`
- Create: `src/components/checkout/OrderReview.tsx`
- Create: `src/app/checkout/page.tsx`

- [ ] **Step 1: Implement CheckoutStepper**

Create `src/components/checkout/CheckoutStepper.tsx`:
```tsx
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Teslimat' },
  { id: 2, label: 'Ödeme' },
  { id: 3, label: 'Özet' },
]

interface CheckoutStepperProps {
  currentStep: number
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors',
                currentStep > step.id
                  ? 'bg-green-500 text-white'
                  : currentStep === step.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              )}
            >
              {currentStep > step.id ? <Check size={16} /> : step.id}
            </div>
            <span className={cn('text-xs mt-1 font-medium', currentStep === step.id ? 'text-primary' : 'text-text-muted')}>
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div className={cn('w-20 h-0.5 mb-4 mx-2 transition-colors', currentStep > step.id ? 'bg-green-400' : 'bg-gray-200')} />
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Implement DeliveryForm**

Create `src/components/checkout/DeliveryForm.tsx`:
```tsx
import type { DeliveryFormValues } from '@/types'
import { Button } from '@/components/ui/Button'

interface DeliveryFormProps {
  values: DeliveryFormValues
  onChange: (values: DeliveryFormValues) => void
  onNext: () => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

export function DeliveryForm({ values, onChange, onNext }: DeliveryFormProps) {
  function set(key: keyof DeliveryFormValues) {
    return (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...values, [key]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Ad Soyad">
          <input required value={values.fullName} onChange={set('fullName')} className={inputClass} placeholder="Ahmet Yılmaz" />
        </Field>
        <Field label="Telefon">
          <input required value={values.phone} onChange={set('phone')} className={inputClass} placeholder="0532 111 2233" />
        </Field>
      </div>
      <Field label="E-posta">
        <input required type="email" value={values.email} onChange={set('email')} className={inputClass} placeholder="ahmet@example.com" />
      </Field>
      <Field label="Adres">
        <input required value={values.line1} onChange={set('line1')} className={inputClass} placeholder="Mahalle, Cadde, No, Daire" />
      </Field>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <Field label="İl">
          <input required value={values.city} onChange={set('city')} className={inputClass} placeholder="İstanbul" />
        </Field>
        <Field label="İlçe">
          <input required value={values.district} onChange={set('district')} className={inputClass} placeholder="Kadıköy" />
        </Field>
        <Field label="Posta Kodu">
          <input required value={values.postalCode} onChange={set('postalCode')} className={inputClass} placeholder="34710" />
        </Field>
      </div>
      <Button type="submit" size="lg" className="w-full">Ödemeye Geç →</Button>
    </form>
  )
}
```

- [ ] **Step 3: Implement PaymentForm**

Create `src/components/checkout/PaymentForm.tsx`:
```tsx
import { useState } from 'react'
import type { PaymentFormValues } from '@/types'
import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'

interface PaymentFormProps {
  values: PaymentFormValues
  onChange: (values: PaymentFormValues) => void
  onNext: () => void
  onBack: () => void
}

const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

export function PaymentForm({ values, onChange, onNext, onBack }: PaymentFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* iyzico mock badge */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <Lock size={16} className="text-blue-600 shrink-0" />
        <span className="text-sm text-blue-700 font-medium">iyzico ile güvenli ödeme</span>
        <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">256-bit SSL</span>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kart Numarası</label>
        <input
          required
          value={values.cardNumber}
          onChange={e => onChange({ ...values, cardNumber: formatCardNumber(e.target.value) })}
          className={inputClass}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kart Üzerindeki Ad</label>
        <input
          required
          value={values.cardHolder}
          onChange={e => onChange({ ...values, cardHolder: e.target.value })}
          className={inputClass}
          placeholder="AHMET YILMAZ"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Son Kullanma Tarihi</label>
          <input
            required
            value={values.expiry}
            onChange={e => onChange({ ...values, expiry: formatExpiry(e.target.value) })}
            className={inputClass}
            placeholder="AA/YY"
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
          <input
            required
            value={values.cvv}
            onChange={e => onChange({ ...values, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
            className={inputClass}
            placeholder="123"
            maxLength={3}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">← Geri</Button>
        <Button type="submit" className="flex-1">Özeti Görüntüle →</Button>
      </div>
    </form>
  )
}
```

- [ ] **Step 4: Implement OrderReview**

Create `src/components/checkout/OrderReview.tsx`:
```tsx
import type { DeliveryFormValues, CartItem } from '@/types'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { MapPin } from 'lucide-react'

const SHIPPING = 49.9

interface OrderReviewProps {
  delivery: DeliveryFormValues
  items: CartItem[]
  onConfirm: () => void
  onBack: () => void
}

export function OrderReview({ delivery, items, onConfirm, onBack }: OrderReviewProps) {
  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.productId)!
    return { product, quantity: item.quantity }
  })
  const subtotal = cartProducts.reduce((s, { product, quantity }) => s + product.price * quantity, 0)
  const total = subtotal + SHIPPING

  return (
    <div className="space-y-6">
      {/* Delivery */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-primary" />
          <span className="font-semibold text-sm">Teslimat Adresi</span>
        </div>
        <p className="text-sm text-gray-700">{delivery.fullName}</p>
        <p className="text-sm text-gray-600">{delivery.line1}, {delivery.district}, {delivery.city} {delivery.postalCode}</p>
        <p className="text-sm text-gray-600">{delivery.phone} · {delivery.email}</p>
      </div>

      {/* Items */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Ürünler</h3>
        <div className="space-y-2">
          {cartProducts.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{product.name} <span className="text-text-muted">×{quantity}</span></span>
              <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Ara Toplam</span><span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Kargo</span><span>{formatPrice(SHIPPING)}</span>
          </div>
          <div className="flex justify-between font-black text-base pt-1">
            <span>Toplam</span><span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">← Geri</Button>
        <Button onClick={onConfirm} className="flex-1">Siparişi Onayla ✓</Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Assemble checkout page**

Create `src/app/checkout/page.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { DeliveryForm } from '@/components/checkout/DeliveryForm'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { OrderReview } from '@/components/checkout/OrderReview'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { products } from '@/data/products'
import type { DeliveryFormValues, PaymentFormValues } from '@/types'

const emptyDelivery: DeliveryFormValues = {
  fullName: '', email: '', phone: '', line1: '', city: '', district: '', postalCode: '',
}

const emptyPayment: PaymentFormValues = {
  cardNumber: '', cardHolder: '', expiry: '', cvv: '',
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [delivery, setDelivery] = useState<DeliveryFormValues>(emptyDelivery)
  const [payment, setPayment] = useState<PaymentFormValues>(emptyPayment)

  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  function handleConfirm() {
    clearCart()
    router.push('/order-confirmation')
  }

  if (items.length === 0 && step !== 3) {
    router.push('/cart')
    return null
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-center mb-8">Ödeme</h1>
      <CheckoutStepper currentStep={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === 1 && (
            <DeliveryForm values={delivery} onChange={setDelivery} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <PaymentForm values={payment} onChange={setPayment} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <OrderReview delivery={delivery} items={items} onConfirm={handleConfirm} onBack={() => setStep(2)} />
          )}
        </div>
        <div>
          <OrderSummary subtotal={subtotal} showCheckoutButton={false} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/checkout/ src/app/checkout/
git commit -m "feat: add checkout page with 3-step stepper (delivery, payment, review)"
```

---

## Task 19: Order Confirmation & Order History Pages

**Files:**
- Create: `src/app/order-confirmation/page.tsx`
- Create: `src/app/orders/page.tsx`

- [ ] **Step 1: Implement order confirmation page**

Create `src/app/order-confirmation/page.tsx`:
```tsx
'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

function generateOrderNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    setOrderNumber(generateOrderNumber())
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-3">Siparişiniz Alındı!</h1>
      <p className="text-text-muted text-lg mb-2">
        Teşekkürler! Siparişiniz başarıyla oluşturuldu.
      </p>
      {orderNumber && (
        <div className="inline-block bg-gray-100 border border-gray-200 rounded-xl px-6 py-3 my-6">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Sipariş Numarası</p>
          <p className="text-2xl font-black text-primary">#{orderNumber}</p>
        </div>
      )}
      <p className="text-sm text-text-muted mb-10">
        Siparişinizin durumunu e-posta adresinize göndereceğiz. Ayrıca sipariş geçmişinizden takip edebilirsiniz.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button href="/" variant="outline">Ana Sayfaya Dön</Button>
        <Button href="/orders">Siparişlerimi Görüntüle</Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement orders history page**

Create `src/app/orders/page.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { mockOrders } from '@/data/orders'
import { products } from '@/data/products'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { ChevronDown, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OrdersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black mb-8">Siparişlerim</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Henüz siparişiniz bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map(order => {
            const isExpanded = expandedId === order.id
            const orderProducts = order.items.map(item => {
              const product = products.find(p => p.id === item.productId)
              return product ? { product, quantity: item.quantity } : null
            }).filter(Boolean) as { product: typeof products[0]; quantity: number }[]

            return (
              <div key={order.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-black text-gray-900">Sipariş #{order.orderNumber}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {new Date(order.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <Badge status={order.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-primary">{formatPrice(order.total)}</span>
                    <ChevronDown
                      size={16}
                      className={cn('text-text-muted transition-transform duration-200', isExpanded && 'rotate-180')}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Ürünler</h4>
                    <div className="space-y-2 mb-4">
                      {orderProducts.map(({ product, quantity }) => (
                        <div key={product.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{product.name} <span className="text-text-muted">×{quantity}</span></span>
                          <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Teslimat Adresi</h4>
                      <p className="text-sm text-gray-700">{order.deliveryAddress.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {order.deliveryAddress.line1}, {order.deliveryAddress.district}, {order.deliveryAddress.city}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/order-confirmation/ src/app/orders/
git commit -m "feat: add order confirmation and order history pages"
```

---

## Task 20: Final Polish & Full Test Run

**Files:** No new files — verification pass.

- [ ] **Step 1: Run all tests**

```bash
npx jest --coverage
```

Expected: All test suites pass. Coverage report generated.

- [ ] **Step 2: Build production bundle**

```bash
npx next build
```

Expected: Build completes with no errors. Note any warnings about image domains.

- [ ] **Step 3: Fix image domain config (if needed)**

If Next.js warns about unoptimized images from Unsplash, update `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
```

- [ ] **Step 4: Verify all pages in browser**

```bash
npx next dev
```

Walk through each route manually:
- `/` — home page, all sections visible
- `/catalog` — filter, search, sort working
- `/catalog/liebherr-ltm-1300-mobil-vinc` — detail page
- `/organization` — packages, FAQ accordion
- `/about` — story, mission/vision
- `/contact` — form submits and shows success
- `/cart` — add products from catalog, verify cart count in header
- `/checkout` — complete 3-step flow
- `/order-confirmation` — success screen with order number
- `/orders` — mock orders list, expand to see details

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: RC İnşaat website complete — all pages, components, and tests"
```

---

## Self-Review

**Spec coverage check:**
- ✅ `/` Home page — all 7 sections (Hero, Categories, Services, Products, WhyUs, Stats, CTA)
- ✅ `/catalog` — search, filter, sort, pagination-ready grid
- ✅ `/catalog/[slug]` — gallery, features, related products
- ✅ `/organization` — packages, how-it-works, gallery, FAQ
- ✅ `/about` — story, mission/vision, stats
- ✅ `/contact` — form, side info, maps placeholder
- ✅ `/cart` — line items, quantity controls, empty state, order summary
- ✅ `/checkout` — 3-step stepper (delivery → payment → review)
- ✅ `/order-confirmation` — success + random order number
- ✅ `/orders` — mock history, expand-in-place detail
- ✅ Theme system — 4 themes, CSS variables, `src/config/theme.ts`
- ✅ Data files — all 7 data files with correct types
- ✅ iyzico mock — card form with SSL badge, note for future integration
- ✅ Cart context — add/remove/update/clear with tests
- ✅ English code identifiers, Turkish UI text
- ✅ English URL paths

**Type consistency check:** `CartItem.productId` matches product lookup by `product.id` throughout. `OrderStatus` union used consistently in Badge and Order type. `DeliveryFormValues` fields match `Address` interface. No mismatches found.

**No placeholders:** All steps contain actual code. No TBDs.
