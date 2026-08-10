// Reference solution — ex01

export function identity<T>(value: T): T {
  return value
}

export function firstItem<T>(items: readonly T[]): T | undefined {
  return items[0]
}

export function wrapInArray<T>(value: T): T[] {
  return [value]
}
