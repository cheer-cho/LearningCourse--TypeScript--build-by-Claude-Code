/**
 * ✦ CHECKPOINT 9 — Modules & Organization
 *
 * A tiny shape catalog. Combines: mixed value + type-only imports across
 * files, a type-only barrel re-export, and a namespace merged onto a
 * function (callable + properties).
 *
 * Reuses two DO-NOT-EDIT helpers from ex02: ./exercises/ex02-circle and
 * ./exercises/ex02-square (each exports a `Circle`/`Square` interface and
 * an `area` function).
 *
 * 1. Mark Circle and Square as TYPE-ONLY in the imports below (keep the
 *    `area` value imports as-is), then export Shape as their union — a
 *    type-only barrel.
 * 2. catalog(shape): Shape -> number — routes to the matching `area`
 *    function by `shape.kind` and returns the result.
 * 3. Merge a namespace onto catalog:
 *      - catalog.count: number of times catalog() has been called
 *        (starts at 0, increments on every call)
 *      - catalog.reset(): void — zeroes the count
 *
 * Passing `npm test -- 09` completes this module. 🎉
 */

import { area as circleArea, Circle } from './exercises/ex02-circle'
import { area as squareArea, Square } from './exercises/ex02-square'

// TODO 1: mark Circle and Square as type-only imports above, then define
// Shape as their union.
export type Shape = unknown

// TODO 2 & 3: precise types, then implement catalog + its merged
// namespace.
export function catalog(shape: any): any {
  throw new Error('TODO: implement catalog')
}

export namespace catalog {
  export let count: any = 0

  export function reset(): any {
    throw new Error('TODO: implement catalog.reset')
  }
}
