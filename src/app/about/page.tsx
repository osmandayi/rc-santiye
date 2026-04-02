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
