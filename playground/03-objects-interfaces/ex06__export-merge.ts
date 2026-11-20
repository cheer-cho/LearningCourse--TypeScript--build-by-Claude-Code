// Merging needs every declaration to agree on `export`.
// Run: npm run playground export-merge
//   (the type-check step shows ❌ TS2395 twice, once on each declaration)

// ❌ error TS2395: Individual declarations in merged declaration 'Mixed' must be all exported or all local.
export interface Mixed { a: string }
// ❌ error TS2395 (same message)
interface Mixed { b: string }   // <- no export

// They do NOT merge. Inside this file, `Mixed` means the local one: just `b`.
// (An importer would see only the exported one: just `a`.)
const local: Mixed = { b: 'only b' }

console.log('local ->', local)
