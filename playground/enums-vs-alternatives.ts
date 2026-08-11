// ─────────────────────────────────────────────────────────────
// 1. Regular enum — EXISTS at runtime (it compiles to an object)
// ─────────────────────────────────────────────────────────────
enum Direction {
  Up,    // 0
  Down,  // 1
}

// ✅ Runtime object: you can log it, iterate it, look things up.
console.log("enum object:", Direction);
// { '0': 'Up', '1': 'Down', Up: 0, Down: 1 }

// ✅ Reverse mapping (numeric enums only): value → name
console.log("reverse mapping:", Direction[0]); // "Up"

// ✅ Iterable at runtime
for (const key of Object.keys(Direction)) {
  console.log("enum key:", key); // "0", "1", "Up", "Down"  (note the noise!)
}

// ─────────────────────────────────────────────────────────────
// 2. String enum — runtime object, but NO reverse mapping
// ─────────────────────────────────────────────────────────────
enum Color {
  Red = "RED",
  Blue = "BLUE",
}
console.log("string enum object:", Color); // { Red: 'RED', Blue: 'BLUE' }
// console.log(Color["RED"]);  // ❌ type error — no reverse mapping for strings

// ─────────────────────────────────────────────────────────────
// 3. const enum — ERASED at compile time (values are inlined)
// ─────────────────────────────────────────────────────────────
const enum Level {
  Low,
  High,
}

const myLevel = Level.High;
console.log("const enum member:", myLevel); // prints 1 — just the number

// console.log(Level);     // ❌ error: const enums aren't allowed as values
// console.log(Level[1]);  // ❌ no reverse mapping — nothing exists at runtime

// ─────────────────────────────────────────────────────────────
// 4. Union of literals — the idiomatic modern choice
// ─────────────────────────────────────────────────────────────
type Status = "active" | "inactive" | "banned";

const s: Status = "active";      // ✅ autocompletes, typo-safe
// const bad: Status = "activ"; // ❌ type error

// ❌ A type alone has NO runtime presence — you can't iterate a type.
// ✅ The fix: derive the type FROM an `as const` array:
const STATUSES = ["active", "inactive", "banned"] as const;
type Status2 = (typeof STATUSES)[number]; // "active" | "inactive" | "banned"

// Now you get BOTH: a runtime list AND a precise type.
for (const st of STATUSES) {
  console.log("status:", st);
}
console.log("is valid?", STATUSES.includes("banned" as Status2)); // true
