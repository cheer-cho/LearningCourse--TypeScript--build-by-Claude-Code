// Reference solution — ex06

export function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key])
}
