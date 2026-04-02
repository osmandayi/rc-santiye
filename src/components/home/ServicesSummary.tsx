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
