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

// TODO: fix types, then implement.
export function makeAdder(x: any): any {
  throw new Error('TODO: implement makeAdder')
}

// TODO: fix types, then implement.
export function twice(fn: any): any {
  throw new Error('TODO: implement twice')
}

// TODO: f turns a number into a string; g turns a string into a boolean.
//       pipeline2 returns a function from number to boolean.
export function pipeline2(f: any, g: any): any {
  throw new Error('TODO: implement pipeline2')
}
