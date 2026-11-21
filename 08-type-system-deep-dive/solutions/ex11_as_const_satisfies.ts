// Reference solution — ex11

export type Config = {
  theme: 'light' | 'dark'
  retries: number
  endpoints: Record<string, string>
}

export const CONFIG = {
  theme: 'dark',
  retries: 3,
  endpoints: { api: '/api', auth: '/auth' },
} as const satisfies Config

export function getTheme(): typeof CONFIG.theme {
  return CONFIG.theme
}

export const METHODS = ['GET', 'POST', 'DELETE'] as const satisfies readonly string[]

export function firstMethod(): (typeof METHODS)[0] {
  return METHODS[0]
}
