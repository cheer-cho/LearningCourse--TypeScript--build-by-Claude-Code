// An interface that extends a class with a `private` member: only that class's
// descendants can satisfy it.
// Run: npm run playground lesson__interface-extends-class
//   (the type-check step shows the two ❌ errors: TS2420 and TS2741)

class Control {
  private state = 0          // private: only Control and its subclasses have this
}

// "Anything Selectable must BE a Control (or subclass), plus have select()"
interface Selectable extends Control {
  select(): void
}

// ✅ a real subclass of Control
class Button extends Control implements Selectable {
  select() { console.log('Button.select() -> clicked') }
}

// ❌ looks the same, but isn't descended from Control
class Fake implements Selectable {
  private state = 0
  select() {}
}

// ❌ a plain object can't have a private member at all
const obj: Selectable = { select() {} }

// This is the use case: code that takes a Selectable may rely on it being a Control.
function activate(s: Selectable) {
  s.select()
  console.log('is a Control?   ->', s instanceof Control)
}
activate(new Button())                      // ✅ true
console.log('Fake instanceof Control ->', new Fake() instanceof Control) // false — why TS rejects it
