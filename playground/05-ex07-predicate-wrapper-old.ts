// Simulate pre-5.5 behavior: force the arrow's return type to boolean.
type Fish = { name: string; swim: () => string };
type Bird = { name: string; fly: () => string };
const isFish = (pet: Fish | Bird): pet is Fish => 'swim' in pet;
declare const pets: (Fish | Bird)[];
// An explicit `: boolean` on the arrow is what every TS version before 5.5 inferred.
const b = pets.filter((pet): boolean => isFish(pet));
// @ts-expect-error — narrowing is lost: still (Fish | Bird)[]
const checkB: Fish[] = b;
