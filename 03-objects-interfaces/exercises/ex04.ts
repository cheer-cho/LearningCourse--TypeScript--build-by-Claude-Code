/**
 * ex04 — Interface extension
 *
 * Interfaces build hierarchies with `extends`. Each level adds
 * requirements; every Dog is a Pet, every Pet is an Animal.
 *
 * 1. Define Pet: extends Animal, adds owner (string).
 * 2. Define Dog: extends Pet, adds breed (string) and a bark() method
 *    returning string.
 * 3. Implement makeDog — bark() must return 'Woof!'.
 *
 * Check: npm test -- 03 -t ex04
 */

export interface Animal {
  name: string
}

// TODO: extends Animal, adds owner: string
export interface Pet extends Animal {
  // TODO
}

// TODO: extends Pet, adds breed: string and bark(): string
export interface Dog extends Pet {
  // TODO
}

// TODO: fix the parameter/return types, then implement.
export function makeDog(name: any, owner: any, breed: any): any {
  throw new Error('TODO: implement makeDog')
}
