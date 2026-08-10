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

// TODO: parameter property + real accessor types.
export class Temperature {
  celsius: any

  constructor(celsius: any) {
    throw new Error('TODO: implement Temperature')
  }

  get fahrenheit(): any {
    throw new Error('TODO: implement the fahrenheit getter')
  }

  set fahrenheit(f: any) {
    throw new Error('TODO: implement the fahrenheit setter')
  }

  get value(): any {
    throw new Error('TODO: implement the value getter')
  }
}

// TODO: readonly parameter property + area getter.
export class Circle {
  radius: any

  constructor(radius: any) {
    throw new Error('TODO: implement Circle')
  }

  get area(): any {
    throw new Error('TODO: implement the area getter')
  }
}
