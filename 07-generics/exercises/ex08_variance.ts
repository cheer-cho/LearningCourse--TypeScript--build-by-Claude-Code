/**
 * ex08 — Variance intuition (arrays & function parameters)
 *
 * `Dog` is assignable to `Animal`. But is `Dog[]` assignable to
 * `Animal[]`? Is a Dog-handler assignable where an Animal-handler is
 * expected — or the other way round? (See the variance diagram in
 * LESSON.md.)
 *
 * 1. Implement describeAll: the name of every animal. Take a READONLY
 *    array — read-only element access is safe for any Animal[] or Dog[]
 *    a caller might have.
 * 2. Answer the quiz by experimenting: type each snippet in this file,
 *    see what the compiler says, set the answer, delete the experiment.
 *
 * Check: npm test -- 07 -t ex08
 */

export type Animal = { name: string; };
export type Dog = { name: string; breed: string; };

// TODO: parameter type readonly Animal[], return the names.
export function describeAll(animals: readonly Animal[]): string[] {
  return animals.map(animal => animal.name);
}

// Quiz — does each snippet COMPILE? Answer 'yes' or 'no'.
// (Assume `const dogs: Dog[] = [{ name: 'Rex', breed: 'lab' }]` exists.)
//
//   q1:  const animals: Animal[] = dogs
//   q2:  (after q1)  animals.push({ name: 'Mia' })
//        // ...if it compiles, dogs now holds a breed-less impostor!
//   q3:  const safe: readonly Animal[] = dogs
//        safe.push({ name: 'Mia' })          // does the push compile?
//   q4:  const takesDog: (d: Dog) => void = (a: Animal) => {}
//   q5:  const takesAnimal: (a: Animal) => void =
//          (d: Dog) => d.breed.length
export const quiz: {
  q1: 'yes' | 'no';
  q2: 'yes' | 'no';
  q3: 'yes' | 'no';
  q4: 'yes' | 'no';
  q5: 'yes' | 'no';
} = {
  q1: 'yes', // Arrays are covariant: Dog[] → Animal[]
  q2: 'yes', // ...and that's unsound. TS trades safety for convenience here
  q3: 'no', // readonly prevent direct push
  q4: 'yes', // Parameters are contravariant: an Animal-handler can handle any Dog
  q5: 'no' // strictFunctionTypes blocks it: a Dog-handler would read .breed on a plain Animal
};
