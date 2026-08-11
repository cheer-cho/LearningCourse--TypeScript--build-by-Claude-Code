/**
 * ✦ CHECKPOINT 2 — Basics
 *
 * A traffic-light controller. Combines: literal unions, as const,
 * tuples, exhaustive switches with never, and arrays.
 * Each declaration below explains its own job.
 *
 * Passing `npm test -- 02` completes this module. 🎉
 */

// The three states a traffic light can be in.
//   Define as the union: 'red' | 'green' | 'yellow'
export type Light = unknown

// All lights, in order — as a READONLY tuple of exactly those literals.
//   Hint: as const.
export const LIGHTS = ['red', 'green', 'yellow']

// How long each light stays on, in seconds — red, green, yellow, in
// that order. Type it as a tuple of exactly three numbers.
export const DURATIONS: any = [30, 25, 5]

// The state after this one: red -> green -> yellow -> red.
// Use an EXHAUSTIVE switch — if a new light is ever added to the union,
// next() must FAIL TO COMPILE until it's handled (assertNever, ex07).
//   next('red') -> 'green'
//   Signature: (light: Light) => Light
export function next(light: any): any {
  throw new Error('TODO: implement next')
}

// Run the light forward: the sequence of the next `steps` states,
// starting from (but not including) `start`.
//   simulate('red', 3) -> ['green', 'yellow', 'red']
//   Signature: (start: Light, steps: number) => Light[]
export function simulate(start: any, steps: any): any {
  throw new Error('TODO: implement simulate')
}
