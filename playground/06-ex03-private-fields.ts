// What does TS say if we try a #private parameter property?
// class Bad { constructor(#celsius: number) {} }   // uncomment to see the error

class Temperature {
  #celsius: number; // no "= 0" needed — the constructor assigns it

  constructor(celsius: number) {
    this.#celsius = celsius;
  }

  get fahrenheit(): number {
    return this.#celsius * 1.8 + 32;
  }

  set fahrenheit(f: number) {
    this.#celsius = (f - 32) / 1.8;
  }

  get value(): number {
    return this.#celsius;
  }
}

const t = new Temperature(100);
console.log(t.fahrenheit); // 212
(t as any).celsius = -999; // creates a NEW, unrelated property
console.log(t.value);      // still 100 — the real #celsius is sealed
console.log(Object.keys(t)); // [ 'celsius' ] — #celsius isn't even listed
