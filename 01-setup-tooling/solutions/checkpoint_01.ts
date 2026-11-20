// Reference solution — checkpoint 1

export type Reading = {
  time: string
  celsius: number
  sensor?: string
}

export function parseCelsius(raw: string): number | null {
  if (raw.trim() === '') return null
  const value = Number(raw)
  return Number.isNaN(value) ? null : value
}

export function readingAt(temps: number[], index: number): number | undefined {
  return temps[index]
}

export function average(temps: number[]): number {
  if (temps.length === 0) return 0
  return temps.reduce((sum, t) => sum + t, 0) / temps.length
}
