# Script vs module scope (module 03, ex06)

**This demo is meant to FAIL typecheck.** That failure is the lesson.

```bash
npx tsc --noEmit --strict --moduleDetection auto playground/03-06__scope-demo/*.ts
```

Expected — exactly two errors, both about `shared`:

```
script-a.ts(5,7): error TS2451: Cannot redeclare block-scoped variable 'shared'.
script-b.ts(3,7): error TS2451: Cannot redeclare block-scoped variable 'shared'.
```

Read that output twice:

| File | Has an export? | Scope | `shared` | `Config` |
|---|---|---|---|---|
| `script-a.ts` | no | global | collides | merges with script-b |
| `script-b.ts` | no | global | collides | merges with script-a |
| `module.ts` | yes (`export {}`) | own | fine | stays private |

Two things to notice:

1. `module.ts` also declares `shared` and `Config`, and is **not** in the
   error list. One `export {}` bought it a private scope.
2. `Config` merged across two separate files with **no error at all** —
   declaration merging is global by default. That silence is the footgun.

Delete the `export {}` from `module.ts` and the error count goes to three.

Note: this failure does not affect `npm test`. Vitest only typechecks
`**/*.test.ts`, so playground files never break the suite.
