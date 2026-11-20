// Reference solution — ex05

export type Task = { id: number; title: string; done: boolean }

export type Stringify<T> = { [K in keyof T]: string }

export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

export type AllOptional<T> = { [K in keyof T]?: T[K] }

export type AllRequired<T> = { [K in keyof T]-?: T[K] }
