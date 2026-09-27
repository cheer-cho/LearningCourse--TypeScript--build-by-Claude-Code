// Where can a function TYPE be used? Three places — and one non-place.

type Formatter = (s: string) => string

// 1. On a variable  → the annotation is on the NAME, before `=`
const shout: Formatter = (s) => s.toUpperCase() + '!'   // `s` inferred as string

// 2. On a parameter → the function becomes higher-order
function applyTwice(text: string, f: Formatter): string {
  return f(f(text))
}

// 3. On a return    → the function hands back another function
function repeatN(n: number): Formatter {
  return (s) => s.repeat(n)
}

// 4. NOT a place: a `function` declaration cannot wear a type alias.
//    There is no `function shout: Formatter (s) { ... }` syntax.
//    A declaration annotates each parameter and the return itself:
function whisper(s: string): string {
  return s.toLowerCase()
}

console.log(shout('hi'))                 // HI!
console.log(applyTwice('hi', shout))     // HI!!
console.log(applyTwice('ab', repeatN(2)))// abababab
console.log(whisper('LOUD'))             // loud
