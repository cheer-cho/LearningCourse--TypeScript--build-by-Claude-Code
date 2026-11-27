// Why getProperty's return type T[K] needs no `| undefined`.
// The constraint K extends keyof T rejects missing keys at the call site.
// Optional props already carry `undefined` inside T[K].
// Gotcha: on an index signature, the generic T[K] drops the `undefined`
// that noUncheckedIndexedAccess adds to a direct lookup.
// Run: npm run playground ex06__keyof-no-undefined

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

interface User {
  name: string
  nickname?: string
}
const user: User = { name: 'Ada' }

// ── 1. Required key: the key exists, so no undefined ────────
const name = getProperty(user, 'name') // string

// ── 2. Optional key: undefined comes from the `?` itself ────
const nickname = getProperty(user, 'nickname') // string | undefined

// ── 3. Missing key: rejected before the function runs ───────
// getProperty(user, 'age') // ❌ TS2345: '"age"' is not assignable to 'keyof User'

// ── 4. Gotcha: index signature ──────────────────────────────
const scores: Record<string, number> = { ada: 10 }
const viaGeneric = getProperty(scores, 'bob') // number  ⚠️ (wrong: it's undefined!)
const direct = scores['bob'] // number | undefined ✅

console.log('getProperty(user, "name")     ->', name, '(typed string)')
console.log('getProperty(user, "nickname") ->', nickname, '(typed string | undefined)')
console.log('getProperty(scores, "bob")    ->', viaGeneric, '(typed number ⚠️)')
console.log('scores["bob"]                 ->', direct, '(typed number | undefined)')

export {}
