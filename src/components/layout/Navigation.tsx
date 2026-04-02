'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/navigation'
import { cn } from '@/lib/utils'

export function Navigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname()
  return (
    <nav className={cn('flex', mobile ? 'flex-col gap-4' : 'items-center gap-6')}>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'font-medium transition-colors duration-200',
            pathname === link.href
              ? 'text-primary'
              : 'text-gray-600 hover:text-primary'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
