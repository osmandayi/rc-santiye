import type { DeliveryFormValues } from '@/types'
import { Button } from '@/components/ui/Button'

interface DeliveryFormProps {
  values: DeliveryFormValues
  onChange: (values: DeliveryFormValues) => void
  onNext: () => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

export function DeliveryForm({ values, onChange, onNext }: DeliveryFormProps) {
  function set(key: keyof DeliveryFormValues) {
    return (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...values, [key]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Ad Soyad">
          <input required value={values.fullName} onChange={set('fullName')} className={inputClass} placeholder="Ahmet Yılmaz" />
        </Field>
        <Field label="Telefon">
          <input required value={values.phone} onChange={set('phone')} className={inputClass} placeholder="0532 111 2233" />
        </Field>
      </div>
      <Field label="E-posta">
        <input required type="email" value={values.email} onChange={set('email')} className={inputClass} placeholder="ahmet@example.com" />
      </Field>
      <Field label="Adres">
        <input required value={values.line1} onChange={set('line1')} className={inputClass} placeholder="Mahalle, Cadde, No, Daire" />
      </Field>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <Field label="İl">
          <input required value={values.city} onChange={set('city')} className={inputClass} placeholder="İstanbul" />
        </Field>
        <Field label="İlçe">
          <input required value={values.district} onChange={set('district')} className={inputClass} placeholder="Kadıköy" />
        </Field>
        <Field label="Posta Kodu">
          <input required value={values.postalCode} onChange={set('postalCode')} className={inputClass} placeholder="34710" />
        </Field>
      </div>
      <Button type="submit" size="lg" className="w-full">Ödemeye Geç →</Button>
    </form>
  )
}
