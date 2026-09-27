/**
 * 04-ex06 — The void-return quirk: q1 vs q2
 *
 * Same word `void`, two different checks. The question is always:
 * WHO is being checked — the assignment, or the function body?
 *
 * ```mermaid
 * flowchart TD
 *     A["Where does `void` appear?"] --> B["On a TYPE the function is\nassigned/passed to\n`const cb: () => void = ...`\n`visit: (n: number) => void`"]
 *     A --> C["On the function's OWN\ndeclared signature\n`function f(): void { ... }`"]
 *     B --> D["Assignability check\nvoid = 'caller promises to ignore result'\n➜ any return type is accepted"]
 *     C --> E["Body check\nvoid = 'this body returns nothing'\n➜ `return 42` is an error"]
 * ```
 *
 * | | q1 | q2 |
 * |---|---|---|
 * | Where is `void`? | on the target type | on the function's own declaration |
 * | What's checked? | is `() => number` assignable to `() => void`? | does the body match `: void`? |
 * | Result | ✅ allowed (result will be ignored) | ❌ error (body returns a value) |
 *
 * Run:  npx tsc --noEmit --strict playground/04-ex06__void-quirk.ts
 *       npx tsx playground/04-ex06__void-quirk.ts
 */

// ---------------------------------------------------------------
// q1 — YES. A VALUE assigned to a slot typed `() => void`.
// `() => 42` has type `() => number`. TypeScript asks: "is
// `() => number` assignable to `() => void`?" Rule: a function
// returning ANYTHING is assignable to one returning void, because
// the void slot means "whoever calls through this type ignores the
// result". Nothing can go wrong, so it is allowed.
// This is what lets `forEach(x => arr.push(x))` compile.
// ---------------------------------------------------------------
const cb: () => void = () => 42;
const got = cb();
//    ^? void — 42 exists at runtime, but the TYPE hides it.
//       The value is there; you just can't use it through `cb`.
console.log('cb() at runtime returns:', got);

// ---------------------------------------------------------------
// q2 — NO. `void` is an annotation on f's OWN signature.
// Now TypeScript checks the BODY against the promise f made:
// "I return nothing." `return 42` breaks that promise directly.
// ---------------------------------------------------------------
// @ts-expect-error  Type 'number' is not assignable to type 'void'
function f(): void { return 42; }

// Same thing with an arrow — the annotation is on the function
// itself (`(): void =>`), not on a target type, so it's a q2 case.
// @ts-expect-error  Type 'number' is not assignable to type 'void'
const g = (): void => 42;

// ---------------------------------------------------------------
// Bonus: the leniency is special to `void`. `undefined` is strict.
// ---------------------------------------------------------------
// @ts-expect-error  Type 'number' is not assignable to type 'undefined'
const strict: () => undefined = () => 42;

// Consequence for ex06: `visit: (n: number) => void` is why
// `forEachNumber(items, n => result.push(n * 2))` compiles even
// though push returns a number. Change it to `=> undefined` and it
// stops compiling.

export {};
