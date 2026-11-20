interface Printable { print(): string }
class Base { id = 1 }

// 1. class extends class  ✅
class A extends Base {}

// 2. class extends interface  ❌
class B extends Printable {}

// 3. class implements interface  ✅
class C implements Printable { print() { return "c" } }

// 4. class implements class  ✅ (!) — the class is used as a shape only
class D implements Base { id = 2 }

// 5. interface extends interface  ✅ (module 03)
interface Labeled extends Printable { label: string }

// 6. interface extends class  ✅ (!) — takes the instance shape
interface BaseLike extends Base {}
const x: BaseLike = { id: 3 }

// 7. interface implements anything  ❌
interface E implements Printable {}
