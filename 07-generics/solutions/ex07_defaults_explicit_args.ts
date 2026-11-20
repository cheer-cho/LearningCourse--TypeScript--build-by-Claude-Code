// Reference solution — ex07

export type Dict<V = string> = Record<string, V>

export function emptyList<T = string>(): T[] {
  return []
}

export function parseAs<T = unknown>(json: string): T {
  return JSON.parse(json) as T
}
