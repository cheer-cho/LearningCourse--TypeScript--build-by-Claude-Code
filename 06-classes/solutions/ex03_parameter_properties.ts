// Reference solution — ex03

export class Temperature {
  constructor(private celsius: number) {}

  get fahrenheit(): number {
    return this.celsius * 1.8 + 32
  }

  set fahrenheit(f: number) {
    this.celsius = (f - 32) / 1.8
  }

  get value(): number {
    return this.celsius
  }
}

export class Circle {
  constructor(readonly radius: number) {}

  get area(): number {
    return Math.PI * this.radius ** 2
  }
}
