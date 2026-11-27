/**
 * ✦ CHECKPOINT 7b — Generics, applied (bonus)
 *
 * A small collection toolkit. Checkpoint 7 checked that you can WRITE
 * generics. This one checks that your types stay PRECISE: literal keys stay
 * literal, type guards narrow, and a fallback can't quietly widen `T`.
 *
 * Lesson sections you'll lean on:
 *   - "Literals: kept when `T` is returned bare, widened inside structures"
 *   - "Inference through a callback: `T` flows in, `R` flows out"
 *   - "`keyof T` and `T[K]`: precise property access"
 *   - "Explicit type arguments and `NoInfer`: all or nothing"
 *   - "Generic classes: the whole instance is specialised"
 *
 * Rules: no `any` and no `as` in your final code. Take READONLY arrays as
 * input. Never mutate what the caller passed in.
 *
 * Check: npm test -- 07 -t "7b"
 */

// ── groupBy ──────────────────────────────────────────────────────────
// Put items into buckets keyed by `keyOf(item)`. Return a Map whose keys
// come in first-seen order.
//   groupBy(people, p => p.age >= 18 ? 'adult' : 'minor')
//     -> Map<'adult' | 'minor', Person[]>     (keys stay LITERAL)
//   groupBy(['a', 'bb'], s => s.length)  -> Map<number, string[]>
// A key must be a string or a number. Returning an object from `keyOf`
// is a compile error.
export function groupBy<T, L extends string | number>(items: readonly T[], keyOf: (item: T) => L): Map<L, T[]> {
  const groups = new Map<L, T[]>();

  items.forEach(item => {
    const key = keyOf(item);
    const groupItems = groups.get(key);
    if (groupItems === undefined) {
      groups.set(key, [item]);
    } else {
      groupItems.push(item);
    }
  });

  return groups;
}

// ── indexBy ──────────────────────────────────────────────────────────
// Make a lookup Map from one of the items' own properties. If two items
// share a key, the later one wins.
//   indexBy(people, 'id')   -> Map<number, Person>
//   indexBy(people, 'name') -> Map<string, Person>
//   indexBy(people, 'email') -> compile error
export function indexBy<T, K extends keyof T>(items: readonly T[], key: K): Map<T[K], T> {
  const indexes = new Map<T[K], T>();

  items.forEach(item => {
    indexes.set(item[key], item);
  });

  return indexes;
}

// ── partition ────────────────────────────────────────────────────────
// Split items into a labelled tuple [pass: ..., fail: ...], keeping order.
//   partition([1, 2, 3], n => n > 1) -> [[2, 3], [1]]   both number[]
// Stretch: if `pred` is a TYPE GUARD (x): x is S, the pass side
// narrows to S[]:
//   partition(mixed, (x): x is string => typeof x === 'string')
//     -> [string[], (string | number)[]]
// (One function, two call shapes. Remember overloads from module 04.)
export function partition<T, S extends T>(
  items: readonly T[],
  pred: (item: T) => item is S,
): [pass: S[], fail: T[]];
export function partition<T>(
  items: readonly T[],
  pred: (item: T) => boolean,
): [pass: T[], fail: T[]];
export function partition<T>(
  items: readonly T[],
  pred: (item: T) => boolean,
): [pass: T[], fail: T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of items) {
    if (pred(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}

// ── coalesce ─────────────────────────────────────────────────────────
// Return `value`, or `fallback` when value is null or undefined. Only
// those two count as missing: 0, '' and false are real values.
// T is inferred from `value` ONLY. The fallback is checked against it,
// never used to widen it:
//   const level: 'info' | 'warn' | undefined = ...
//   coalesce(level, 'info')  -> 'info' | 'warn'
//   coalesce(level, 'debug') -> compile error ('debug' is not a level)
export function coalesce<T>(value: T | null | undefined, fallback: NoInfer<T>): T {
  return value ?? fallback;
}

// ── Collection<T> ────────────────────────────────────────────────────
// An immutable list wrapper. Every method that "changes" it returns a
// NEW Collection; the original never changes.
//   - constructor(items): stores a COPY, so later changes to the
//     caller's array don't leak in.
//   - static of(...items): Collection.of('a', 'b') -> Collection<string>
//     (Careful: a static member can't see the class's T. Why not?)
//   - size (getter), first(): T | undefined
//   - map(fn): fn gets (item, index); the element type may change.
//   - filter(pred): same element type.
//   - pluck(key): a Collection of that property. pluck('name') on
//     people -> Collection<string>
//   - reduce(fn, initial): fold into an accumulator of ANY type
//   - toArray(): readonly T[], a copy. Pushing onto it at runtime must
//     not change the collection.
export class Collection<T> {
  private readonly items: T[];
  constructor(items: readonly T[]) {
    this.items = [...items];
  }

  static of<U>(...items: U[]): Collection<U> {
    return new Collection(items);
  }

  get size(): number {
    return this.items.length;
  }

  first(): T | undefined {
    return this.items[0];
  }

  map<R>(fn: (item: T, index: number) => R): Collection<R> {
    return new Collection(this.items.map((item, i) => fn(item, i)));
  }

  filter(pred: (item: T) => boolean): Collection<T> {
    return new Collection(this.items.filter(item => pred(item)));
  }

  pluck<K extends keyof T>(key: K): Collection<T[K]> {
    const results: T[K][] = [];
    this.items.forEach(item => {
      results.push(item[key]);
    });
    return new Collection(results);
  }

  reduce<Acc>(fn: (acc: Acc, n: T) => Acc, initial: Acc): Acc {
    return this.items.reduce((acc, n) => fn(acc, n), initial);
  }

  toArray(): readonly T[] {
    return [...this.items];
  }
}
