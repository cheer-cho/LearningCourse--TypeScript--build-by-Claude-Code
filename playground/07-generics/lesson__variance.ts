// Variance: if Apple is a Fruit, which things BUILT from them substitute?
// Rule of thumb: things that GIVE you a T follow the arrow,
// things that TAKE a T flip it.
// Run: npm run playground lesson__variance

type Fruit = { name: string }
type Apple = { name: string; crunch: number }

const apple: Apple = { name: 'apple', crunch: 9 }
const banana: Fruit = { name: 'banana' } // a Fruit, but no crunch

function attempt(label: string, run: () => string): void {
  try {
    console.log(label, '->', run())
  } catch (e) {
    console.log(label, '-> 💥', (e as Error).message)
  }
}

// ── 1. COVARIANT: a producer (T is an OUTPUT) ──────────────────
// A basket you only take from. Whatever comes out of an apple basket
// is an apple, and every apple is a fruit. So it can pose as a fruit basket.
type Basket<T> = () => T
const appleBasket: Basket<Apple> = () => apple
const fruitBasket: Basket<Fruit> = appleBasket // ✅ Apple→Fruit, same direction
attempt('1 covariant   fruitBasket()', () => fruitBasket().name)

// ── 2. CONTRAVARIANT: a consumer (T is an INPUT) ───────────────
// A juicer you feed. The arrow FLIPS.
type Juicer<T> = (item: T) => string
const anyFruitJuicer: Juicer<Fruit> = (f) => `juiced ${f.name}`
const appleOnlyJuicer: Juicer<Apple> = (a) => `juiced ${a.name}, crunch ${a.crunch.toFixed(0)}`

// A juicer that handles ANY fruit can certainly handle apples.
const forApples: Juicer<Apple> = anyFruitJuicer // ✅ Juicer<Fruit>→Juicer<Apple>, flipped
attempt('2 contravariant forApples(apple)', () => forApples(apple))

// An apple-only juicer can NOT pose as an any-fruit juicer: someone will feed it a banana.
// @ts-expect-error TS2322 — Types of parameters 'a' and 'item' are incompatible
const forAllFruit: Juicer<Fruit> = appleOnlyJuicer
attempt('2 (forced)    forAllFruit(banana)', () => forAllFruit(banana))

// ── 3. BIVARIANT: TS checks BOTH directions and accepts either ─
// Method shorthand is the loose spot. Same signature, two spellings:
type JuiceBarMethod = { juice(f: Fruit): string } //  method   → bivariant (loose)
type JuiceBarProp = { juice: (f: Fruit) => string } // property → contravariant (strict)

const appleBar = { juice: appleOnlyJuicer }
const loose: JuiceBarMethod = appleBar // ✅ compiles — that's the hole
// @ts-expect-error TS2322 — property syntax catches it
const strict: JuiceBarProp = appleBar
attempt('3 bivariant   loose.juice(banana)', () => loose.juice(banana))
void strict

// ── 4. INVARIANT: a crate you read AND write ──────────────────
// Reading wants Apple→Fruit, writing wants Fruit→Apple. Only an exact match fits.
type Crate<T> = { get: () => T; put: (item: T) => void }
const appleCrate: Crate<Apple> = { get: () => apple, put: () => {} }
// @ts-expect-error TS2322 — put would accept a banana into an apple crate
const asFruitCrate: Crate<Fruit> = appleCrate
const fruitCrate: Crate<Fruit> = { get: () => banana, put: () => {} }
// @ts-expect-error TS2322 — get might hand you a banana when you expect an apple
const asAppleCrate: Crate<Apple> = fruitCrate
void asFruitCrate
void asAppleCrate
console.log('4 invariant   Crate<Apple> and Crate<Fruit>: neither assigns to the other')
