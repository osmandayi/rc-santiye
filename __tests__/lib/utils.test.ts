import { formatPrice, slugify, cn } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats number as Turkish lira', () => {
    expect(formatPrice(1250)).toBe('₺1.250,00')
  })
  it('formats zero', () => {
    expect(formatPrice(0)).toBe('₺0,00')
  })
})

describe('slugify', () => {
  it('converts spaces to hyphens and lowercases', () => {
    expect(slugify('Liebherr LTM 1300')).toBe('liebherr-ltm-1300')
  })
  it('removes special characters', () => {
    expect(slugify('CAT 320 Ekskavatör')).toBe('cat-320-ekskavatör')
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
  it('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined)).toBe('foo')
  })
})
