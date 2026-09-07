// Two ways to make a switch exhaustive. Both fail to COMPILE when a
// variant is missing. They differ only in what happens at RUNTIME
// when a bad value sneaks in from untyped JavaScript.
import { type Shape, assertNever } from '../05-unions-narrowing/exercises/ex06';

// --- Style A: helper function (what you wrote in ex06) ---------------
function areaA(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':   return Math.PI * shape.radius ** 2;
    case 'rect':     return shape.width * shape.height;
    case 'triangle': return 0.5 * shape.base * shape.height;
    case 'ellipse':  return Math.PI * shape.rx * shape.ry;
    default:         return assertNever(shape);   // throws with a message
  }
}

// --- Style B: inline never pin (no helper, no throw) -----------------
function areaB(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':   return Math.PI * shape.radius ** 2;
    case 'rect':     return shape.width * shape.height;
    case 'triangle': return 0.5 * shape.base * shape.height;
    case 'ellipse':  return Math.PI * shape.rx * shape.ry;
    default: {
      // If a case is missing, `shape` is NOT never here -> compile error.
      const _exhaustive: never = shape;
      return _exhaustive;               // never is assignable to number
    }
  }
}

// --- Style C: `satisfies never` (TS 4.9+) — same idea, one line ------
function areaC(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':   return Math.PI * shape.radius ** 2;
    case 'rect':     return shape.width * shape.height;
    case 'triangle': return 0.5 * shape.base * shape.height;
    case 'ellipse':  return Math.PI * shape.rx * shape.ry;
    default:         return shape satisfies never;
  }
}

// Sanity check: comment out the 'ellipse' case in ANY of the three.
// All three stop compiling. Try it, then put it back.

// --- Runtime difference --------------------------------------------
// TypeScript trusts this cast, so no compile error. This simulates
// bad data arriving from JSON, a JS caller, or a stale client.
const rogue = { kind: 'hexagon', side: 3 } as unknown as Shape;

const unit: Shape = { kind: 'circle', radius: 1 };
console.log('A circle:', areaA(unit).toFixed(2));
console.log('B circle:', areaB(unit).toFixed(2));
console.log('C circle:', areaC(unit).toFixed(2));

try {
  areaA(rogue);
} catch (e) {
  console.log('A rogue :', (e as Error).message);   // loud, useful
}
console.log('B rogue :', areaB(rogue));             // returns the raw object, silently
console.log('C rogue :', areaC(rogue));             // same as B
