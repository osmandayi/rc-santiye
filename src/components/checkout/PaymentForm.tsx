import type { PaymentFormValues } from '@/types'
import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'

interface PaymentFormProps {
  values: PaymentFormValues
  onChange: (values: PaymentFormValues) => void
  onNext: () => void
  onBack: () => void
}

const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

export function PaymentForm({ values, onChange, onNext, onBack }: PaymentFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* iyzico mock badge */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <Lock size={16} className="text-blue-600 shrink-0" />
        <span className="text-sm text-blue-700 font-medium">iyzico ile güvenli ödeme</span>
        <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">256-bit SSL</span>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kart Numarası</label>
        <input
          required
          value={values.cardNumber}
          onChange={e => onChange({ ...values, cardNumber: formatCardNumber(e.target.value) })}
          className={inputClass}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kart Üzerindeki Ad</label>
        <input
          required
          value={values.cardHolder}
          onChange={e => onChange({ ...values, cardHolder: e.target.value })}
          className={inputClass}
          placeholder="AHMET YILMAZ"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Son Kullanma Tarihi</label>
          <input
            required
            value={values.expiry}
            onChange={e => onChange({ ...values, expiry: formatExpiry(e.target.value) })}
            className={inputClass}
            placeholder="AA/YY"
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
          <input
            required
            value={values.cvv}
            onChange={e => onChange({ ...values, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
            className={inputClass}
            placeholder="123"
            maxLength={3}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">← Geri</Button>
        <Button type="submit" className="flex-1">Özeti Görüntüle →</Button>
      </div>
    </form>
  )
}
