/**
 * ex01 — Object types & optional properties
 *
 * 1. Define Book: title (string), pages (number), author (OPTIONAL string).
 * 2. Implement describeBook:
 *      { title: 'TS', pages: 300, author: 'Ada' } -> 'TS (300p) by Ada'
 *      { title: 'JS', pages: 200 }                -> 'JS (200p) by unknown'
 *
 * Check: npm test -- 03 -t ex01
 */

// TODO: define the shape.
export type Book = unknown

// TODO: type the parameter as Book, then implement.
export function describeBook(book: any): string {
  throw new Error('TODO: implement describeBook')
}
