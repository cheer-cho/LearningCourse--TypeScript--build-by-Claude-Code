/**
 * ✦ CHECKPOINT 2 — Basics
 *
 * A traffic-light controller. Combines: literal unions, as const,
 * tuples, exhaustive switches with never, and arrays.
 *
 * 1. Define Light as the union 'red' | 'green' | 'yellow'.
 * 2. Make LIGHTS a readonly tuple of exactly those literals (as const).
 * 3. DURATIONS is a tuple: seconds for red, green, yellow (in that order).
 * 4. next: red -> green -> yellow -> red. Exhaustive switch — if a new
 *    light is ever added to the union, next() must FAIL TO COMPILE until
 *    it's handled (use the assertNever pattern from ex07).
 * 5. simulate(start, steps): the sequence of the next `steps` states.
 *      simulate('red', 3) -> ['green', 'yellow', 'red']
 *
 * Passing `npm test -- 02` completes this module. 🎉
 */

// TODO
export type Light = unknown

// TODO: as const
export const LIGHTS = ['red', 'green', 'yellow']

// TODO: type this as a tuple of three numbers.
export const DURATIONS: any = [30, 25, 5]

// TODO: fix the types, then implement (exhaustively!).
export function next(light: any): any {
  throw new Error('TODO: implement next')
}

// TODO: fix the types, then implement.
export function simulate(start: any, steps: any): any {
  throw new Error('TODO: implement simulate')
}
