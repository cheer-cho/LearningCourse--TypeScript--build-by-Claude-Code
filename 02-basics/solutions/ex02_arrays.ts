// Reference solution — ex02

export const languages: string[] = ['typescript', 'rust', 'python']

export const matrix: number[][] = [
  [1, 2],
  [3, 4],
]

// ReadonlyArray<number> is the other spelling.
export const frozen: readonly number[] = [1, 2, 3]

export function sumAll(nums: readonly number[]): number {
  return nums.reduce((sum, n) => sum + n, 0)
}
