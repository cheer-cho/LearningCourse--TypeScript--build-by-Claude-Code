// Reference solution — checkpoint 7b (applied)

export function groupBy<T, K extends string | number>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  return groups;
}

export function indexBy<T, K extends keyof T>(
  items: readonly T[],
  key: K,
): Map<T[K], T> {
  const index = new Map<T[K], T>();
  for (const item of items) index.set(item[key], item);
  return index;
}

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
  for (const item of items) (pred(item) ? pass : fail).push(item);
  return [pass, fail];
}

export function coalesce<T>(
  value: T | null | undefined,
  fallback: NoInfer<T>,
): T {
  return value ?? fallback;
}

export class Collection<T> {
  private readonly items: readonly T[];

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

  map<U>(fn: (item: T, index: number) => U): Collection<U> {
    return new Collection(this.items.map(fn));
  }

  filter(pred: (item: T) => boolean): Collection<T> {
    return new Collection(this.items.filter(pred));
  }

  pluck<K extends keyof T>(key: K): Collection<T[K]> {
    return this.map((item) => item[key]);
  }

  reduce<A>(fn: (acc: A, item: T) => A, initial: A): A {
    let acc = initial;
    for (const item of this.items) acc = fn(acc, item);
    return acc;
  }

  toArray(): readonly T[] {
    return [...this.items];
  }
}
