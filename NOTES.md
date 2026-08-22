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
**Status:** open
