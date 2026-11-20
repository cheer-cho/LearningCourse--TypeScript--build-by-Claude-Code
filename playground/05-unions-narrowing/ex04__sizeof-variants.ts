// Three ways to tell string[] from Set<string>. All narrow correctly.
type Coll = string[] | Set<string>

function viaIn(c: Coll): number {
  return 'size' in c ? c.size : c.length          // key evidence
}
function viaInstanceof(c: Coll): number {
  return c instanceof Set ? c.size : c.length     // class evidence
}
function viaIsArray(c: Coll): number {
  return Array.isArray(c) ? c.length : c.size     // built-in type guard
}

// A sneaky array that happens to carry a `size` key at runtime.
const tricky = Object.assign(['a', 'b'], { size: 99 }) as string[]

console.log('in:         ', viaIn(tricky))          // 99  <- fooled
console.log('instanceof: ', viaInstanceof(tricky))  // 2
console.log('isArray:    ', viaIsArray(tricky))     // 2
