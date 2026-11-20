/**
 * ex01 — Generic functions & inference
 *
 * A generic function declares a type parameter `<T>` and uses it to link
 * inputs to outputs. The compiler fills `T` in at each call site by
 * looking at the arguments — you rarely write the type yourself.
 *
 * 1. identity<T>(value): returns its argument unchanged — and TYPED.
 *      identity(42)          -> 42
 *      identity(['a', 'b'])  -> ['a', 'b']     type: string[]
 * 2. firstItem<T>(items): the first element, or undefined when empty.
 *      firstItem([1, 2, 3])  -> 1              type: number | undefined
 * 3. wrapInArray<T>(value): a one-element array around the value.
 *      wrapInArray(5)        -> [5]            type: number[]
 *
 * Check: npm test -- 07 -t ex01
 */

// TODO: add a type parameter and use it for the param and return type.
export function identity(value: any): any {
  throw new Error('TODO: implement identity')
}

// TODO: generic over the element type; remember strict indexing means
// items[0] is already T | undefined.
export function firstItem(items: any): any {
  throw new Error('TODO: implement firstItem')
}

// TODO: generic — the array's element type must be the value's type.
export function wrapInArray(value: any): any {
  throw new Error('TODO: implement wrapInArray')
}
