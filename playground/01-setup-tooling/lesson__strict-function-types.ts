// strictFunctionTypes demo — why "only handles Dog" can't fill an Animal job.

class Animal { name = 'some animal' }
class Cat extends Animal { meow() { console.log('meow') } }
class Dog extends Animal { bark() { console.log('woof') } }

type AnimalHandler = (a: Animal) => void

const dogsOnly = (d: Dog) => d.bark()

// With strictFunctionTypes ON, this line is a compile error.
// The `as` cast forces it through, simulating the flag being OFF:
const handle = dogsOnly as AnimalHandler

// The caller trusts the type: "I can pass ANY Animal." So it passes a Cat.
handle(new Cat()) // 💥 TypeError: d.bark is not a function

// The OTHER direction is safe and allowed (no cast needed):
const anythingGoes = (x: unknown) => console.log('handled:', x)
const handle2: AnimalHandler = anythingGoes // ✅ wider param is fine
handle2(new Cat())
