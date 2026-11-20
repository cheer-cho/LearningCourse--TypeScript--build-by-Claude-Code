// Does wrapping a predicate in an arrow keep the narrowing? (TS 5.5+: yes, it is inferred.)
// Run: npm run playground predicate-wrapper
type Fish = { name: string; swim: () => string };
type Bird = { name: string; fly: () => string };
const isFish = (pet: Fish | Bird): pet is Fish => 'swim' in pet;
const looksLikeFish = (pet: Fish | Bird): boolean => 'swim' in pet;

const pets: (Fish | Bird)[] = [
  { name: 'Nemo', swim: () => 'splash' },
  { name: 'Tweety', fly: () => 'flap' },
];

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
type WrapperType = typeof wrapper;           // hover: (pet: Fish | Bird) => pet is Fish
const probe: (pet: Fish | Bird) => pet is Fish = wrapper;

// Runtime: all three filters keep the same items. Only the TYPES differ.
console.log('a (isFish)          ->', checkA.map((p) => p.name));
console.log('b (pet => isFish)   ->', checkB.map((p) => p.name));
console.log('c (looksLikeFish)   ->', checkC.map((p) => p.name));
console.log('probe(pets[0]!)     ->', probe(pets[0]!));

export type { WrapperType };
