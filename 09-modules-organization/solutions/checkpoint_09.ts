// Reference solution — checkpoint

import { area as circleArea, type Circle } from './exercises/ex02-circle'
import { area as squareArea, type Square } from './exercises/ex02-square'

export type Shape = Circle | Square

export function catalog(shape: Shape): number {
  catalog.count++
  return shape.kind === 'circle' ? circleArea(shape) : squareArea(shape)
}

export namespace catalog {
  export let count = 0

  export function reset(): void {
    count = 0
  }
}
