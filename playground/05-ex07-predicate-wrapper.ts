// Does wrapping a predicate in an arrow keep the narrowing?
type Fish = { name: string; swim: () => string };
type Bird = { name: string; fly: () => string };
const isFish = (pet: Fish | Bird): pet is Fish => 'swim' in pet;
const looksLikeFish = (pet: Fish | Bird): boolean => 'swim' in pet;

declare const pets: (Fish | Bird)[];

const a = pets.filter(isFish);               // direct predicate
const b = pets.filter((pet) => isFish(pet)); // arrow wrapper
const c = pets.filter(looksLikeFish);        // plain boolean

// Type-level probes: these lines only compile if the type matches.
const checkA: Fish[] = a;
const checkB: Fish[] = b;
// @ts-expect-error — boolean-returning function does not narrow
const checkC: Fish[] = c;

// What predicate did TS infer for the arrow wrapper?
const wrapper = (pet: Fish | Bird) => isFish(pet);
type WrapperType = typeof wrapper;
const probe: (pet: Fish | Bird) => pet is Fish = wrapper;

console.log('compiled OK', typeof checkA, typeof checkB, typeof checkC, typeof probe);
