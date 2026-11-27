// Reference solution — checkpoint 7c (expert)

// ── Part 1 · Variance ───────────────────────────────────────────────
export type Source<out T> = { read: () => T };
export type Sink<in T> = { write: (value: T) => void };

export function mapSource<A, B>(
  source: Source<A>,
  fn: (value: A) => B,
): Source<B> {
  return { read: () => fn(source.read()) };
}

export function contramapSink<A, B>(
  sink: Sink<A>,
  fn: (value: B) => A,
): Sink<B> {
  return { write: (value) => sink.write(fn(value)) };
}

// ── Part 2 · Constructors as values ─────────────────────────────────
export function construct<A extends unknown[], T>(
  Ctor: new (...args: A) => T,
  ...args: A
): T {
  return new Ctor(...args);
}

// ── Part 3 · const type parameters ──────────────────────────────────
export function defineConfig<const T extends Record<string, unknown>>(
  config: T,
): T {
  return Object.freeze(config);
}

// ── Part 4 · Recursive generic types ────────────────────────────────
export type Tree<T> = { value: T; children: Tree<T>[] };

export function mapTree<T, U>(
  tree: Tree<T>,
  fn: (value: T, depth: number) => U,
  depth = 0,
): Tree<U> {
  return {
    value: fn(tree.value, depth),
    children: tree.children.map((child) => mapTree(child, fn, depth + 1)),
  };
}

export function flattenTree<T>(tree: Tree<T>): T[] {
  const out: T[] = [tree.value];
  for (const child of tree.children) out.push(...flattenTree(child));
  return out;
}

// ── Part 5 · A registry whose type grows ────────────────────────────
export class Registry<S extends object> {
  private constructor(private readonly entries: S) {}

  static create(): Registry<Record<never, never>> {
    return new Registry({});
  }

  register<K extends string, V>(key: K, value: V): Registry<S & Record<K, V>> {
    const added = { [key]: value } as Record<K, V>;
    return new Registry({ ...this.entries, ...added });
  }

  get<K extends keyof S>(key: K): S[K] {
    return this.entries[key];
  }

  keys(): string[] {
    return Object.keys(this.entries);
  }
}
