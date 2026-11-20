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
export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class LoggingStack<T> extends Stack<T> {
  log: string[] = [];

  override push(item: T): void {
    this.log.push("push");
    super.push(item);
  }

  override pop(): T | undefined {
    const item = super.pop();
    this.log.push("pop");
    return item;
  }
}
