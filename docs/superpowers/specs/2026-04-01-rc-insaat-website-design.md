# RC İnşaat Website — Design Spec
Date: 2026-04-01

## Overview

A Next.js 14 + TypeScript website for RC İnşaat — a company that sells construction toy vehicles and offers birthday party organization services. UI language is Turkish; all code-level identifiers (variables, functions, components, file names) are in English. URL paths are in English.

**Target audience:** Parents buying gifts for children + institutions/organizations arranging events.
**Core value proposition:** Quality construction toy catalog + themed birthday party organization.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Images | next/image (Unsplash mock sources) |
| Data | Static TypeScript files in `src/data/` |
| Theme | CSS variables injected from `src/config/theme.ts` |

---

## Site Map & URL Structure

| URL | Turkish Label | Description |
|-----|---------------|-------------|
| `/` | Ana Sayfa | Landing page |
| `/catalog` | Ürünler | Product catalog with filters |
| `/catalog/[slug]` | Ürün Detay | Single product page |
| `/organization` | Organizasyon | Party organization services |
| `/about` | Hakkımızda | Company vision & story |
| `/contact` | İletişim | Contact form & info |
| `/cart` | Sepet | Shopping cart |
| `/checkout` | Ödeme | Checkout & payment form |
| `/order-confirmation` | Sipariş Onayı | Post-payment confirmation |
| `/orders` | Siparişlerim | Order history list |

### Navigation Menu (visible to users)
Ana Sayfa · Ürünler · Organizasyon · Hakkımızda · İletişim

---

## Page Designs

### Home Page (`/`)

1. **Hero** — Full-width section with large heading, slogan, and two CTA buttons: "Ürünleri Keşfet" (→ `/catalog`) and "Organizasyon" (→ `/organization`). Background: construction toy imagery.
2. **Featured Categories** — 4–6 category cards with icon + label, clicking navigates to filtered catalog.
3. **Services Summary** — 3 cards: Satış · Organizasyon · Kurumsal Paketler. Short description + "Daha Fazla" link.
4. **Featured Products** — 4-column grid of highlighted products from mock data.
5. **Why RC İnşaat** — 3–4 value propositions: Kaliteli Ürünler, Hızlı Teslimat, Özel Organizasyon, Müşteri Desteği.
6. **CTA Banner** — "Unutulmaz bir organizasyon için bizi arayın" + contact button.
7. **Footer** — Logo, nav links, social media icons, contact info.

### Product Catalog (`/catalog`)

- **Left sidebar:** Category filter (checkbox list) + price range slider
- **Main area:** Product grid (3–4 columns), card = image + name + price + "Sepete Ekle" button
- **Top bar:** Search input + sort dropdown (price asc/desc, newest, popular)
- **Pagination** at the bottom

### Product Detail (`/catalog/[slug]`)

- Large product image gallery (main + thumbnails)
- Product name, brand, scale, price, stock status
- Feature list
- Description
- "Sepete Ekle" + "Favorilere Ekle" buttons
- Related products section

### Organization (`/organization`)

- **Hero:** Themed image + slogan
- **Package cards:** Temel · Standart · Premium — each with feature list, price range, "Teklif Al" button
- **How it Works:** 3-step process (İletişim → Planlama → Etkinlik)
- **Gallery:** Mock past event photos
- **FAQ:** Accordion component

### About (`/about`)

- Brand story: text + image layout
- Mission / Vision cards
- Stats section: total products, organizations held, happy customers

### Contact (`/contact`)

- Form fields: Ad, E-posta, Konu (dropdown), Mesaj + submit button
- Side panel: address, phone, email, working hours
- Google Maps embed placeholder

### Cart (`/cart`)

- Line items: product image + name + quantity stepper + unit price + line total
- Remove item button per row
- Order summary panel: subtotal, shipping (mock flat rate), total
- "Alışverişe Devam Et" (→ `/catalog`) + "Ödemeye Geç" (→ `/checkout`) buttons
- Empty cart state with CTA

### Checkout (`/checkout`)

Three-step stepper UI: **Teslimat → Ödeme → Özet**

**Step 1 — Teslimat (Delivery):**
- Ad Soyad, E-posta, Telefon
- Adres, İl, İlçe, Posta Kodu

