# Instructor Notes — Recurring Mistakes

The instructor logs recurring mistakes here and revisits them during
quizzes and reviews. Format:

```
## YYYY-MM-DD — module/exercise
**Mistake:** what happened (the misconception, not just the code)
**Correction:** the right mental model
**Status:** open | improving | overcome
```

---

## 2026-08-28 — 04/ex01
**Mistake:** To give `applyOp` the type `ApplyOp`, wrote
`function applyOp<ApplyOp>(a, b, op)`. Read the angle brackets as "this
function has type `ApplyOp`". They do the opposite: `<T>` *declares* a new
generic type parameter, which shadowed the alias of the same name and left
every parameter implicitly `any`. Also assumed `op` was a `string` to
`switch` on, rather than the function itself.
**Correction:** A function type alias annotates a **value**, so it lives on
a `const`, a parameter, or a return type — `const applyOp: ApplyOp = ...`.
There is no syntax to hang an alias on a `function` declaration; those
annotate each parameter inline. Angle brackets after a name always mean
"introduce a type variable" (module 07), never "apply a type".
**Status:** open

## 2026-08-11 — 02/ex05
**Mistake:** Used `as Direction` on each value of a lookup map to make the
return type fit. `as` is an *assertion* — it tells the compiler to trust
you and widens the literal to the whole union, so a wrong mapping
(`north: 'north' as Direction`) compiles silently.
**Correction:** Prefer letting the compiler *check* instead of asserting:
`as const` keeps the values as literal types, and literals are verified
assignable to the union at the return site. Rule of thumb: `as const`
narrows and stays checked; `as SomeType` overrides the checker.
**Recurred 2026-08-22 — 02/ex08:** first attempt annotated or cast every
line (`: string`, `: readonly [1,2,3]`, `as {...}[]`) in an exercise that
forbids annotations. Corrected quickly once prompted: `let` to widen,
`as const` to narrow, drop return annotations and let the body infer.
Quiz target: "inputs are annotated, outputs are inferred."
**Status:** open

## 2026-08-10 — 01/ex02
**Mistake:** Used `||` to supply a fallback for possibly-missing values
(`items[0] || fallback`, `text?.length || 0`). `||` falls back on *any*
falsy value (`''`, `0`, `false`), not just `null`/`undefined`.
**Correction:** Use `??` (nullish coalescing) when the intent is "only if
null or undefined". `[''][0] || 'x'` returns `'x'` — a wrong answer;
`[''][0] ?? 'x'` returns `''` — correct.
**Recurred 2026-08-26 — 03/checkpoint:** proposed `...(overrides.debug && { debug: overrides.debug })` to guard a spread. `&&` short-circuits on `false`, so `{ debug: false }` was silently ignored. Same root idea: *falsy ≠ missing*. Guard on presence (`!== undefined` / `in`), not truthiness.
**Recurred 2026-08-28 — 04/ex02:** branched on an optional parameter with
`if (end)`, so `range(2, 0)` took the "no second argument" path and returned
`[0, 1]` instead of `[]`. Third sighting of *falsy ≠ missing*, now in the
optional-parameter setting. The test suite did not cover a falsy argument;
cases were added. Question to ask when branching on an optional: "am I
asking whether it was **passed**, or whether it is **truthy**?" — for
optionals it is always the former, so `!== undefined`.
**Status:** open
