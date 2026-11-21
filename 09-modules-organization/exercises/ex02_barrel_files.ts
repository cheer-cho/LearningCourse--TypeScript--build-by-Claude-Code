/**
 * ex02 — Barrel files: re-exporting from one place
 *
 * A "barrel" gathers a folder's exports behind a single import path.
 * Both helper modules export a function named `area`, so the barrel must
 * RENAME them to let the two live side by side.
 *
 * Replace each placeholder below with a single re-export statement:
 * 1. circleArea / squareArea via  `export { area as circleArea } from ...`
 * 2. The Circle / Square types via `export type { Circle } from ...`
 *    (a plain `export { Circle } from ...` would emit a RUNTIME re-export
 *    of a type — bundlers crash on it; `export type` is erased).
 * 3. `circle` via a namespace re-export:
 *    `export * as circle from './ex02-circle'`
 *
 * Check: npm test -- 09 -t ex02
 */

// TODO 1: replace with renamed re-exports of the two `area` functions.
export const circleArea: any = () => {
  throw new Error('TODO: re-export circleArea')
}
export const squareArea: any = () => {
  throw new Error('TODO: re-export squareArea')
}

// TODO 2: replace with type-only re-exports.
export type Circle = unknown
export type Square = unknown

// TODO 3: replace with a namespace re-export of the whole circle module.
export const circle: any = {
  area: () => {
    throw new Error('TODO: re-export the circle module as a namespace')
  },
}
