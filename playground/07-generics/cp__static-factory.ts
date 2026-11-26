/**
 * A static factory on a generic class: the class's T belongs to INSTANCES,
 * so a static method declares its OWN type parameter and returns `new`.
 * (Analogy for checkpoint 7b's Collection.of, using a different class: Bag.)
 *
 * Run: npm run playground cp__static-factory
 */

class Bag<T> {
  private readonly items: T[];

  constructor(items: readonly T[]) {
    this.items = [...items];
  }

  // A static method lives on the CLASS (Bag.single), not on an instance.
  // No instance exists yet, so no T has been chosen. It declares its own U.
  static single<U>(item: U): Bag<U> {
    return new Bag([item]); // build an instance: here U fills Bag's T
  }

  // ❌ Using the class's T in a static member:
  // static broken(item: T): Bag<T> { ... }
  //   error TS2302: Static members cannot reference class type parameters.

  describe(): string {
    return `Bag(${this.items.join(', ')})`;
  }
}

// Two ways to get a Bag<string>:
const viaNew = new Bag(['hi']);      // constructor: you pass an array
const viaStatic = Bag.single('hi');  // factory: a nicer call shape
//    ^? Bag<string>

console.log('new Bag(["hi"])   ->', viaNew.describe());
console.log('Bag.single("hi")  ->', viaStatic.describe());

// A built-in you already know does the same thing:
console.log('Array.of(1, 2, 3) ->', Array.of(1, 2, 3));

// Where each one is found:
console.log('typeof Bag.single      ->', typeof Bag.single);              // on the class
console.log("'single' in viaNew      ->", 'single' in viaNew);             // not on instances
