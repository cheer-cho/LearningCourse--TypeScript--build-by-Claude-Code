// Reference solution — ex06

export type Task = { id: number; title: string; done: boolean }

export type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }

export type PickByType<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] }
