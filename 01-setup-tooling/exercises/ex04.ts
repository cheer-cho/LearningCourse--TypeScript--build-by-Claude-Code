/**
 * ex04 — Modeling a shape (and why JSON.parse is dangerous)
 *
 * JSON.parse returns `any` — a hole in the safety net. The usual fix is
 * to describe the expected shape yourself.
 *
 * 1. Replace `unknown` in the User type with an object type matching the
 *    JSON below:
 *      - id: number
 *      - name: string
 *      - tags: array of strings
 *      - active: boolean
 * 2. `parseUser` then hands that type to every caller.
 *
 * Check: npm test -- 01 -t ex04
 */

// Example of the JSON this app receives:
//   {"id":1,"name":"Ada","tags":["math","code"],"active":true}

// TODO: describe the shape.
export type User = unknown

export function parseUser(json: string): User {
  return JSON.parse(json)
}
