'use client'

import { stats } from '@/data/stats'
import { FadeIn } from '@/components/shared/FadeIn'

export function StatsBar() {
  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} direction="up">
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className="text-orange-100 text-sm mt-1 font-medium">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
