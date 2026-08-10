// Helper module for ex06 — complete, DO NOT EDIT.
// Models what `esModuleInterop` produces for a CJS package written as
// `module.exports = fn` with an extra property hung off it (common in
// the wild — many CLI/utility packages do exactly this): a callable
// default export that also carries `.version`.

function legacyGreet(name: string): string {
  return `hi, ${name}`
}
legacyGreet.version = '1.0.0'

export default legacyGreet
