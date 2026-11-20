class Control {
  private state = 0          // private: only Control and its subclasses have this
}

// "Anything Selectable must BE a Control (or subclass), plus have select()"
interface Selectable extends Control {
  select(): void
}

// ✅ a real subclass of Control
class Button extends Control implements Selectable {
  select() {}
}

// ❌ looks the same, but isn't descended from Control
class Fake implements Selectable {
  private state = 0
  select() {}
}

// ❌ a plain object can't have a private member at all
const obj: Selectable = { select() {} }


// This is the use case
// const aSwitch = new Button()
// aSwitch.select()