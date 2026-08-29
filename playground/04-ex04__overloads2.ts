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

declare const mixed: string | number;
const c = convert(mixed);   // ERROR: no overload takes string | number
