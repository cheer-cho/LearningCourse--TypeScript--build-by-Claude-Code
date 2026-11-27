// Type parameter names: the conventional letters, when to spell names out,
// and two real traps (shadowing a global type, a parameter used only once).
// Run: npm run playground ex04__type-param-naming

// ── 1. The conventional letters, each in its usual role ──────

// T = "the" type. U = a second, independent type (the letter after T).
function mapArray<T, U>(items: readonly T[], fn: (item: T) => U): U[] {
  const out: U[] = []
  for (const item of items) out.push(fn(item))
  return out
}

// K = key, V = value. Same letters as the built-in Map<K, V>.
function invert<K extends PropertyKey, V extends PropertyKey>(obj: Record<K, V>): Record<V, K> {
  const out = {} as Record<V, K>
  for (const key in obj) out[obj[key]] = key
  return out
}

// K extends keyof T = "one of T's keys"; T[K] = the type at that key.
function pluck<T, K extends keyof T>(items: readonly T[], key: K): T[K][] {
  return items.map((item) => item[key])
}

// T + E = success value + error, as in ex04's Result<T, E>.
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// R = return type; A = the arguments tuple.
function logged<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  return (...args) => {
    const result = fn(...args)
    console.log(`  logged: (${args.join(', ')}) -> ${String(result)}`)
    return result
  }
}

// ── 2. Many params or unclear roles → descriptive names ──────
// Style used by TanStack Query: useQuery<TQueryFnData, TError, TData, TQueryKey>.
type FetchState<TData, TError> =
  | { status: 'loading' }
  | { status: 'success'; data: TData }
  | { status: 'error'; error: TError }

// ── 3. Trap: a type parameter named like a real type shadows it ─
// function describe<Error>(e: Error): string {
//   return e.message
//   // ❌ TS2339: Property 'message' does not exist on type 'Error'.
//   //    `Error` here is the type PARAMETER (any type), not the global Error.
// }

// ── 4. Trap: a type parameter used only once does nothing ────
// T appears once, so it links nothing. Plain `string` says the same thing.
function lengthOfBad<T extends string>(s: T): number {
  return s.length
}
function lengthOf(s: string): number {
  return s.length
}

// ── Output ───────────────────────────────────────────────────
console.log('mapArray ->', mapArray([1, 2, 3], (n) => `#${n}`))
console.log('invert   ->', invert({ a: 'x', b: 'y' }))
console.log('pluck    ->', pluck([{ id: 1, name: 'Ann' }, { id: 2, name: 'Bo' }], 'name'))
const ok: Result<number, string> = { ok: true, value: 42 }
console.log('Result   ->', ok)
const add = logged((a: number, b: number) => a + b)
console.log('logged   ->', add(2, 3))
const state: FetchState<string[], Error> = { status: 'success', data: ['a'] }
console.log('FetchState ->', state)
console.log('lengthOf ->', lengthOfBad('hi'), lengthOf('hi'))
