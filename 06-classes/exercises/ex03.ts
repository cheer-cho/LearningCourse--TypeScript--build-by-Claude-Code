/**
 * ex03 — Parameter properties and accessors
 *
 * `constructor(private x: number) {}` declares the field, types it, and
 * assigns it — one line instead of three. Getters/setters then expose a
 * controlled view of such private state.
 *
 * 1. Temperature — stores ONLY a private `celsius` value:
 *    - delete the `celsius` field and the constructor body; declare
 *      celsius as a PRIVATE PARAMETER PROPERTY instead.
 *    - `get fahrenheit()` — celsius * 1.8 + 32
 *    - `set fahrenheit(f)` — stores back as celsius: (f - 32) / 1.8
 *    - `get value()` — the raw celsius number
 * 2. Circle:
 *    - `radius` as a READONLY parameter property.
 *    - `get area()` — Math.PI * radius ** 2. No setter — which makes
 *      `area` a readonly property in the type.
 *
 *    const t = new Temperature(100)
 *    t.fahrenheit      // -> 212
 *    t.fahrenheit = 32 // stores 0 celsius
 *    t.value           // -> 0
 *
 * Check: npm test -- 06 -t ex03
 */

export class Temperature {
  constructor(private celsius: number) { }

  get fahrenheit(): number {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(f: number) {
    this.celsius = (f - 32) / 1.8;
  }

  get value(): number {
    return this.celsius;
  }
}

export class TemperatureWithNativePrivate {
  // Same as Temperature, but runtime-private (#) — can't be a parameter property (TS18009)
  #celsius: number;
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

export class Circle {
  constructor(readonly radius: number) { }

  get area(): number {
    return Math.PI * this.radius ** 2;
  }
}
