// Reference solution — checkpoint 7

export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E }

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

export function firstWhere<T>(items: readonly T[], pred: (item: T) => boolean): Result<T> {
  for (const item of items) {
    if (pred(item)) return ok(item)
  }
  return err('not found')
}

export class Store<T extends { id: number }> {
  private items: T[] = []

  add(item: T): T {
    this.items.push(item)
    return item
  }

  get(id: number): Result<T> {
    const found = this.items.find((item) => item.id === id)
    return found === undefined ? err('not found') : ok(found)
  }

  getAll(): readonly T[] {
    return this.items
  }

  pluck<K extends keyof T>(key: K): T[K][] {
    return this.items.map((item) => item[key])
  }
}
