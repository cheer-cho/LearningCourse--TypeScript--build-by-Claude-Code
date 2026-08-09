// Reference solution — ex02

export function firstOrDefault(items: string[], fallback: string): string {
  const first = items[0] // string | undefined — the ?? handles the miss
  return first ?? fallback
}

export function lengthOf(text: string | null | undefined): number {
  return text?.length ?? 0
}

export function itemAt(items: number[], index: number): number | undefined {
  return items[index]
}
