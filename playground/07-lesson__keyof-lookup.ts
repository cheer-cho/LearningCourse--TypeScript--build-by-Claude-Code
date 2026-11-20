// getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
// keyof T lists the keys, K extends keyof T restricts the key,
// T[K] looks up the value type. Hover n, a, f, w, loose.
// Run: npx tsx playground/07-lesson__keyof-lookup.ts

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Ada', age: 36, admin: true }

// ── Piece 1: keyof T = union of the key names ───────────────
type UserKeys = keyof typeof user          // 'name' | 'age' | 'admin'

// ── Piece 2: T[K] = look up the value type at that key ──────
type NameType = (typeof user)['name']      // string
type AgeType = (typeof user)['age']        // number

// ── Piece 3: putting it together ────────────────────────────
const n = getProperty(user, 'name')        // string
const a = getProperty(user, 'age')         // number
const f = getProperty(user, 'admin')       // boolean
// const bad = getProperty(user, 'email')  // ❌ TS2345: '"email"' is not assignable to '"name" | "age" | "admin"'

// ── Mistake: no separate K → every value type mixed together ─
function wide<T>(obj: T, key: keyof T) { return obj[key] }
const w = wide(user, 'name')               // string | number | boolean 😕

// ── Mistake: plain string key → no checking at all ──────────
function getLoose(obj: Record<string, unknown>, key: string): unknown {
  return obj[key]
}
const loose = getLoose(user, 'email')      // no error, result unknown, value undefined

const keys: UserKeys[] = ['name', 'age', 'admin']
const sample: [NameType, AgeType] = [n, a]

console.log('keyof typeof user          ->', keys)
console.log('getProperty(user, "name")  ->', n, '(typed string)')
console.log('getProperty(user, "age")   ->', a, '(typed number)')
console.log('getProperty(user, "admin") ->', f, '(typed boolean)')
console.log('wide(user, "name")         ->', w, '(typed string | number | boolean)')
console.log('getLoose(user, "email")    ->', loose, '(no compile error!)')
console.log('[NameType, AgeType] sample ->', sample)

export {}
