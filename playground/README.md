# Playground

Scratch space for experiments. Your instructor creates demo files here to
answer your questions with runnable code.

Run any file with:

```bash
npx tsx playground/<file>.ts
```

## Naming convention

`<module>-<exercise>__<topic>.ts` — e.g. `03-06__export-merge.ts` is the
export/merge demo from module 03, exercise 06. Directories follow the same
rule: `03-06__scope-demo/`.

This keeps demos sorted by lesson order and makes it obvious which
exercise prompted each one. Files from before the convention keep their
old names.

## Explainers (demo + `.md` pair)

| Module | Explainer | Topic |
| --- | --- | --- |
| 06 | `06-lesson__party-of-t.md` | "class Party of T" — generic class with a constraint |
| 06 | `06-lesson__type-predicate-recap.md` | type predicate recap |
| 07 | `07-lesson__how-T-is-picked.md` | how the compiler picks `T` (explicit → args → target → default → unknown) |
| 07 | `07-lesson__keyof-lookup.md` | `K extends keyof T` + `T[K]` typed property lookup |
