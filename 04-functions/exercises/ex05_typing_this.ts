/**
 * ex05 — Typing `this`
 *
 * A first parameter literally named `this` types what `this` must be
 * inside the function. It is erased at runtime — callers never pass it.
 *
 * 1. Complete the Counter interface: increment must declare
 *    `this: Counter` and return the new count.
 * 2. Implement makeCounter starting at 0. Use a REGULAR method or
 *    function (not an arrow — arrows don't have their own `this`).
 *
 * After solving: try `const f = makeCounter().increment; f()` in a
 * playground file — the compiler rejects the detached call. That's the
 * `this` parameter protecting you.
 *
 * Check: npm test -- 04 -t ex05
 */

export interface Counter {
  count: number;
  // TODO: declare increment with a `this: Counter` parameter, returning number.
  increment(this: Counter): number;
}

export function makeCounter(): Counter {
  return {
    count: 0,
    increment() {
      return ++this.count;
    }
  };
}
