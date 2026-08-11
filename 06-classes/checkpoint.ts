/**
 * ✦ CHECKPOINT 6 — Classes
 *
 * A small shape library. Combines: abstract classes & implements, generics
 * in a class, override, static members, and readonly parameter properties.
 * Each declaration below explains its own job.
 *
 *   const c = new Circle(2)
 *   c.describe() // -> 'Circle: area 12.57'
 *   Shape.count  // -> 1 (grows with every Shape subclass constructed)
 *
 * Passing `npm test -- 06` completes this module. 🎉
 */

// The contract: anything with a measurable area.
//   One method: area(): number
export interface HasArea {
  area(): unknown
}

// The ABSTRACT base class for all shapes — implements HasArea.
//   - static `count`: number of shapes ever constructed (starts at 0).
//   - constructor takes `name: string`, stored as a public readonly
//     field; also increments Shape.count.
//   - `abstract area(): number` — every subclass must provide it.
//   - `describe()` — CONCRETE: `${name}: area ${area().toFixed(2)}`.
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

// A circle: readonly `radius` PARAMETER PROPERTY, calls super('Circle').
//   area = PI * radius ** 2
export class Circle extends Shape {
  area(): any {
    throw new Error('TODO: implement Circle.area')
  }
}

// A rectangle: readonly `width` and `height` parameter properties,
// calls super('Rectangle').
//   area = width * height
export class Rectangle extends Shape {
  area(): any {
    throw new Error('TODO: implement Rectangle.area')
  }
}

// A typed collection of shapes. Constrain T so only Shapes go in:
//   ShapeCollection<T extends Shape>
//   - add(shape): appends.
//   - get size(): how many shapes are stored.
//   - totalArea(): sum of every shape's area.
//   - largest(): the shape with the greatest area, or undefined when empty.
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
