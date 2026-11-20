/**
 * ex01 — Branded (nominal) types
 *
 * Structural typing means ANY number is accepted where `Meters` is
 * expected — until you brand it. A brand is a phantom property that only
 * exists in the type system; a constructor function is the single place
 * where a raw value is cast into the brand.
 *
 * 1. Define the generic helper:
 *      Brand<T, B> = T & { readonly __brand: B }
 * 2. Define UserId, Meters and Seconds using Brand.
 * 3. Implement the constructors userId / meters / seconds. Each takes the
 *    raw primitive and returns the branded type (one `as` cast inside —
 *    that's the whole point: the cast lives HERE and nowhere else).
 * 4. Implement speed(distance, time) -> plain number (m/s):
 *      speed(meters(100), seconds(20)) -> 5
 *    Passing (seconds, meters) — or raw numbers — must NOT compile.
 *
 * Check: npm test -- 11 -t ex01
 */

// TODO: T & { readonly __brand: B }
export type Brand<T, B extends string> = unknown

// TODO: brand string as 'UserId'
export type UserId = unknown

// TODO: brand number as 'Meters'
export type Meters = unknown

// TODO: brand number as 'Seconds'
export type Seconds = unknown

// TODO: type the parameter and return, then implement (cast inside).
export function userId(raw: any): any {
  throw new Error('TODO: implement userId')
}

// TODO
export function meters(raw: any): any {
  throw new Error('TODO: implement meters')
}

// TODO
export function seconds(raw: any): any {
  throw new Error('TODO: implement seconds')
}

// TODO: only Meters and Seconds (in that order) may be passed.
export function speed(distance: any, time: any): any {
  throw new Error('TODO: implement speed')
}
