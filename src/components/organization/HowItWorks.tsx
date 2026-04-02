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
