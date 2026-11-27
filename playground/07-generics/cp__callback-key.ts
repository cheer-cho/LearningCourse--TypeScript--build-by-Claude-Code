/**
 * A callback parameter is a FUNCTION; its return type becomes a type
 * parameter. A constraint on that parameter rejects bad return values.
 * (Analogy for checkpoint 7b's groupBy — not the solution.)
 *
 * Run: npm run playground cp__callback-key
 */

type Person = { name: string; age: number };

const people: readonly Person[] = [
  { name: 'Ana', age: 31 },
  { name: 'Bo', age: 12 },
];

// ── 1. A property NAME vs a FUNCTION ────────────────────────────────
// pluck (ex06) takes a key NAME: the caller passes the string 'age'.
function pluck<T, K extends keyof T>(items: readonly T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

// labelAll takes a FUNCTION: the caller passes  p => ...
// L is "whatever that function returns".
function labelAll<T, L extends string>(
  items: readonly T[],
  labelOf: (item: T) => L,
): L[] {
  return items.map((item) => labelOf(item)); // call it, get an L back
}

const ages = pluck(people, 'age');
//    ^? number[]
const labels = labelAll(people, (p) => (p.age >= 18 ? 'adult' : 'minor'));
//    ^? ('adult' | 'minor')[]

console.log('pluck(people, "age")        ->', ages);
console.log('labelAll(people, p => ...)  ->', labels);

// ── 2. The constraint rejects bad returns ──────────────────────
// @ts-expect-error — an object is not a string
labelAll(people, (p) => ({ age: p.age }));
console.log('labelAll(people, p => ({...})) -> compile error (TS2322)');
