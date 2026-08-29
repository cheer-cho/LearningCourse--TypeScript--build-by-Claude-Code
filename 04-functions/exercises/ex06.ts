/**
 * ex06 — The void-return quirk
 *
 * `() => void` callbacks may RETURN anything — the value is ignored.
 * This is what lets `forEach(x => results.push(x))` compile even though
 * push returns a number.
 *
 * 1. Implement forEachNumber: call `visit` for every item, in order.
 * 2. Implement collectDoubles USING forEachNumber and Array#push inside
 *    the callback (push returns number — and that's fine for void).
 * 3. Quiz: answer by experimenting in a scratch file.
 *
 * Check: npm test -- 04 -t ex06
 */

export function forEachNumber(items: number[], visit: (n: number) => void): void {
  for (const item of items) {
    visit(item);
  }
}

// Return [n*2 for each n], built via forEachNumber + push.
export function collectDoubles(items: number[]): number[] {
  const result: number[] = [];
  forEachNumber(items, (item) => result.push(item * 2));
  return result;
}

// Quiz:
//   q1: `const cb: () => void = () => 42` — does it compile?
//   q2: `function f(): void { return 42 }` — does it compile?
//       (declared return annotation, not a callback type!)
export const quiz: { q1: 'yes' | 'no'; q2: 'yes' | 'no'; } = {
  q1: 'yes', // 
  q2: 'no', //
};
