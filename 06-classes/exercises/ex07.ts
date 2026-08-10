/**
 * ex07 — Mixins: functions that take a class, return a bigger class
 *
 * TypeScript classes don't support multiple inheritance, so the idiomatic
 * way to compose independent pieces of behaviour is a MIXIN: a function
 * that accepts a constructor and returns a new class extending it. Because
 * it's just a function, you compose features by chaining calls:
 * `Timestamped(Serializable(Note))`.
 *
 * 1. Constructor<T>: the type of "any class constructable into a T".
 *      new (...args: any[]) => T
 * 2. Timestamped<TBase extends Constructor>(Base): returns a class
 *    extending Base that adds `createdAt: Date`, set to `new Date()`
 *    when an instance is constructed.
 * 3. Serializable<TBase extends Constructor>(Base): returns a class
 *    extending Base that adds `serialize(): string`, returning
 *    `JSON.stringify(this)`.
 * 4. Note: a plain class with `title: string` and `body: string`, both
 *    set via parameter properties.
 *
 *    class Logged extends Timestamped(Serializable(Note)) {}
 *    const n = new Logged('Groceries', 'milk, eggs')
 *    n.serialize()               // -> '{"title":"Groceries","body":"milk, eggs"}'
 *    n.createdAt instanceof Date // -> true
 *
 * Check: npm test -- 06 -t ex07
 */

// TODO: new (...args: any[]) => T
export type Constructor<T = {}> = any

// TODO: constrain TBase to Constructor, return a class extending Base
// that adds createdAt: Date.
export function Timestamped(Base: any): any {
  throw new Error('TODO: implement the Timestamped mixin')
}

// TODO: constrain TBase to Constructor, return a class extending Base
// that adds serialize(): string.
export function Serializable(Base: any): any {
  throw new Error('TODO: implement the Serializable mixin')
}

// TODO: two parameter properties.
export class Note {
  title: any
  body: any

  constructor(title: any, body: any) {
    throw new Error('TODO: implement the Note constructor')
  }
}
