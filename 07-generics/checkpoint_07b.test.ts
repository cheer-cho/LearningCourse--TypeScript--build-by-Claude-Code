import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  coalesce,
  Collection,
  groupBy,
  indexBy,
  partition,
} from './checkpoint_07b';

type Person = { id: number; name: string; age: number };

const people: readonly Person[] = [
  { id: 1, name: 'Ana', age: 31 },
  { id: 2, name: 'Bo', age: 12 },
  { id: 3, name: 'Cy', age: 45 },
];

describe('✦ checkpoint 7b — groupBy', () => {
  it('groups items into a Map, keeping first-seen order', () => {
    const byAge = groupBy(people, (p) => (p.age >= 18 ? 'adult' : 'minor'));
    expect([...byAge.keys()]).toEqual(['adult', 'minor']);
    expect(byAge.get('adult')).toEqual([people[0], people[2]]);
    expect(byAge.get('minor')).toEqual([people[1]]);
    expect(groupBy([], () => 'x').size).toBe(0);
  });

  it('keeps literal keys literal and numeric keys numeric', () => {
    const byAge = groupBy(people, (p) => (p.age >= 18 ? 'adult' : 'minor'));
    expectTypeOf(byAge).toEqualTypeOf<Map<'adult' | 'minor', Person[]>>();

    const byLength = groupBy(['a', 'bb', 'cc'], (s) => s.length);
    expect(byLength.get(2)).toEqual(['bb', 'cc']);
    expectTypeOf(byLength).toEqualTypeOf<Map<number, string[]>>();
  });

  it('rejects keys that are not strings or numbers', () => {
    // @ts-expect-error — a group key must be a string or a number
    groupBy(people, (p) => ({ age: p.age }));
  });
});

describe('✦ checkpoint 7b — indexBy', () => {
  it('indexes items by one of their own properties', () => {
    const byId = indexBy(people, 'id');
    expect(byId.get(2)).toEqual(people[1]);
    expectTypeOf(byId).toEqualTypeOf<Map<number, Person>>();

    const byName = indexBy(people, 'name');
    expect(byName.get('Cy')).toEqual(people[2]);
    expectTypeOf(byName).toEqualTypeOf<Map<string, Person>>();
  });

  it('a later item with the same key wins', () => {
    const dupes = [
      { id: 1, v: 'first' },
      { id: 1, v: 'second' },
    ];
    expect(indexBy(dupes, 'id').get(1)).toEqual({ id: 1, v: 'second' });
  });

  it('rejects keys the items do not have', () => {
    // @ts-expect-error — 'email' is not a key of Person
    indexBy(people, 'email');
  });
});

describe('✦ checkpoint 7b — partition', () => {
  it('splits into [pass, fail], keeping order', () => {
    const [even, odd] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
    expect(even).toEqual([2, 4]);
    expect(odd).toEqual([1, 3, 5]);
    expectTypeOf(even).toEqualTypeOf<number[]>();
    expect(partition([], () => true)).toEqual([[], []]);
  });

  it('narrows the pass side when the predicate is a type guard', () => {
    const mixed: readonly (string | number)[] = ['a', 1, 'b', 2];
    const [strings, rest] = partition(
      mixed,
      (x): x is string => typeof x === 'string',
    );
    expect(strings).toEqual(['a', 'b']);
    expect(rest).toEqual([1, 2]);
    expectTypeOf(strings).toEqualTypeOf<string[]>();
    expectTypeOf(rest).toEqualTypeOf<(string | number)[]>();
  });
});

describe('✦ checkpoint 7b — coalesce', () => {
  it('returns the value, or the fallback for null/undefined only', () => {
    // Real callers pass a typed variable, not a bare literal.
    const num = (v: number | null | undefined) => v;
    const str = (v: string | null | undefined) => v;
    const bool = (v: boolean | null) => v;

    expect(coalesce(num(null), 5)).toBe(5);
    expect(coalesce(str(undefined), 'x')).toBe('x');
    expect(coalesce(num(0), 5)).toBe(0);
    expect(coalesce(str(''), 'x')).toBe('');
    expect(coalesce(bool(false), true)).toBe(false);
    expectTypeOf(coalesce(num(null), 5)).toEqualTypeOf<number>();
  });

  it('infers T from the value only — the fallback is just checked', () => {
    const level = 'warn' as 'info' | 'warn' | undefined;
    const resolved = coalesce(level, 'info');
    expectTypeOf(resolved).toEqualTypeOf<'info' | 'warn'>();
    // @ts-expect-error — 'debug' is not one of the levels; it must not widen T
    coalesce(level, 'debug');

    const maybeName = 'Ana' as string | null;
    // @ts-expect-error — a number fallback for a string value
    coalesce(maybeName, 42);
  });
});

describe('✦ checkpoint 7b — Collection', () => {
  it('copies its input, exposes size, first and a readonly snapshot', () => {
    const source = [1, 2];
    const nums = new Collection(source);
    source.push(3);
    expect(nums.size).toBe(2);
    expect(nums.first()).toBe(1);
    expect(nums.toArray()).toEqual([1, 2]);
    expectTypeOf(nums.toArray()).toEqualTypeOf<readonly number[]>();
    expectTypeOf(nums.first()).toEqualTypeOf<number | undefined>();
    expect(new Collection<string>([]).first()).toBeUndefined();
  });

  it('Collection.of builds from arguments', () => {
    const letters = Collection.of('a', 'b');
    expect(letters.toArray()).toEqual(['a', 'b']);
    expectTypeOf(letters).toEqualTypeOf<Collection<string>>();
  });

  it('map changes the element type and passes the index', () => {
    const nums = Collection.of(10, 20);
    const labels = nums.map((n, i) => `${i}:${n}`);
    expect(labels.toArray()).toEqual(['0:10', '1:20']);
    expectTypeOf(labels).toEqualTypeOf<Collection<string>>();
    expect(nums.toArray()).toEqual([10, 20]); // original untouched
  });

  it('filter keeps the element type and does not mutate', () => {
    const nums = Collection.of(1, 2, 3, 4);
    const big = nums.filter((n) => n > 2);
    expect(big.toArray()).toEqual([3, 4]);
    expectTypeOf(big).toEqualTypeOf<Collection<number>>();
    expect(nums.size).toBe(4);
  });

  it('pluck returns a Collection of that property', () => {
    const names = new Collection(people).pluck('name');
    expect(names.toArray()).toEqual(['Ana', 'Bo', 'Cy']);
    expectTypeOf(names).toEqualTypeOf<Collection<string>>();
    // @ts-expect-error — 'email' is not a key of Person
    new Collection(people).pluck('email');
  });

  it('reduce folds to any accumulator type', () => {
    const nums = Collection.of(1, 2, 3);
    const sum = nums.reduce((acc, n) => acc + n, 0);
    expect(sum).toBe(6);
    expectTypeOf(sum).toEqualTypeOf<number>();

    const words = nums.reduce<string[]>((acc, n) => [...acc, `#${n}`], []);
    expect(words).toEqual(['#1', '#2', '#3']);
    expectTypeOf(words).toEqualTypeOf<string[]>();
  });

  it('the stored items cannot be replaced from outside', () => {
    const nums = Collection.of(1);
    const snapshot = nums.toArray();
    // @ts-expect-error — the snapshot is readonly
    snapshot.push(2);
    expect(nums.size).toBe(1);
  });
});
