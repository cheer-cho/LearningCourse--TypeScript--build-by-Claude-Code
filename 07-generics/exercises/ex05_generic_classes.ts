/**
 * ex05 — Generic classes (brief)
 *
 * A class can take type parameters too — the whole instance is then
 * specialized: `new Stack<number>()` only ever holds numbers. This is a
 * quick taste; classes get their own module (06).
 *
 * Implement Stack<T>, last-in first-out:
 *   - push(item): add on top, returns nothing
 *   - pop(): remove and return the top item, or undefined when empty
 *   - peek(): look at the top item without removing, or undefined
 *   - size: a GETTER for the current count
 * Store the items in a private T[] field.
 *
 * Note: nothing in `new Stack()` mentions T, so callers pick it
 * explicitly — `new Stack<number>()`.
 *
 * Check: npm test -- 07 -t ex05
 */

export class Stack<T> {
  // TODO: private items field

  // TODO: fix the types, then implement.
  push(item: any): void {
    throw new Error('TODO: implement push')
  }

  pop(): any {
    throw new Error('TODO: implement pop')
  }

  peek(): any {
    throw new Error('TODO: implement peek')
  }

  get size(): number {
    throw new Error('TODO: implement size')
  }
}
