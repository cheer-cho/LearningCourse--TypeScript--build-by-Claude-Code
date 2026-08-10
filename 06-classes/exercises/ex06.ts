/**
 * ex06 — Generic classes & `override`
 *
 * A generic class's type parameter lives on the INSTANCE: `new Stack<number>()`
 * gives you a Stack of numbers, `new Stack<string>()` a Stack of strings —
 * same code, different contract per instantiation. `override` marks a
 * method that replaces a CONCRETE method from the base class; this repo
 * requires it (`noImplicitOverride`) so a base-class rename can't silently
 * fork a subclass instead of erroring loudly.
 *
 * 1. Stack<T>:
 *    - private `items: T[]`, starts empty.
 *    - `push(item)` — adds to the top, returns nothing.
 *    - `pop()` — removes and returns the top item, or undefined if empty.
 *    - `peek()` — returns the top item without removing it, or undefined.
 *    - `get size()` — how many items.
 *    - `isEmpty()` — true when size is 0.
 * 2. LoggingStack<T> extends Stack<T> (the `override` keyword is already
 *    on push/pop below — that's required here since both replace a
 *    concrete method Stack already defines):
 *    - `log: string[]` — starts empty.
 *    - `push(item)` — records 'push' in `log`, THEN delegates via
 *      `super.push`.
 *    - `pop()` — delegates to `super.pop()` FIRST, records 'pop' in
 *      `log`, then returns what the base class returned.
 *
 *    const s = new Stack<number>()
 *    s.push(1); s.push(2)
 *    s.pop()   // -> 2
 *    s.peek()  // -> 1
 *
 * Check: npm test -- 06 -t ex06
 */

// TODO: type T, implement every member.
export class Stack<T> {
  items: any = []

  push(item: any): any {
    throw new Error('TODO: implement push')
  }

  pop(): any {
    throw new Error('TODO: implement pop')
  }

  peek(): any {
    throw new Error('TODO: implement peek')
  }

  get size(): any {
    throw new Error('TODO: implement size')
  }

  isEmpty(): any {
    throw new Error('TODO: implement isEmpty')
  }
}

// TODO: add `log`, implement the overrides.
export class LoggingStack<T> extends Stack<T> {
  log: any = []

  override push(item: any): any {
    throw new Error('TODO: implement LoggingStack.push')
  }

  override pop(): any {
    throw new Error('TODO: implement LoggingStack.pop')
  }
}
