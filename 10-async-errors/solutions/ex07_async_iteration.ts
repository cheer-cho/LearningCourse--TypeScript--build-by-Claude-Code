// Reference solution — ex07

export async function* countdown(from: number): AsyncGenerator<number, void, unknown> {
  for (let i = from; i > 0; i -= 1) {
    yield i
  }
}

export async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = []
  for await (const value of source) {
    result.push(value)
  }
  return result
}

export async function* mapStream<T, U>(
  source: AsyncIterable<T>,
  fn: (value: T) => U,
): AsyncGenerator<U, void, unknown> {
  for await (const value of source) {
    yield fn(value)
  }
}
