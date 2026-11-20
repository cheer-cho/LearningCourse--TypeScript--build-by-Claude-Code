// Reference solution — ex03

export type WordCount = { [word: string]: number }

export function countWords(text: string): WordCount {
  const counts: WordCount = {}
  for (const word of text.split(/\s+/)) {
    if (word === '') continue
    counts[word] = (counts[word] ?? 0) + 1
  }
  return counts
}

export function getCount(counts: WordCount, word: string): number {
  return counts[word] ?? 0
}
