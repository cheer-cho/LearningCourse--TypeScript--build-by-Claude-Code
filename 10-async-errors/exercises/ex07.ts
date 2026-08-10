/**
 * ex07 — Async iteration: AsyncIterable<T> and for await
 *
 * An async generator produces values over time; its static type is
 * AsyncGenerator<T, TReturn, TNext> and it satisfies AsyncIterable<T>,
 * which is the type to ACCEPT in helpers (any async source works, not
 * just generators). `for await (const x of source)` gives x type T.
 *
 * 1. countdown(from): async generator yielding from, from-1, ... 1
 *    (nothing for from <= 0). Yield type must be number.
 * 2. collect(source): drain ANY AsyncIterable<T> into a T[] with a
 *    for await loop. Make it generic — number sources give number[],
 *    string sources give string[].
 * 3. mapStream(source, fn): the hardest one — an async generator that
 *    is generic in BOTH the source element T and the mapped result U:
 *    yield fn(value) for each value of the source, lazily.
 *    Annotate the return as AsyncGenerator<U, void, unknown>.
 *
 * Check: npm test -- 10 -t ex07
 */

// TODO: parameter number; fix the yield type to number.
export async function* countdown(from: any): AsyncGenerator<unknown, void, unknown> {
  throw new Error('TODO: implement countdown')
}

// TODO: generic in T — accept AsyncIterable<T>, resolve to T[].
export async function collect(source: any): Promise<any> {
  throw new Error('TODO: implement collect')
}

// TODO: generic in T and U; return AsyncGenerator<U, void, unknown>.
export async function* mapStream(source: any, fn: any): AsyncGenerator<unknown, void, unknown> {
  throw new Error('TODO: implement mapStream')
}
