'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { DeliveryForm } from '@/components/checkout/DeliveryForm'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { OrderReview } from '@/components/checkout/OrderReview'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { products } from '@/data/products'
import type { DeliveryFormValues, PaymentFormValues } from '@/types'

const emptyDelivery: DeliveryFormValues = {
  fullName: '', email: '', phone: '', line1: '', city: '', district: '', postalCode: '',
}

const emptyPayment: PaymentFormValues = {
  cardNumber: '', cardHolder: '', expiry: '', cvv: '',
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [delivery, setDelivery] = useState<DeliveryFormValues>(emptyDelivery)
  const [payment, setPayment] = useState<PaymentFormValues>(emptyPayment)

  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  function handleConfirm() {
    clearCart()
    router.push('/order-confirmation')
  }

  if (items.length === 0 && step !== 3) {
    router.push('/cart')
    return null
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-black text-center mb-8">Ödeme</h1>
      <CheckoutStepper currentStep={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === 1 && (
            <DeliveryForm values={delivery} onChange={setDelivery} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <PaymentForm values={payment} onChange={setPayment} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <OrderReview delivery={delivery} items={items} onConfirm={handleConfirm} onBack={() => setStep(2)} />
          )}
        </div>
        <div>
          <OrderSummary subtotal={subtotal} showCheckoutButton={false} />
        </div>
      </div>
    </div>
  )
}
