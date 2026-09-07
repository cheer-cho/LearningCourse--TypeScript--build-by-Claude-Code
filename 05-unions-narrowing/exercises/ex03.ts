/**
 * ex03 — Narrowing with typeof, truthiness, and equality
 *
 * Inside an `if`, TypeScript tracks what you checked and shrinks the
 * union accordingly.
 *
 * 1. padLeft(value, padding):
 *      padding is a number  -> that many spaces before value
 *      padding is a string  -> padding glued before value
 *        padLeft('hi', 4)    -> '    hi'
 *        padLeft('hi', '>>') -> '>>hi'
 *    Use typeof.
 * 2. toLines(input): input is string | string[] | null.
 *      null      -> []
 *      a string  -> [input]        (even the empty string!)
 *      an array  -> input as-is
 *    Careful: `if (!input)` would also swallow '' — compare with
 *    === null instead, then use typeof.
 * 3. concatIfBothStrings(x, y): x is string | number, y is
 *    string | boolean. If x === y, both must be strings — return
 *    x.toUpperCase() + y.toUpperCase(). Otherwise return `${x}/${y}`.
 *        concatIfBothStrings('ab', 'ab') -> 'ABAB'
 *        concatIfBothStrings(7, 'x')     -> '7/x'
 *
 * Check: npm test -- 05 -t ex03
 */

// TODO: type value (string), padding (string | number), return string.
export function padLeft(value: string, padding: number | string
): string {
  if (typeof padding === 'number') {
    return value.padStart(padding + value.length)
  }
  return `${padding}${value}`
}

// TODO: type input (string | string[] | null), return string[].
export function toLines(input: string | string[] | null): string[] {
  if (typeof input === 'string') {
    return [input]
  }

  if (Array.isArray(input)) {
    return input
  }

  return [];
}

// TODO: type x (string | number), y (string | boolean), return string.
export function concatIfBothStrings(x: string | number, y: string | boolean): string {
  if (x === y) {
    return `${x.toUpperCase()}${y.toUpperCase()}`
  }
  return `${x}/${y}`
}
