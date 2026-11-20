# Quiz after Checkpoint 4 — module 04 and earlier

Answer under each question, then ask the instructor to check.

1. In `firstOf`, can a caller pass `x: string | number[]` directly?
   Why or why not?

   >

2. `function f(a?: number)` versus `function f(a = 0)`.
   Which one lets you call `f(undefined)`, and what does `a` become in each?

   >

3. `items[0] || 'x'` versus `items[0] ?? 'x'`. When do they differ?

   >

4. What is the difference between `'north' as Direction` and
   `'north' as const` at the return site?

   >

---

Next: module 05, Unions & Narrowing. Start with
`05-unions-narrowing/LESSON.md`. Overloads and `typeof x === 'string'`
in `firstOf` were a preview of that topic.

Commit the checkpoint and the roadmap edit when ready, following the
`[04]-[checkpoint] complete` pattern.
