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
