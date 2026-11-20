// Simulate pre-5.5 behavior: force the arrow's return type to boolean.
// Run: npm run playground predicate-wrapper-old
type Fish = { name: string; swim: () => string };
type Bird = { name: string; fly: () => string };
const isFish = (pet: Fish | Bird): pet is Fish => 'swim' in pet;

const pets: (Fish | Bird)[] = [
  { name: 'Nemo', swim: () => 'splash' },
  { name: 'Tweety', fly: () => 'flap' },
];

// An explicit `: boolean` on the arrow is what every TS version before 5.5 inferred.
const b = pets.filter((pet): boolean => isFish(pet));
// @ts-expect-error — narrowing is lost: still (Fish | Bird)[]
const checkB: Fish[] = b;

// Runtime is identical: Nemo is kept either way. The `: boolean` only throws away the TYPE.
console.log('b (pet): boolean => isFish(pet) ->', checkB.map((p) => p.name));
