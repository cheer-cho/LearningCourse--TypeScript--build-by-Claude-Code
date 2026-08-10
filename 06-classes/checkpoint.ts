/**
 * ✦ CHECKPOINT 6 — Classes
 *
 * A small shape library. Combines: abstract classes & implements, generics
 * in a class, override, static members, and readonly parameter properties.
 *
 * 1. HasArea — interface with one method: area(): number.
 * 2. Shape — ABSTRACT, implements HasArea.
 *    - static `count` — number of shapes ever constructed (starts at 0).
 *    - constructor takes `name: string`, stored as a public readonly
 *      field; also increments Shape.count.
 *    - `abstract area(): number`.
 *    - `describe()` — CONCRETE: `${name}: area ${area().toFixed(2)}`.
 * 3. Circle extends Shape: readonly `radius` parameter property, calls
 *    `super('Circle')`, area = PI * radius ** 2.
 * 4. Rectangle extends Shape: readonly `width` and `height` parameter
 *    properties, calls `super('Rectangle')`, area = width * height.
 * 5. ShapeCollection<T extends Shape> — a typed collection:
 *    - `add(shape)` — appends.
 *    - `get size()` — how many shapes.
 *    - `totalArea()` — sum of every shape's area.
 *    - `largest()` — the shape with the greatest area, or undefined when
 *      empty.
 *
 *    const c = new Circle(2)
 *    c.describe() // -> 'Circle: area 12.57'
 *    Shape.count  // -> 1 (grows with every Shape subclass constructed)
 *
 * Passing `npm test -- 06` completes this module. 🎉
 */

// TODO: one method, area(): number.
export interface HasArea {
  area(): unknown
}

// TODO: make abstract, implements HasArea, static count, ctor, abstract
// area(), concrete describe().
export class Shape {
  static count: any

  name: any

  constructor(name: any) {
    throw new Error('TODO: implement the Shape constructor')
  }

  describe(): any {
    throw new Error('TODO: implement describe')
  }
}

// TODO: readonly parameter property + area().
export class Circle extends Shape {
  area(): any {
    throw new Error('TODO: implement Circle.area')
  }
}

// TODO: two readonly parameter properties + area().
export class Rectangle extends Shape {
  area(): any {
    throw new Error('TODO: implement Rectangle.area')
  }
}

// TODO: constrain T, implement every member.
export class ShapeCollection<T> {
  shapes: any = []

  add(shape: any): any {
    throw new Error('TODO: implement add')
  }

  get size(): any {
    throw new Error('TODO: implement size')
  }

  totalArea(): any {
    throw new Error('TODO: implement totalArea')
  }

  largest(): any {
    throw new Error('TODO: implement largest')
  }
}
