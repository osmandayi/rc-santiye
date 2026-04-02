'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '@/data/faq'
import { cn } from '@/lib/utils'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {faqItems.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                {item.question}
                <ChevronDown
                  size={18}
                  className={cn('shrink-0 text-primary transition-transform duration-200', openId === item.id && 'rotate-180')}
                />
              </button>
              {openId === item.id && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
