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
