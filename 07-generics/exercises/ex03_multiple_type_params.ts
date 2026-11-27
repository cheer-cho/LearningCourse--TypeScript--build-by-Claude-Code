/**
 * ex03 — Multiple type parameters
 *
 * One type parameter links one thing; declare as many as you have
 * independent types. The compiler infers each one separately.
 *
 * 1. zip<A, B>(as, bs): pair elements up, stopping at the shorter array.
 *      zip(['a', 'b'], [1, 2])  -> [['a', 1], ['b', 2]]
 *      type: Array<[A, B]>
 * 2. swap<A, B>(pair): flip a two-element tuple.
 *      swap(['x', 1])  -> [1, 'x']             type: [B, A]
 * 3. mapObject<K, V, R>(obj, fn): transform every VALUE of an object,
 *    keeping the keys. fn receives (value, key).
 *      mapObject({ a: 1, b: 2 }, (v) => v * 2) -> { a: 2, b: 4 }
 *    Signature hint: (obj: Record<K, V>, fn: (value: V, key: K) => R)
 *    returning Record<K, R>. K needs `extends string` — a sneak peek at
 *    constraints (ex06 explains why).
 *
 * Check: npm test -- 07 -t ex03
 */

// TODO: two type parameters, tuple pairs out.
export function zip<A, B>(as: A[], bs: B[]): Array<[A, B]> {
  const length = Math.min(as.length, bs.length);
  const pairs: Array<[A, B]> = [];
  for (let i = 0; i < length; i++) {
    pairs.push([as[i]!, bs[i]!]);
  }
  return pairs;
}

// TODO: tuple [A, B] in, tuple [B, A] out.
export function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]];
}

// TODO: three type parameters — keys, values in, values out.
export function mapObject<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => R,
): Record<K, R> {
  const results = {} as Record<K, R>;
  for (const [key, value] of Object.entries(obj)) {
    results[key as K] = fn(value as V, key as K);
  }
  return results;
}
