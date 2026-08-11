/**
 * ✦ CHECKPOINT 9 — Modules & Organization
 *
 * A tiny shape catalog. Combines: mixed value + type-only imports across
 * files, a type-only barrel re-export, and a namespace merged onto a
 * function (callable + properties). Each declaration below explains its
 * own job.
 *
 * Reuses two DO-NOT-EDIT helpers from ex02: ./exercises/ex02-circle and
 * ./exercises/ex02-square (each exports a `Circle`/`Square` interface and
 * an `area` function).
 *
 * Passing `npm test -- 09` completes this module. 🎉
 */

// Circle and Square are only used as TYPES here — mark them type-only
// (keep the `area` value imports as-is).
import { area as circleArea, Circle } from './exercises/ex02-circle'
import { area as squareArea, Square } from './exercises/ex02-square'

// The union of Circle and Square — a type-only barrel re-export.
export type Shape = unknown

// Compute the area of any shape: route to the matching `area` function
// by `shape.kind` and return the result.
//   Signature: (shape: Shape) => number
// Also (below): a NAMESPACE merged onto catalog, so callers can write
// catalog(c) AND read catalog.count.
export function catalog(shape: any): any {
  throw new Error('TODO: implement catalog')
}

export namespace catalog {
  // How many times catalog() has been called. Starts at 0; catalog()
  // increments it on every call.
  export let count: any = 0

  // Zero the counter.
  export function reset(): any {
    throw new Error('TODO: implement catalog.reset')
  }
}
