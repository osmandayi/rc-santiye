export interface Theme {
  primary: string
  primaryDark: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
}

export const themes: Record<string, Theme> = {
  construction: {
    primary: '#F97316',
    primaryDark: '#C2410C',
    secondary: '#1C1917',
    accent: '#FCD34D',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
  },
  ocean: {
    primary: '#0EA5E9',
    primaryDark: '#0369A1',
    secondary: '#0F172A',
    accent: '#38BDF8',
    background: '#F0F9FF',
    surface: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
  },
  forest: {
    primary: '#16A34A',
    primaryDark: '#15803D',
    secondary: '#1C2B1E',
    accent: '#86EFAC',
    background: '#F0FDF4',
    surface: '#FFFFFF',
    text: '#14532D',
    textMuted: '#6B7280',
  },
  minimal: {
    primary: '#111827',
    primaryDark: '#030712',
    secondary: '#374151',
    accent: '#9CA3AF',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#111827',
    textMuted: '#6B7280',
  },
}

export const activeTheme: Theme = themes.construction
