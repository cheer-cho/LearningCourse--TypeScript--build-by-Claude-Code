// When does the excess property check fire? Only on *fresh* object literals.
// Run: npm run playground freshness
//   (the type-check step shows ❌ TS2353 for cases 1, 3 and 6; the rest compile.
//    At runtime every call works — the check is compile-time only.)

type Named = { name: string }
function greet (entity: Named): string {
  return `Hello, ${entity.name}!`
}

// 1. fresh literal at the call site                      ❌ TS2353 'age'
console.log('1 fresh arg      ->', greet({ name: 'Ada', age: 36 }))

// 2. same object, but via a variable — freshness is gone  ✅
const p = { name: 'Ada', age: 36 }
console.log('2 via variable   ->', greet(p))

// 3. fresh literal at a *declaration* with an annotation — still fresh  ❌ TS2353 'age'
const q: Named = { name: 'Ada', age: 36 }
console.log('3 annotated decl ->', q)

// 4. an assertion kills freshness                          ✅
console.log('4 assertion      ->', greet({ name: 'Ada', age: 36 } as Named))

// 5. a spread inside a fresh literal                       ✅
console.log('5 spread         ->', greet({ ...p }))

// 6. an extra property written next to the spread         ❌ TS2353 'wheels'
console.log('6 spread + extra ->', greet({ ...p, wheels: 3 }))
