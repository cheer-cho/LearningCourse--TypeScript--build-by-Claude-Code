// The full grid: who may `extends` / `implements` whom. 2 of 7 combos are errors.
// Run: npm run playground lesson__extends-vs-implements
//   (the type-check step shows the two ❌ errors: TS2689 and TS1176)

interface Printable { print(): string }
class Base { id = 1 }

// 1. class extends class  ✅
class A extends Base {}
console.log('1. class extends class         ->', new A().id) // 1 — inherited

// 2. class extends interface  ❌
try {
  class B extends Printable {}
} catch (e) {
  // Interfaces are erased, so at runtime there is nothing to extend.
  console.log('2. class extends interface     -> 💥', (e as Error).message)
}

// 3. class implements interface  ✅
class C implements Printable { print() { return "c" } }
console.log('3. class implements interface  ->', new C().print())

// 4. class implements class  ✅ (!) — the class is used as a shape only
class D implements Base { id = 2 }
console.log('4. class implements class      ->', new D().id, '| instanceof Base?', new D() instanceof Base)

// 5. interface extends interface  ✅ (module 03)
interface Labeled extends Printable { label: string }

// 6. interface extends class  ✅ (!) — takes the instance shape
interface BaseLike extends Base {}
const x: BaseLike = { id: 3 }
console.log('6. interface extends class     ->', x)

// 7. interface implements anything  ❌
interface E implements Printable {}
