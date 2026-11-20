// strictFunctionTypes demo — why "only handles Dog" can't fill an Animal job.
// Run: npm run playground strict-function-types

class Animal { name = 'some animal' }
class Cat extends Animal { meow() { console.log('meow') } }
class Dog extends Animal { bark() { console.log('woof') } }

type AnimalHandler = (a: Animal) => void

const dogsOnly = (d: Dog) => d.bark()

// With strictFunctionTypes ON, `const handle: AnimalHandler = dogsOnly` is
// a compile error (TS2322). The `as` cast forces it through, simulating
// the flag being OFF:
const handle = dogsOnly as AnimalHandler

// The caller trusts the type: "I can pass ANY Animal." So it passes a Cat.
try {
  handle(new Cat())
} catch (e) {
  console.log('narrow handler + Cat ->', String(e)) // 💥 TypeError: d.bark is not a function
}

// The OTHER direction is safe and allowed (no cast needed):
const anythingGoes = (x: unknown) => console.log('wide handler + Cat   -> handled:', x)
const handle2: AnimalHandler = anythingGoes // ✅ wider param is fine
handle2(new Cat())
