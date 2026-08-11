/**
 * ex02 — Arrays (and readonly arrays)
 *
 * 1. Replace the `any` types with precise array types.
 * 2. `frozen` must be a READONLY array — calling frozen.push(...) should
 *    be a compile error afterwards.
 * 3. Implement `sumAll`. Note the parameter is readonly — a promise to
 *    callers that their array won't be mutated.
 *
 * Check: npm test -- 02 -t ex02
 */

export const languages: string[] = ['typescript', 'rust', 'python']

export const matrix: number[][] = [
  [1, 2],
  [3, 4],
]

// TODO: make this readonly (two spellings exist — pick either)
export const frozen: readonly number[] = [1, 2, 3]

// Sum every number. Do not mutate the input (the type already forbids it).
export function sumAll(nums: readonly number[]): number {
  return nums.reduce((sum, cur) => sum + cur, 0)
  throw new Error('TODO: implement sumAll')
}
