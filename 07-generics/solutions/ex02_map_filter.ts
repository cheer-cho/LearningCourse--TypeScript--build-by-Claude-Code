// Reference solution — ex02

export function mapArray<T, R>(items: T[], fn: (item: T, index: number) => R): R[] {
  const result: R[] = []
  for (let i = 0; i < items.length; i++) {
    result.push(fn(items[i]!, i))
  }
  return result
}

// One type parameter suffices: filtering never changes the element type.
export function filterArray<T>(items: T[], pred: (item: T) => boolean): T[] {
  const result: T[] = []
  for (const item of items) {
    if (pred(item)) result.push(item)
  }
  return result
}

export function flatten<T>(nested: T[][]): T[] {
  const result: T[] = []
  for (const inner of nested) {
    for (const item of inner) {
      result.push(item)
    }
  }
  return result
}
