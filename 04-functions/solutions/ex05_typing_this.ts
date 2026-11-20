// Reference solution — ex05

export interface Counter {
  count: number
  increment(this: Counter): number
}

export function makeCounter(): Counter {
  return {
    count: 0,
    increment(this: Counter) {
      this.count += 1
      return this.count
    },
  }
}