**Step 2 — Ödeme (Payment):**
- Mock iyzico payment form: Kart Numarası, Ad Soyad (kart), SKT, CVV
- "iyzico ile güvenli ödeme" badge (mock branding)
- Pay button triggers mock success flow

**Step 3 — Özet (Summary):**
- Read-only review of delivery + order items + total before final confirm

### Order Confirmation (`/order-confirmation`)

- Success icon + "Siparişiniz Alındı!" heading
- Order number (mock: random 6-digit)
- Summary: items, delivery address, total
- "Ana Sayfaya Dön" + "Siparişlerimi Görüntüle" buttons

### Order History (`/orders`)

- List of mock past orders: order number, date, status badge (Hazırlanıyor / Kargoda / Teslim Edildi), total
- Each row links to a detail view (can be a modal or expand-in-place)
- Mock data: 3–5 pre-seeded orders

---

## Theme System

Defined in `src/config/theme.ts`. Four preset themes; active theme is injected as CSS variables into the root layout.

**Default theme: `construction`**

```ts
construction: {
  primary: "#F97316",       // orange
  primaryDark: "#C2410C",
  secondary: "#1C1917",     // anthracite
  accent: "#FCD34D",        // yellow highlight
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#111827",
  textMuted: "#6B7280",
}
```

**Other themes:** `ocean` (blue/gray) · `forest` (green/earth) · `minimal` (black/white)

To switch themes, change `activeTheme` in `src/config/theme.ts`.

---

## Data Architecture

All content lives in `src/data/` as TypeScript files — editable without a CMS or admin panel.

```
src/data/
  products.ts        ← product list (mock: ~30 items)
  categories.ts      ← category definitions (10+ categories)
  services.ts        ← organization packages
  faq.ts             ← FAQ items
  stats.ts           ← about page numbers
  navigation.ts      ← menu links
  orders.ts          ← mock order history (3–5 seeded orders)
```

### Key Types

```ts
interface Product {
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
  scale: string         // e.g. "1:50"
  brand: string
}

interface Category {
  id: string
  name: string          // Turkish display name
  slug: string
  icon: string
  productCount: number
}

interface ServicePackage {
  id: string
  name: string
  priceRange: string
  features: string[]
  isPopular: boolean
}

interface CartItem {
  productId: string
  quantity: number
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "preparing" | "shipped" | "delivered"
  items: CartItem[]
  total: number
  deliveryAddress: Address
}

interface Address {
  fullName: string
  email: string
  phone: string
  line1: string
  city: string
  district: string
  postalCode: string
}
```

### Mock Categories (10+)
Ekskavatörler · Vinçler · Buldozerler · Kamyonlar · Mixerler · Forkliftler · Kepçeler · Yükleyiciler · İnşaat Setleri · Aksesuarlar · Özel Seriler

### Mock Product Images
Unsplash-sourced construction toy photos (BRUDER/SIKU/diecast style), served via `next/image` for optimization.

---

## Project Structure

```
rc-building/
  src/
    app/
      layout.tsx
      page.tsx                  ← Home
      catalog/
        page.tsx
        [slug]/page.tsx
      organization/page.tsx
      about/page.tsx
      contact/page.tsx
      cart/page.tsx
      checkout/page.tsx
      order-confirmation/page.tsx
      orders/page.tsx
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
        ProductGrid.tsx
        ProductCard.tsx
        CategoryFilter.tsx
        SearchBar.tsx
      organization/
        PackageCard.tsx
        HowItWorks.tsx
        Faq.tsx
      checkout/
        CartItem.tsx
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
    data/
      products.ts
      categories.ts
      services.ts
      faq.ts
      stats.ts
      navigation.ts
    types/
      index.ts
  public/
    images/
      products/
      organization/
      hero/
  docs/
    superpowers/
      specs/
        2026-04-01-rc-insaat-website-design.md
```

---

## Out of Scope (this phase)

- Admin panel / CMS
- Real iyzico payment integration (mock form only — iyzico SDK not wired)
- User authentication / accounts
- Real inventory management
- SEO metadata (can be added later via Next.js metadata API)

## iyzico Integration Note

The checkout payment form is built as a mock that mirrors iyzico's expected fields (card number, name, expiry, CVV). When ready to go live, replace the mock submit handler in `PaymentForm.tsx` with the iyzico JS SDK `checkout form` or `API payment` call. The form structure and data types are already aligned.
