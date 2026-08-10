/**
 * ex07 — Type predicates: narrowing across function boundaries
 *
 * `looksLikeFish` below is correct at runtime — but its return type is
 * plain `boolean`, so `if (looksLikeFish(pet))` narrows NOTHING: the
 * checker can't see what the function checked. A TYPE PREDICATE puts
 * that knowledge in the signature: `pet is Fish`.
 *
 * 1. isFish(pet): same runtime logic as looksLikeFish, but declared as
 *    a predicate `pet is Fish`.
 * 2. isString(value): a predicate over unknown — `value is string`.
 *    Predicates from unknown are how you tame external data.
 * 3. swimmers(pets): return only the Fish, typed Fish[]. Use
 *    pets.filter(isFish) — filter UNDERSTANDS predicates and changes
 *    its element type. (Try filter(looksLikeFish) and hover the
 *    result: still (Fish | Bird)[]. That's the whole point.)
 *
 * Check: npm test -- 05 -t ex07
 */

// Given — do not change.
export type Fish = { name: string; swim: () => string }
export type Bird = { name: string; fly: () => string }

// Given — correct logic, but boolean narrows nothing across the call.
export function looksLikeFish(pet: Fish | Bird): boolean {
  return 'swim' in pet
}

// TODO: declare as a type predicate (pet: Fish | Bird) => pet is Fish,
// then implement.
export function isFish(pet: any): any {
  throw new Error('TODO: implement isFish')
}

// TODO: declare as (value: unknown) => value is string, then implement.
export function isString(value: any): any {
  throw new Error('TODO: implement isString')
}

// TODO: type as (pets: (Fish | Bird)[]) => Fish[], then implement
// with filter(isFish).
export function swimmers(pets: any): any {
  throw new Error('TODO: implement swimmers')
}
