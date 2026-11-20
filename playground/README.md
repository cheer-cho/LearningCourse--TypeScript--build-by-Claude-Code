# Playground

Scratch space for experiments. Your instructor creates demo files here to
answer your questions with runnable code.

Run any demo by name (it type-checks first, then runs):

```bash
npm run playground ex03__split            # or just: npm run playground split
npx tsx playground/03-objects-interfaces/ex03__split.ts   # run only, no type-check
```

## Layout

One folder per module, named exactly like the module's lesson folder:

```text
playground/
  01-setup-tooling/
  02-basics/
  03-objects-interfaces/
  ...
```

## Naming convention

`playground/<NN-module>/<origin>__<topic>.ts`

| `<origin>` | Meaning | Example |
| --- | --- | --- |
| `lesson` | prompted while reading `LESSON.md` | `06-classes/lesson__shape-check.ts` |
| `exNN` | prompted by exercise NN | `04-functions/ex02__falsy-vs-missing.ts` |
| `cp` | prompted by the module checkpoint | `05-unions-narrowing/cp__contextual-param.ts` |

Multi-file demos are folders with the same name: `03-objects-interfaces/ex06__scope-demo/`.
Every name is unique across the whole course, so `npm run playground <name>` is never ambiguous.

## Explainers (demo + `.md` pair)

Each demo has a matching `.md` with the same basename: a Mermaid diagram
with a caption, a comparison table, and gotchas.

| Module | Explainer | Topic |
| --- | --- | --- |
| 01 | `01-setup-tooling/lesson__exact-optional-undefined.md` | missing key vs key set to `undefined` |
| 01 | `01-setup-tooling/lesson__strict-function-types.md` | a handler must accept at least what its type promises |
| 01 | `01-setup-tooling/lesson__strict-property-init.md` | the four ways a field passes the init check |
| 02 | `02-basics/ex01__enums-vs-alternatives.md` | what survives to runtime: enum vs `const enum` vs literal union vs `as const` |
| 02 | `02-basics/ex03__readonly-spellings.md` | `readonly T[]` = `ReadonlyArray<T>`; `readonly` vanishes at runtime |
| 02 | `02-basics/ex03__tuples-demo.md` | tuples: fixed length, typed positions, labels, the `push` gap |
| 02 | `02-basics/ex05__opposite-review.md` | `as Direction` switches checking off; `as const` keeps checking |
| 02 | `02-basics/ex06__any-vs-unknown.md` | `any` = "trust me", `unknown` = "prove it first" |
| 02 | `02-basics/ex07__never-demo.md` | exhaustive `switch` with `never`; a missed case names itself |
| 03 | `03-objects-interfaces/cp__overrides-falsy.md` | applying optional overrides: `!== undefined` keeps `false`, a truthy guard drops it |
| 03 | `03-objects-interfaces/ex02__readonly-existant.md` | `readonly` doesn't survive an alias; writes through a mutable name hit the original |
| 03 | `03-objects-interfaces/ex03__split.md` | `split(' ')` vs `split(/\s+/)` vs `.filter(Boolean)` for counting words |
| 03 | `03-objects-interfaces/ex05__type-union-vs-and.md` | `\|` vs `&` on object types; clashing literals make the intersection `never` |
| 03 | `03-objects-interfaces/ex06__export-merge.md` | merging needs matching `export`; otherwise TS2395 and two separate halves |
| 03 | `03-objects-interfaces/ex06__merging-rules.md` | merge rules: same type collapses, different type TS2717, duplicate `type` TS2300 |
| 03 | `03-objects-interfaces/ex06__scope-demo.md` | script vs module scope: global `const` collides, interfaces merge, `export {}` isolates |
| 03 | `03-objects-interfaces/ex07__freshness.md` | when TS2353 fires: fresh literal vs variable, assertion, spread |
| 06 | `06-classes/lesson__party-of-t.md` | "class Party of T" — generic class with a constraint |
| 06 | `06-classes/lesson__type-predicate-recap.md` | type predicate recap |
