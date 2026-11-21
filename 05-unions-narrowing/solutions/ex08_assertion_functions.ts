// Reference solution — ex08

export type User = { name: string; age: number }

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

export function assertIsUser(value: unknown): asserts value is User {
  if (typeof value !== 'object' || value === null) {
    throw new Error('not an object')
  }
  const candidate = value as Record<string, unknown>
  if (typeof candidate['name'] !== 'string') {
    throw new Error('name must be a string')
  }
  if (typeof candidate['age'] !== 'number') {
    throw new Error('age must be a number')
  }
}

export function greet(value: unknown): string {
  assertIsUser(value)
  return `Hello, ${value.name}`
}
