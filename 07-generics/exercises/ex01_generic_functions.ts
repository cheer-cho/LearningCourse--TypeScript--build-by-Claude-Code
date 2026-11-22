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
export function identity<T>(value: T): T {
  return value;
}

const identity_1 = identity(42);
const identity_2 = identity(['a', 'b']);

// TODO: generic over the element type; remember strict indexing means
// items[0] is already T | undefined.
export function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}
const firstItem_1 = firstItem([1, 2, 3]);
const firstItem_2 = firstItem(['1', '2', '3']);
const firstItem_3 = firstItem([1, '2', '3']);

// TODO: generic — the array's element type must be the value's type.
export function wrapInArray<T>(value: T): T[] {
  return [value];
}

const wrapInArray_1 = wrapInArray(5);
const wrapInArray_2 = wrapInArray('5');
