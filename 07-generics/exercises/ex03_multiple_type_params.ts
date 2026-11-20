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
export function zip(as: any, bs: any): any {
  throw new Error('TODO: implement zip')
}

// TODO: tuple [A, B] in, tuple [B, A] out.
export function swap(pair: any): any {
  throw new Error('TODO: implement swap')
}

// TODO: three type parameters — keys, values in, values out.
export function mapObject(obj: any, fn: any): any {
  throw new Error('TODO: implement mapObject')
}
