// Reference solution — ex10
// Reimplemented from scratch — none of these alias the real utility types.

export type MyExclude<T, U> = T extends U ? never : T

export type MyExtract<T, U> = T extends U ? T : never

export type MyNonNullable<T> = T extends null | undefined ? never : T

export type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never

export type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

export type MyConstructorParameters<T extends abstract new (...args: any[]) => any> =
  T extends abstract new (...args: infer P) => any ? P : never

export type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T
