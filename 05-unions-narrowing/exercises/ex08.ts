/**
 * ex08 — Assertion functions: narrow or throw
 *
 * A predicate returns true/false and you branch on it. An ASSERTION
 * function never returns false — it either throws, or (from the
 * checker's view) proves the claim for the rest of the scope:
 *   `asserts value is User`  -> value is a User after the call
 *   `asserts condition`      -> the condition expression was truthy
 *
 * 1. assert(condition, message): throws new Error(message) when
 *    condition is falsy. Return type: `asserts condition`.
 * 2. assertIsUser(value): value must be an object with a string `name`
 *    and a number `age`, otherwise throw an Error. Return type:
 *    `asserts value is User`.
 *    Hint: after checking it's a non-null object, read fields via
 *    `const candidate = value as Record<string, unknown>`.
 * 3. greet(value): type it (value: unknown) => string. Call
 *    assertIsUser, then return `Hello, ${value.name}` — no cast
 *    needed, the assertion narrowed.
 *
 * Check: npm test -- 05 -t ex08
 */

// Given — do not change.
export type User = { name: string; age: number }

// TODO: (condition: unknown, message: string) => asserts condition
export function assert(condition: any, message: any): any {
  throw new Error('TODO: implement assert')
}

// TODO: (value: unknown) => asserts value is User
export function assertIsUser(value: any): any {
  throw new Error('TODO: implement assertIsUser')
}

// TODO: type as (value: unknown) => string, implement via assertIsUser.
export function greet(value: any): any {
  throw new Error('TODO: implement greet')
}
