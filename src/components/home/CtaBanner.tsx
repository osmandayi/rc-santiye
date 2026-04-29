'use client'

import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/shared/FadeIn'

export function CtaBanner() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <FadeIn direction="up">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Unutulmaz bir organizasyon için<br />
            <span className="text-primary">bizi arayın</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Çocuğunuzun doğum gününü inşaat temalı bir maceraya dönüştürelim.
          </p>
          <Button size="lg" href="/contact">İletişime Geç</Button>
        </FadeIn>
      </div>
    </section>
  )
}
