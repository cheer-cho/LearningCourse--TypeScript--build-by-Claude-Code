/**
 * ex02 — Reimplementing map & filter
 *
 * The array methods you use daily are generic functions. Rebuild them to
 * see how the callback's parameter type flows OUT of the array type, and
 * how map needs a SECOND type parameter for the result.
 *
 * 1. mapArray<T, R>(items, fn): apply fn to every element.
 *      mapArray(['a', 'bb'], (s) => s.length)  -> [1, 2]   type: number[]
 *    fn receives (item, index).
 * 2. filterArray<T>(items, pred): keep elements where pred is true.
 *      filterArray([1, 2, 3, 4], (n) => n % 2 === 0)  -> [2, 4]
 * 3. flatten<T>(nested): one level of arrays-of-arrays down to a flat array.
 *      flatten([[1, 2], [3]])  -> [1, 2, 3]    type: number[]
 *
 * Do NOT call .map/.filter/.flat — use loops, that's the point.
 *
 * Check: npm test -- 07 -t ex02
 */

// TODO: two type parameters — element in, result out.
export function mapArray(items: any, fn: any): any {
  throw new Error('TODO: implement mapArray')
}

// TODO: one type parameter is enough here — why?
export function filterArray(items: any, pred: any): any {
  throw new Error('TODO: implement filterArray')
}

// TODO: the parameter is an array OF arrays of T.
export function flatten(nested: any): any {
  throw new Error('TODO: implement flatten')
}
