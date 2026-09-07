type Fish = { name: string; swim: () => string };
type Bird = { name: string; fly: () => string };

// 1. TYPE PREDICATE — answers with a boolean.
function isFish(pet: Fish | Bird): pet is Fish {
  return 'swim' in pet;
}

// 2. ASSERTION SIGNATURE — answers by not throwing.
function assertFish(pet: Fish | Bird): asserts pet is Fish {
  if (!('swim' in pet)) throw new Error(`${pet.name} is not a fish`);
}

const nemo: Fish | Bird = { name: 'Nemo', swim: () => 'splash' };
const tweety: Fish | Bird = { name: 'Tweety', fly: () => 'flap' };

// Predicate: narrowing lives inside the branch.
for (const pet of [nemo, tweety]) {
  if (isFish(pet)) {
    console.log('predicate  →', pet.swim()); // pet: Fish here
  } else {
    console.log('predicate  →', pet.fly()); // pet: Bird here
  }
}

// Assertion: narrowing lives AFTER the call, for the rest of the scope.
function describe(pet: Fish | Bird) {
  assertFish(pet);
  // From here down, pet is Fish. No `if` needed.
  console.log('assertion  →', pet.swim());
}

describe(nemo);
try {
  describe(tweety);
} catch (e) {
  console.log('assertion  → threw:', (e as Error).message);
}

// Only the predicate works with filter.
const school = [nemo, tweety].filter(isFish); // Fish[]
console.log('filter     →', school.map((f) => f.name));
