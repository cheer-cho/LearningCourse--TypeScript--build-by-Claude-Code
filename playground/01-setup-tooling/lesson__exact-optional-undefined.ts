// exactOptionalPropertyTypes: "missing" and "set to undefined" are different.
// This flag is ON in this repo's tsconfig.
// Run: npm run playground exact-optional-undefined

type Strict = { theme?: string }             // absent only
type Loose  = { theme?: string | undefined } // absent OR explicitly undefined

// @ts-expect-error — TS2375: can't write undefined into `theme?: string`
const a: Strict = { theme: undefined }

// ✅ fine: the union re-allows an explicit undefined value
const b: Loose = { theme: undefined }
const c: Loose = {} // still fine — `?` still allows absence

// The runtime difference the flag protects:
console.log("'theme' in b      ->", 'theme' in b)    // true  — key exists, value is undefined
console.log("'theme' in c      ->", 'theme' in c)    // false — key absent
console.log('Object.keys(b)    ->', Object.keys(b))  // [ 'theme' ]
console.log('Object.keys(c)    ->', Object.keys(c))  // []
console.log('b.theme === c.theme ->', b.theme === c.theme) // true — reading can't tell them apart
void a
