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
| 06 | `06-classes/lesson__party-of-t.md` | "class Party of T" — generic class with a constraint |
| 06 | `06-classes/lesson__type-predicate-recap.md` | type predicate recap |
