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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
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
