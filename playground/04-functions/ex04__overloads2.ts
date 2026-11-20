// Two overload rules: the implementation must cover every overload, and it is not callable.
// Run: npm run playground ex04__overloads2

// ---- Rule 1: implementation must be compatible with every overload ----

function parse(x: string): number;
function parse(x: number): string;
function parse(x: string): string | number {   // ERROR: too narrow for overload 2
  return typeof x === "string" ? Number(x) : String(x);
}

// ---- Rule 2: implementation signature is not callable ----

function convert(x: string): number;
function convert(x: number): string;
function convert(x: string | number): string | number {
  return typeof x === "string" ? Number(x) : String(x);
}

const a = convert("42");    // number  ✅ overload 1
const b = convert(42);      // string  ✅ overload 2

// A real value whose type is the union (a bare `declare const` would crash at runtime).
const mixed: string | number = Math.random() < 2 ? "7" : 7;
const c = convert(mixed);   // ERROR: no overload takes string | number

// The type errors are compile-time only; the JS still runs:
console.log('parse("1")   ->', parse("1"));
console.log('convert("42") ->', a, typeof a);
console.log('convert(42)  ->', JSON.stringify(b), typeof b);
console.log('convert(mixed) ->', c, typeof c, '(runs fine, but TS rejected the call)');
