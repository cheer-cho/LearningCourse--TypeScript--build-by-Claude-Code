// `readonly` is a compile-time promise only — an alias without it can still write.
// Run: npm run playground readonly-existant
//   (the type-check step shows one ❌ TS2540 on `y.port = 3000`;
//    the aliased write through `plain` compiles silently)

export type Config = {
  readonly host: string
  readonly port: number
  debug: boolean
}

const c: Config = { host: 'localhost', port: 8080, debug: false }
const plain: { host: string; port: number; debug: boolean } = c   // ✅ readonly is ignored by assignability

plain.port = 3000   // ✅ compiles — and writes to the SAME object

console.log('plain.port ->', plain.port)
console.log('c.port     ->', c.port, '(c is mutated: same object)')
console.log('c === plain ->', c === plain)

// The other direction: mutable -> readonly is fine too…
const x: { host: string; port: number; debug: boolean } = { host: 'localhost', port: 8080, debug: false }
const y: Config = x

// …but now writes through `y` are blocked.
// ❌ error TS2540: Cannot assign to 'port' because it is a read-only property.
y.port = 3000

console.log('x.port     ->', x.port, '(runtime ignores readonly: the write still happened)')
