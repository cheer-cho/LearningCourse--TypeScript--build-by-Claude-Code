/**
 * ✦ CHECKPOINT 4 — Functions
 *
 * A tiny text-utility library. Combines: defaults, rest params,
 * overloads, void callbacks, and closures.
 *
 * 1. pad(text, width, char = ' '): left-pad `text` to `width` with `char`.
 *      pad('7', 3)        -> '  7'
 *      pad('7', 3, '0')   -> '007'
 *    (Text already >= width comes back unchanged.)
 * 2. joinWith(separator, ...parts): join any number of strings.
 * 3. firstOf — OVERLOADED:
 *      firstOf('abc')       -> 'a'          type: string
 *      firstOf([1, 2, 3])   -> 1            type: number | undefined
 *      firstOf([])          -> undefined
 * 4. once(fn): a wrapper that calls fn only the FIRST time; later calls
 *    do nothing. fn takes nothing, returns void.
 *
 * Passing `npm test -- 04` completes this module. 🎉
 */

// TODO: give char a default, then implement.
export function pad(text: string, width: number, char: any): string {
  throw new Error('TODO: implement pad')
}

// TODO: rest params, then implement.
export function joinWith(separator: string, ...parts: any): string {
  throw new Error('TODO: implement joinWith')
}

// TODO: write the two overload signatures, then implement.
export function firstOf(x: string | number[]): string | number | undefined {
  throw new Error('TODO: implement firstOf')
}

// TODO: fix types, then implement with a closure flag.
export function once(fn: any): any {
  throw new Error('TODO: implement once')
}
