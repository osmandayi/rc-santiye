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
