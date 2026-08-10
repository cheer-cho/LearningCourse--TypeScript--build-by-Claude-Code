// Reference solution — capstone-c-type-puzzles

// ---------- Split / Join ----------

export type Split<S extends string, D extends string> = S extends `${infer Head}${D}${infer Tail}`
  ? [Head, ...Split<Tail, D>]
  : [S]

export type Join<T extends readonly string[], D extends string> = T extends readonly [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? Tail extends []
    ? Head
    : `${Head}${D}${Join<Tail, D>}`
  : ''

// ---------- CamelCase ----------

export type CamelCase<S extends string> = S extends `${infer Head}${'_' | '-'}${infer First}${infer Rest}`
  ? `${Head}${Uppercase<First>}${CamelCase<Rest>}`
  : S

// ---------- ObjectPaths / GetByPath ----------

export type ObjectPaths<T> = T extends object
  ? { [K in keyof T & string]: T[K] extends object ? K | `${K}.${ObjectPaths<T[K]>}` : K }[keyof T & string]
  : never

export type GetByPath<T, Path extends string> = Path extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? GetByPath<T[Head], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never

export function getByPath<T, P extends ObjectPaths<T> & string>(obj: T, path: P): GetByPath<T, P> {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current !== null && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      current = undefined
    }
  }
  return current as GetByPath<T, P>
}

// ---------- UnionToIntersection ----------

export type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void
  ? I
  : never

// ---------- IsNever ----------

export type IsNever<T> = [T] extends [never] ? true : false

// ---------- Zip ----------

export type Zip<A extends readonly unknown[], B extends readonly unknown[]> = A extends readonly [
  infer AHead,
  ...infer ATail extends readonly unknown[],
]
  ? B extends readonly [infer BHead, ...infer BTail extends readonly unknown[]]
    ? [[AHead, BHead], ...Zip<ATail, BTail>]
    : []
  : []

export function zip<A, B>(a: readonly A[], b: readonly B[]): ReadonlyArray<readonly [A, B]> {
  const length = Math.min(a.length, b.length)
  const result: Array<readonly [A, B]> = []
  for (let i = 0; i < length; i++) {
    result.push([a[i] as A, b[i] as B])
  }
  return result
}

// ---------- Flatten ----------

export type Flatten<T extends readonly unknown[]> = T extends readonly [
  infer Head,
  ...infer Tail extends readonly unknown[],
]
  ? Head extends readonly unknown[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : []

export function flatten(arr: readonly unknown[]): unknown[] {
  const result: unknown[] = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else {
      result.push(item)
    }
  }
  return result
}

// ---------- RequiredKeys / OptionalKeys ----------

export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]

export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]
