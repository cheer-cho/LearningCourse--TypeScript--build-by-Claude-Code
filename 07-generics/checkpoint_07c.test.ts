import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  construct,
  contramapSink,
  defineConfig,
  flattenTree,
  mapSource,
  mapTree,
  Registry,
  type Sink,
  type Source,
  type Tree,
} from './checkpoint_07c';

type Animal = { name: string };
type Dog = { name: string; breed: string };

describe('✦ checkpoint 7c — Part 1: variance', () => {
  it('Source and Sink have the right shape', () => {
    expectTypeOf<Source<number>>().toEqualTypeOf<{ read: () => number }>();
    expectTypeOf<Sink<number>>().toEqualTypeOf<{
      write: (value: number) => void;
    }>();
  });

  it('Source is covariant: a Dog source works as an Animal source', () => {
    const dogs: Source<Dog> = { read: () => ({ name: 'Rex', breed: 'lab' }) };
    const animals: Source<Animal> = dogs;
    expect(animals.read().name).toBe('Rex');

    const anyAnimal: Source<Animal> = { read: () => ({ name: 'Mia' }) };
    // @ts-expect-error — an Animal source might hand out a breed-less animal
    const notDogs: Source<Dog> = anyAnimal;
    void notDogs;
  });

  it('Sink is contravariant: an Animal sink works as a Dog sink', () => {
    const seen: string[] = [];
    const animalSink: Sink<Animal> = { write: (a) => seen.push(a.name) };
    const dogSink: Sink<Dog> = animalSink;
    dogSink.write({ name: 'Rex', breed: 'lab' });
    expect(seen).toEqual(['Rex']);

    const breeds: Sink<Dog> = { write: (d) => seen.push(d.breed) };
    // @ts-expect-error — a Dog sink would read .breed off a plain Animal
    const unsafe: Sink<Animal> = breeds;
    void unsafe;
  });

  it('mapSource transforms what comes out — lazily', () => {
    let calls = 0;
    const counter: Source<number> = { read: () => ++calls };
    const labels = mapSource(counter, (n) => `#${n}`);
    expect(calls).toBe(0); // nothing read yet
    expect(labels.read()).toBe('#1');
    expect(labels.read()).toBe('#2');
    expectTypeOf(labels).toEqualTypeOf<Source<string>>();
  });

  it('contramapSink adapts what goes in', () => {
    const log: string[] = [];
    const stringSink: Sink<string> = { write: (s) => log.push(s) };
    const dogSink = contramapSink(
      stringSink,
      (d: Dog) => `${d.name} (${d.breed})`,
    );
    dogSink.write({ name: 'Rex', breed: 'lab' });
    expect(log).toEqual(['Rex (lab)']);
    expectTypeOf(dogSink).toEqualTypeOf<Sink<Dog>>();
  });
});

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}
class Empty {
  readonly made = true;
}

describe('✦ checkpoint 7c — Part 2: construct', () => {
  it('calls the constructor with the given arguments', () => {
    const p = construct(Point, 1, 2);
    expect(p).toBeInstanceOf(Point);
    expect(p).toEqual({ x: 1, y: 2 });
    expectTypeOf(p).toEqualTypeOf<Point>();

    const e = construct(Empty);
    expect(e.made).toBe(true);
    expectTypeOf(e).toEqualTypeOf<Empty>();
    expectTypeOf(construct(Map<string, number>)).toEqualTypeOf<
      Map<string, number>
    >();
  });

  it('checks the arguments against the constructor', () => {
    // @ts-expect-error — y must be a number
    construct(Point, 1, 'two');
    // @ts-expect-error — y is missing
    construct(Point, 1);
    // @ts-expect-error — Empty takes no arguments
    construct(Empty, 1);
  });
});

describe('✦ checkpoint 7c — Part 3: defineConfig', () => {
  it('keeps literal types and makes everything readonly', () => {
    const config = defineConfig({ env: 'prod', port: 8080, tags: ['a', 'b'] });
    expectTypeOf(config).toEqualTypeOf<{
      readonly env: 'prod';
      readonly port: 8080;
      readonly tags: readonly ['a', 'b'];
    }>();
    expect(config).toEqual({ env: 'prod', port: 8080, tags: ['a', 'b'] });
  });

  it('freezes the object at runtime too', () => {
    const config = defineConfig({ env: 'dev' });
    expect(Object.isFrozen(config)).toBe(true);
    // @ts-expect-error — readonly property
    expect(() => (config.env = 'prod')).toThrow(TypeError);
  });

  it('accepts only plain objects', () => {
    // @ts-expect-error — a config is an object, not a string
    defineConfig('prod');
  });
});

const tree: Tree<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4, children: [] }] },
    { value: 3, children: [] },
  ],
};

describe('✦ checkpoint 7c — Part 4: Tree<T>', () => {
  it('Tree is a value plus a list of child trees', () => {
    expectTypeOf<Tree<string>>().toEqualTypeOf<{
      value: string;
      children: Tree<string>[];
    }>();
  });

  it('mapTree keeps the shape and passes each node’s depth', () => {
    const labelled = mapTree(tree, (n, depth) => `${'-'.repeat(depth)}${n}`);
    expect(labelled).toEqual({
      value: '1',
      children: [
        { value: '-2', children: [{ value: '--4', children: [] }] },
        { value: '-3', children: [] },
      ],
    });
    expectTypeOf(labelled).toEqualTypeOf<Tree<string>>();
    expect(tree.value).toBe(1); // original untouched
  });

  it('flattenTree lists values depth-first, parent before children', () => {
    expect(flattenTree(tree)).toEqual([1, 2, 4, 3]);
    expectTypeOf(flattenTree(tree)).toEqualTypeOf<number[]>();
    expect(flattenTree({ value: 'leaf', children: [] })).toEqual(['leaf']);
  });
});

describe('✦ checkpoint 7c — Part 5: Registry', () => {
  it('each register() returns a registry that knows one more key', () => {
    const reg = Registry.create()
      .register('port', 8080)
      .register('host', 'localhost')
      .register('debug', false);

    expect(reg.get('port')).toBe(8080);
    expect(reg.get('host')).toBe('localhost');
    expect(reg.get('debug')).toBe(false);
    expectTypeOf(reg.get('port')).toEqualTypeOf<number>();
    expectTypeOf(reg.get('host')).toEqualTypeOf<string>();
    expectTypeOf(reg.get('debug')).toEqualTypeOf<boolean>();
    expect(reg.keys()).toEqual(['port', 'host', 'debug']);
  });

  it('rejects keys that were never registered', () => {
    const reg = Registry.create().register('port', 8080);
    // @ts-expect-error — 'host' was never registered
    reg.get('host');
    // @ts-expect-error — nothing is registered yet
    Registry.create().get('port');
  });

  it('is immutable: register() never changes the registry it was called on', () => {
    const base = Registry.create().register('a', 1);
    const extended = base.register('b', 2);
    expect(base.keys()).toEqual(['a']);
    expect(extended.keys()).toEqual(['a', 'b']);
    // @ts-expect-error — base's type does not know about 'b' either
    base.get('b');
  });

  it('cannot be built with `new` — only through Registry.create()', () => {
    // @ts-expect-error — the constructor is private
    new Registry();
  });
});
