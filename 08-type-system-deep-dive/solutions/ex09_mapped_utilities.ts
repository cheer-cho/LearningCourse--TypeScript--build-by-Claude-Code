// Reference solution — ex09
// Reimplemented from scratch — none of these alias the real utility types.

export type Task = { id: number; title: string; done: boolean }

export type MyPartial<T> = { [K in keyof T]?: T[K] }

export type MyRequired<T> = { [K in keyof T]-?: T[K] }

export type MyReadonly<T> = { readonly [K in keyof T]: T[K] }

export type MyPick<T, K extends keyof T> = { [P in K]: T[P] }

export type MyOmit<T, K extends keyof any> = { [P in keyof T as P extends K ? never : P]: T[P] }

export type MyRecord<K extends keyof any, V> = { [P in K]: V }
