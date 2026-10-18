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
  area(): number;
}

// The ABSTRACT base class for all shapes — implements HasArea.
//   - static `count`: number of shapes ever constructed (starts at 0).
//   - constructor takes `name: string`, stored as a public readonly
//     field; also increments Shape.count.
//   - `abstract area(): number` — every subclass must provide it.
//   - `describe()` — CONCRETE: `${name}: area ${area().toFixed(2)}`.
export abstract class Shape implements HasArea {
  static count = 0;

  readonly name: string;

  constructor(name: string) {
    this.name = name;
    Shape.count++;
  }

  abstract area(): number;

  describe(): string {
    return `${this.name}: area ${this.area().toFixed(2)}`;
  }
}

// A circle: readonly `radius` PARAMETER PROPERTY, calls super('Circle').
//   area = PI * radius ** 2
export class Circle extends Shape {
  constructor(readonly radius: number) {
    super("Circle");
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

// A rectangle: readonly `width` and `height` parameter properties,
// calls super('Rectangle').
//   area = width * height
export class Rectangle extends Shape {
  constructor(readonly width: number, readonly height: number) {
    super("Rectangle");
  }
  area(): number {
    return this.width * this.height;
  }
}

// A typed collection of shapes. Constrain T so only Shapes go in:
//   ShapeCollection<T extends Shape>
//   - add(shape): appends.
//   - get size(): how many shapes are stored.
//   - totalArea(): sum of every shape's area.
//   - largest(): the shape with the greatest area, or undefined when empty.
export class ShapeCollection<T extends Shape> {
  #shapes: T[] = [];

  add(shape: T): void {
    this.#shapes.push(shape);
  }

  get shapes(): readonly T[] {
    return this.#shapes;
  }

  get size(): number {
    return this.#shapes.length;
  }

  totalArea(): number {
    return this.#shapes.reduce((totalArea, currentShape) => totalArea + currentShape.area(), 0);
  }

  largest(): T | undefined {
    return [...this.#shapes].sort((a, b) => b.area() - a.area())[0];
  }
}

// @ts-expect-error — outsiders must not push into shapes
new ShapeCollection<Circle>().shapes.push(new Circle(1));