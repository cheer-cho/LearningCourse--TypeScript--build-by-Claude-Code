/**
 * ✦ CHECKPOINT 7c — Generics, expert (bonus)
 *
 * Five independent parts. Each one is a generics idea that separates
 * "can use generics" from "can design with them". Fewer signatures are
 * given here than in 7 and 7b: designing the type parameters is the work.
 * Read the tests. They are the full spec.
 *
 * Rules: no `any` in your final code. One `as` is allowed, in Part 5
 * only, if you can explain why the compiler needs it.
 *
 * Check: npm test -- 07 -t "7c"
 */

// ── Part 1 · Variance ────────────────────────────────────────────────
// Lesson: "Covariance and contravariance", "Bivariance: … method
// shorthand", "Invariance and `in` / `out` annotations".
//
// Source<T>: something you READ a T from:    { read: () => T }
// Sink<T>:   something you WRITE a T into:   { write: (value: T) => void }
// Declare each with the variance annotation that matches its direction.
// Then the compiler enforces it:
//   Source<Dog> fits where Source<Animal> is expected (not the reverse)
//   Sink<Animal> fits where Sink<Dog> is expected   (not the reverse)
// Trap: one way of writing `write` quietly makes Sink bivariant.
export type Source<T> = unknown;
export type Sink<T> = unknown;

// mapSource(source, fn): a Source of fn's results. It must be LAZY:
// nothing is read until someone calls .read() on the result.
//   mapSource(numbers, n => `#${n}`) -> Source<string>
export function mapSource(source: any, fn: any): any {
  throw new Error('TODO: implement mapSource');
}

// contramapSink(sink, fn): adapt a sink to accept a DIFFERENT input
// type. fn converts the new input into what the old sink accepts.
//   contramapSink(stringSink, (d: Dog) => d.name) -> Sink<Dog>
// Ask yourself: which way does fn point, and why is it the reverse of
// mapSource?
export function contramapSink(sink: any, fn: any): any {
  throw new Error('TODO: implement contramapSink');
}

// ── Part 2 · Constructors as values ─────────────────────────────────
// Lesson: "Generics are erased — `T` is not a value".
//
// construct(Ctor, ...args): `new Ctor(...args)`. The args must be checked
// against the constructor's own parameter list:
//   construct(Point, 1, 2)     -> Point
//   construct(Point, 1, 'two') -> compile error
//   construct(Empty)           -> Empty
// Hint: you need TWO type parameters. One of them is a tuple.
export function construct(Ctor: any, ...args: any[]): any {
  throw new Error('TODO: implement construct');
}

// ── Part 3 · const type parameters ──────────────────────────────────
// Lesson: "Literals: kept when `T` is returned bare, widened inside
// structures".
//
// defineConfig(obj): return the same object FROZEN (Object.freeze), typed
// with every literal kept and every property readonly. The caller writes
// no `as const`:
//   defineConfig({ env: 'prod', port: 8080, tags: ['a', 'b'] })
//     -> { readonly env: 'prod'; readonly port: 8080;
//          readonly tags: readonly ['a', 'b'] }
// Only objects are accepted: defineConfig('prod') is a compile error.
export function defineConfig(config: any): any {
  throw new Error('TODO: implement defineConfig');
}

// ── Part 4 · Recursive generic types ────────────────────────────────
// Lesson: "Recursive generic types".
//
// Tree<T>: { value: T; children: Tree<T>[] }
export type Tree<T> = unknown;

// mapTree(tree, fn): same shape, every value transformed. fn also gets
// the node's depth (root = 0). Don't mutate the input tree.
//   mapTree(numberTree, (n, depth) => ...) -> Tree<string>
export function mapTree(tree: any, fn: any): any {
  throw new Error('TODO: implement mapTree');
}

// flattenTree(tree): every value, depth-first, parent before children.
//   1 ─┬─ 2 ── 4
//      └─ 3          -> [1, 2, 4, 3]
export function flattenTree(tree: any): any {
  throw new Error('TODO: implement flattenTree');
}

// ── Part 5 · A registry whose type grows ────────────────────────────
// Lesson: "Generic classes", "`keyof T` and `T[K]`".
//
// An immutable, typed key-value registry. Its type parameter records
// EVERY key registered so far, and the type grows with each call:
//   const reg = Registry.create()          // knows no keys
//     .register('port', 8080)              // knows { port: number }
//     .register('host', 'localhost')       // ... & { host: string }
//   reg.get('port')  -> number
//   reg.get('nope')  -> compile error
//   reg.keys()       -> ['port', 'host']   (registration order)
// register() returns a NEW registry and never changes the old one.
// The constructor is private: Registry.create() is the only way in.
//
// Think about it: what does the type parameter of `Registry.create()`'s
// result look like, given it has no keys yet? And how does register()
// describe "the old keys PLUS this one"?
export class Registry<S> {
  static create(): any {
    throw new Error('TODO: implement create');
  }

  register(key: any, value: any): any {
    throw new Error('TODO: implement register');
  }

  get(key: any): any {
    throw new Error('TODO: implement get');
  }

  keys(): any {
    throw new Error('TODO: implement keys');
  }
}
