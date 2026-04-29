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
            <Button size="lg" href="/catalog">Ürünleri Keşfet</Button>
            <Button size="lg" variant="outline" href="/organization" className="border-white text-white hover:bg-white/15 hover:border-white">
              Organizasyon
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
