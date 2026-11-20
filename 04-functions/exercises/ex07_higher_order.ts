/**
 * ex07 — Higher-order functions
 *
 * Functions that take or return functions. Get comfortable typing both
 * directions — module 07 will make these generic.
 *
 * 1. makeAdder(x): returns a function that adds x.
 * 2. twice(fn): returns a function applying fn two times.
 *      twice(n => n + 1)(10) -> 12
 * 3. pipeline2(f, g): returns a function doing g(f(n)).
 *
 * Check: npm test -- 04 -t ex07
 */

type NumFn = (n: number) => number;

// TODO: fix types, then implement.
export function makeAdder(x: number): NumFn {
  return (y) => y + x;
}

// TODO: fix types, then implement.
export function twice(fn: NumFn): NumFn {
  return (n) => fn(fn(n));
}

// TODO: f turns a number into a string; g turns a string into a boolean.
//       pipeline2 returns a function from number to boolean.
export function pipeline2(f: (n: number) => string, g: (s: string) => boolean): (n: number) => boolean {
  return (n) => g(f(n));
}
