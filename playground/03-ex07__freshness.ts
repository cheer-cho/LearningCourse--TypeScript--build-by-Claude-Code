// When does the excess property check fire? Only on *fresh* object literals.
type Named = { name: string }
declare function greet (entity: Named): string

// 1. fresh literal at the call site
greet({ name: 'Ada', age: 36 })

// 2. same object, but via a variable — freshness is gone
const p = { name: 'Ada', age: 36 }
greet(p)

// 3. fresh literal at a *declaration* with an annotation — still fresh
const q: Named = { name: 'Ada', age: 36 }

// 4. an assertion kills freshness
greet({ name: 'Ada', age: 36 } as Named)

// 5. a spread inside a fresh literal
greet({ ...p })

// 6. an extra property written next to the spread
greet({ ...p, wheels: 3 })
