// Reference solution — checkpoint

export interface HasArea {
  area(): number
}

export abstract class Shape implements HasArea {
  static count = 0

  constructor(readonly name: string) {
    Shape.count++
  }

  abstract area(): number

  describe(): string {
    return `${this.name}: area ${this.area().toFixed(2)}`
  }
}

export class Circle extends Shape {
  constructor(readonly radius: number) {
    super('Circle')
  }

  override area(): number {
    return Math.PI * this.radius ** 2
  }
}

export class Rectangle extends Shape {
  constructor(
    readonly width: number,
    readonly height: number,
  ) {
    super('Rectangle')
  }

  override area(): number {
    return this.width * this.height
  }
}

export class ShapeCollection<T extends Shape> {
  private shapes: T[] = []

  add(shape: T): void {
    this.shapes.push(shape)
  }

  get size(): number {
    return this.shapes.length
  }

  totalArea(): number {
    return this.shapes.reduce((sum, shape) => sum + shape.area(), 0)
  }

  largest(): T | undefined {
    return this.shapes.reduce<T | undefined>((max, shape) => (!max || shape.area() > max.area() ? shape : max), undefined)
  }
}
