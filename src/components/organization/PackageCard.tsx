import { CheckCircle } from 'lucide-react'
import type { ServicePackage } from '@/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PackageCardProps {
  pkg: ServicePackage
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className={cn('p-6 flex flex-col h-full', pkg.isPopular && 'border-2 border-primary ring-2 ring-primary/20 relative')}>
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
          En Popüler
        </div>
      )}
      <h3 className="text-xl font-black mb-6">{pkg.name}</h3>
      <ul className="space-y-3 flex-1 mb-8">
        {pkg.features.map(feature => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
      <Button href="/contact" variant={pkg.isPopular ? 'primary' : 'outline'} className="w-full mt-auto">
        Teklif Al
      </Button>
    </Card>
  )
}
