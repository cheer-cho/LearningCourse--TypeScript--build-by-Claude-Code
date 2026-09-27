// A tour of the narrowing diagram in 05/LESSON.md.
// Each section is one branch of the flowchart, with a concrete value.
// Hover the variables in your editor to watch the type shrink.

// ── 1. typeof — members are different primitives ─────────────────────────
function formatId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();      // id: string  (only string has toUpperCase)
  }
  return id.toFixed(2);           // id: number  (string was removed above)
}
console.log("typeof     :", formatId("abc"), formatId(3.14159));

// ── 2. instanceof — members are class instances ──────────────────────────
function describe(when: Date | RegExp) {
  if (when instanceof Date) {
    return `date ${when.getFullYear()}`;   // when: Date
  }
  return `regex ${when.source}`;           // when: RegExp
}
console.log("instanceof :", describe(new Date(2026, 0, 1)), describe(/a+b/));

// ── 3. in — plain objects with different keys ────────────────────────────
type Fish = { swim: () => string };
type Bird = { fly: () => string };

function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();            // pet: Fish
  }
  return pet.fly();               // pet: Bird
}
console.log("in         :", move({ swim: () => "splash" }), move({ fly: () => "flap" }));

// ── 4. discriminant tag + exhaustiveness — you control the shapes ────────
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function assertNever(x: never): never {
  throw new Error("unhandled: " + JSON.stringify(x));
}

function area(s: Shape) {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;  // s: { kind: "circle"; radius }
    case "square": return s.side ** 2;              // s: { kind: "square"; side }
    default:       return assertNever(s);           // s: never — add a member above and this line errors
  }
}
console.log("tag        :", area({ kind: "circle", radius: 1 }).toFixed(2), area({ kind: "square", side: 3 }));

// ── 5. custom predicate — shapes you do not control, or no clean tag ─────
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const pets: (Fish | Bird)[] = [{ swim: () => "splash" }, { fly: () => "flap" }];
const fishOnly = pets.filter(isFish);   // Fish[] — the predicate narrows the array too
console.log("predicate  :", fishOnly.map((f) => f.swim()));

// ── 6. truthiness — drops null/undefined (and '' / 0, careful!) ──────────
function shout(msg: string | null) {
  if (msg) {
    return msg.toUpperCase();     // msg: string
  }
  return "(nothing)";             // msg: string | null  — '' lands here too!
}
console.log("truthiness :", shout("hi"), shout(null), shout(""));

// ── 7. equality — narrows BOTH sides to their common type ────────────────
function same(a: string | number, b: string | boolean) {
  if (a === b) {
    return a.toUpperCase() + b.toUpperCase();   // a: string, b: string
  }
  return "different";
}
console.log("equality   :", same("x", "x"), same(1, true));
