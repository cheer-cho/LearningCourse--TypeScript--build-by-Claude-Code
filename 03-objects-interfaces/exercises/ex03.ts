/**
 * ex03 — Index signatures
 *
 * Sometimes you don't know the keys in advance — only their type.
 * `{ [word: string]: number }` means "any string key maps to a number".
 *
 * 1. Define WordCount with an index signature.
 * 2. Implement countWords: split on whitespace, count occurrences.
 *      countWords('a b a') -> { a: 2, b: 1 }
 * 3. Implement getCount: return the count, or 0 for unseen words.
 *    (Remember: indexed reads include `undefined` in this course.)
 *
 * Check: npm test -- 03 -t ex03
 */

// TODO: any string key -> number.
export type WordCount = unknown

// TODO: implement. Ignore empty strings from splitting.
export function countWords(text: string): WordCount {
  throw new Error('TODO: implement countWords')
}

// TODO: implement — 0 for words never seen.
export function getCount(counts: WordCount, word: string): number {
  throw new Error('TODO: implement getCount')
}
