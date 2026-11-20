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
export type WordCount = {
  [word: string]: number;
};

// TODO: implement. Ignore empty strings from splitting.
export function countWords(text: string): WordCount {
  const wordCount: WordCount = {};
  const words = text.split(/\s+/).filter(Boolean);
  words.forEach((chunk) => {
    wordCount[chunk] = (wordCount[chunk] ?? 0) + 1;
  });
  return wordCount;
}

// TODO: implement — 0 for words never seen.
export function getCount(counts: WordCount, word: string): number {
  const count = counts[word];
  return count ?? 0;
}
