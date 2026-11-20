// Each block = one path through the "How the compiler picks T" chart
// in 07-generics/LESSON.md. Hover each const to see what T became.
// Run: npm run playground lesson__how-T-is-picked

function firstItem<T>(items: readonly T[]): T | undefined {
  return items[0]
}

// ── Path 1: explicit type argument ───────────────────────────
const a = firstItem<string>([])          // T = string (you said so)

// ── Path 2: one candidate from the arguments ─────────────────
const words = ['hi', 'yo']
const b = firstItem(words)               // string[] vs readonly T[] → T = string

// ── Path 3: several candidates ───────────────────────────────
function pair<T>(x: T, y: T): T[] { return [x, y] }
const c = pair('hi', 'yo')               // both strings → T = string
// const bad = pair(1, 'hi')             // ❌ TS2345: T fixed to number by the FIRST arg
const d = pair<number | string>(1, 'hi') // ✅ ask for the union explicitly

// Edge case: ONE argument that already holds both types → union
const e = firstItem([1, 'a'])            // array literal is (string | number)[] → T = string | number

// ── Path 4: nothing in the arguments mentions T ──────────────
function parseAs<T>(json: string): T { return JSON.parse(json) }
const f: number = parseAs('42')          // 4a: annotated target → T = number

function parseOr<T = string>(json: string): T { return JSON.parse(json) }
const g = parseOr('"x"')                 // 4b: default → T = string

const h = parseAs('42')                  // 4c: no annotation, no default → T = unknown

console.log('1  explicit        firstItem<string>([])  ->', a)
console.log('2  one candidate   firstItem(words)       ->', b)
console.log('3  same candidates pair("hi", "yo")       ->', c)
console.log('3  explicit union  pair<number|string>    ->', d)
console.log('3  edge: mixed arr firstItem([1, "a"])    ->', e)
console.log('4a annotated       f: number = parseAs    ->', f)
console.log('4b default         parseOr(\'"x"\')         ->', g)
console.log('4c unknown         parseAs("42")          ->', h, '(typed unknown)')

export {}
