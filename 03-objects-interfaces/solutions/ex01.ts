// Reference solution — ex01

export type Book = {
  title: string
  pages: number
  author?: string
}

export function describeBook(book: Book): string {
  return `${book.title} (${book.pages}p) by ${book.author ?? 'unknown'}`
}
