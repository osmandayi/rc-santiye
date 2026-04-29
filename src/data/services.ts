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
