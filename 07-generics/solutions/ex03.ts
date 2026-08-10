// Reference solution — ex03

export function zip<A, B>(as: A[], bs: B[]): Array<[A, B]> {
  const length = Math.min(as.length, bs.length)
  const pairs: Array<[A, B]> = []
  for (let i = 0; i < length; i++) {
    pairs.push([as[i]!, bs[i]!]) // i < length, so both exist
  }
  return pairs
}

export function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]]
}

export function mapObject<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => R,
): Record<K, R> {
  const result = {} as Record<K, R>
  for (const key of Object.keys(obj) as K[]) {
    result[key] = fn(obj[key], key)
  }
  return result
}
