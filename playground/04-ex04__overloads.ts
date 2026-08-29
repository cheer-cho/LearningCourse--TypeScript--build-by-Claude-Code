// Demo: what an overload is. Deliberately NOT the ex04 functions.

// ---- 1. Without overloads: the return type is a fuzzy union ----
function wrapLoose(x: string | boolean): string[] | boolean[] {
  return [x] as string[] | boolean[]
}
const loose = wrapLoose('hi')
//    ^? string[] | boolean[]   <- caller must narrow again. Annoying.

// ---- 2. With overloads: precise type per call ----
function wrap(x: string): string[]     // overload signature 1
function wrap(x: boolean): boolean[]   // overload signature 2
function wrap(x: string | boolean) {   // implementation signature (hidden)
  return [x]
}

const a = wrap('hi')    // string[]
const b = wrap(true)    // boolean[]
// const c = wrap(1)    // Error: no overload matches this call

// ---- 3. Different ARITIES, one name ----
function at(index: number): string
function at(row: number, col: number): string
function at(x: number, y?: number): string {
  return y === undefined ? `cell#${x}` : `cell(${x},${y})`
}

console.log({ loose, a, b, one: at(3), two: at(3, 4) })
