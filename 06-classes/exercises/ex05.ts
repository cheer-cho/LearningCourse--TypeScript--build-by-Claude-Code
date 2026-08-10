/**
 * ex05 — Abstract classes & `implements`
 *
 * An abstract class is a template: it can hold real code (fields, concrete
 * methods) alongside methods it deliberately leaves unimplemented for
 * subclasses to fill in. `implements` makes a class promise to satisfy an
 * interface's shape — the compiler checks it, but no code is inherited.
 *
 * 1. Describable — interface with one method: describe(): string.
 * 2. Vehicle — an ABSTRACT class that `implements Describable`.
 *    - constructor takes `make: string`, stored as a public readonly field.
 *    - `abstract topSpeed(): number` — no body; every subclass must supply one.
 *    - `describe()` — CONCRETE: returns `${make} tops out at ${topSpeed()} km/h`.
 *      (concrete code calling an abstract method is the whole point —
 *      Vehicle doesn't know HOW fast, only that every subclass can say.)
 * 3. Car extends Vehicle: constructor(make, private speedKph), topSpeed()
 *    returns speedKph.
 * 4. Bike extends Vehicle: constructor(make, private gears), topSpeed()
 *    returns gears * 8 (a silly formula, but deterministic).
 *
 * Vehicle itself must be impossible to `new` up directly.
 *
 *    new Car('Toyota', 180).describe() // -> 'Toyota tops out at 180 km/h'
 *
 * Check: npm test -- 06 -t ex05
 */

// TODO: one method, describe(): string.
export interface Describable {
  describe(): unknown
}

// TODO: make this abstract, implement Describable, add the abstract
// topSpeed() method, and write the concrete describe().
export class Vehicle {
  make: any

  constructor(make: any) {
    throw new Error('TODO: implement the Vehicle constructor')
  }

  describe(): any {
    throw new Error('TODO: implement describe')
  }
}

// TODO: extend Vehicle, add a private speedKph, implement topSpeed.
export class Car extends Vehicle {
  topSpeed(): any {
    throw new Error('TODO: implement Car.topSpeed')
  }
}

// TODO: extend Vehicle, add a private gears, implement topSpeed.
export class Bike extends Vehicle {
  topSpeed(): any {
    throw new Error('TODO: implement Bike.topSpeed')
  }
}
