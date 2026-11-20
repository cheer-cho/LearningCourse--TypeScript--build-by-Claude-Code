// Reference solution — ex03

export type ToArrayEach<T> = T extends unknown ? T[] : never

export type ToArrayWhole<T> = [T] extends [unknown] ? T[] : never

export type FilterString<T> = T extends string ? T : never

export type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never
