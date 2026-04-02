import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Teslimat' },
  { id: 2, label: 'Ödeme' },
  { id: 3, label: 'Özet' },
]

interface CheckoutStepperProps {
  currentStep: number
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors',
                currentStep > step.id
                  ? 'bg-green-500 text-white'
                  : currentStep === step.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              )}
            >
              {currentStep > step.id ? <Check size={16} /> : step.id}
            </div>
            <span className={cn('text-xs mt-1 font-medium', currentStep === step.id ? 'text-primary' : 'text-text-muted')}>
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div className={cn('w-20 h-0.5 mb-4 mx-2 transition-colors', currentStep > step.id ? 'bg-green-400' : 'bg-gray-200')} />
          )}
        </div>
      ))}
    </div>
  )
}
