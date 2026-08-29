// Where overloads can appear. All deliberately NOT the ex04 functions.

// ---- 1. Function declaration: signatures (no body) + ONE implementation ----
function wrap(x: string): string[]
function wrap(x: boolean): boolean[]
function wrap(x: string | boolean) { return [x] }   // <- the only body

// ---- 2. Class methods AND constructors overload the same way ----
class Box {
  constructor(size: number)
  constructor(w: number, h: number)
  constructor(private w: number, private h: number = w) {}

  scale(factor: number): Box
  scale(w: number, h: number): Box
  scale(a: number, b?: number): Box {
    return new Box(this.w * a, this.h * (b ?? a))
  }
  get dims() { return [this.w, this.h] }
}

// ---- 3. Interface / type: overloads with NO implementation at all ----
interface Parser {
  parse(input: string): object          // these are just call signatures,
  parse(input: string, raw: true): string //  the implementer supplies bodies
}

// A bare callable type overloads by listing call signatures:
type Wrap = {
  (x: string): string[]
  (x: boolean): boolean[]
}
const wrap2: Wrap = wrap   // the function above satisfies it

// ...or by intersecting two function types:
type Wrap3 = ((x: string) => string[]) & ((x: boolean) => boolean[])
const wrap3: Wrap3 = wrap

// ---- 4. Arrow functions CANNOT be overloaded directly ----
// const bad = (x: string): string[]  =>  ...   // no such syntax.
// You must give the arrow an overloaded TYPE instead:
const wrap4: Wrap = ((x: any) => [x]) as Wrap

console.log({
  a: wrap('hi'), b: wrap2(true), c: wrap3('yo'), d: wrap4('x'),
  box: new Box(2).scale(3, 4).dims,
})
