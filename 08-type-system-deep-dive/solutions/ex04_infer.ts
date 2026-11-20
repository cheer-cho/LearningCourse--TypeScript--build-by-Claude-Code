// Reference solution — ex04

export type ElementOf<T> = T extends readonly (infer U)[] ? U : never

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type FirstParam<T> = T extends (first: infer A, ...rest: any[]) => any ? A : never

export type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never
