// Reference solution — ex05

export interface Describable {
  describe(): string
}

export abstract class Vehicle implements Describable {
  constructor(readonly make: string) {}

  abstract topSpeed(): number

  describe(): string {
    return `${this.make} tops out at ${this.topSpeed()} km/h`
  }
}

export class Car extends Vehicle {
  constructor(
    make: string,
    private speedKph: number,
  ) {
    super(make)
  }

  topSpeed(): number {
    return this.speedKph
  }
}

export class Bike extends Vehicle {
  constructor(
    make: string,
    private gears: number,
  ) {
    super(make)
  }

  topSpeed(): number {
    return this.gears * 8
  }
}
