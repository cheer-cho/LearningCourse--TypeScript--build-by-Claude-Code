/**
 * Overloads + a type guard: the CALLER's predicate picks the overload.
 * A guard `(x): x is S` matches overload 1 and narrows the result; a plain
 * boolean predicate falls through to overload 2. (Analogy for checkpoint
 * 7b's partition, using a different function: findFirst.)
 *
 * Run: npm run playground cp__guard-overload
 */

// ── Overload 1: the predicate is a TYPE GUARD → result narrows to S ──
function findFirst<T, S extends T>(
  items: readonly T[],
  pred: (item: T) => item is S,
): S | undefined;
// ── Overload 2: a plain predicate → result stays T ───────────────────
function findFirst<T>(
  items: readonly T[],
  pred: (item: T) => boolean,
): T | undefined;
// ── Implementation: callers never see this signature ────────────────
function findFirst<T>(
  items: readonly T[],
  pred: (item: T) => boolean,
): T | undefined {
  for (const item of items) {
    if (pred(item)) return item;
  }
  return undefined;
}

const mixed: readonly (string | number)[] = [1, 'a', 2];

// Overload 1 matches: S = string
const s = findFirst(mixed, (x): x is string => typeof x === 'string');
//    ^? string | undefined

// Overload 1 fails (no `x is ...`), overload 2 matches
const p = findFirst(mixed, (x) => String(x).length > 0);
//    ^? string | number | undefined

// ── The same function WITHOUT overload 1 ────────────────────────────
function findFirstPlain<T>(
  items: readonly T[],
  pred: (item: T) => boolean,
): T | undefined {
  for (const item of items) {
    if (pred(item)) return item;
  }
  return undefined;
}

// The guard is accepted (it returns a boolean), but `x is string` is lost
const lost = findFirstPlain(mixed, (x): x is string => typeof x === 'string');
//    ^? string | number | undefined

console.log('findFirst(guard)       ->', s, '   type: string | undefined');
console.log('findFirst(plain)       ->', p, '     type: string | number | undefined');
console.log('findFirstPlain(guard)  ->', lost, '   type: string | number | undefined  <- guard forgotten');
