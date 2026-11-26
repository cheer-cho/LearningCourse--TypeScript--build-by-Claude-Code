# 07 — Overloads that react to a type guard

Demo: `npm run playground cp__guard-overload`

Prompted by checkpoint 7b's `partition`. This uses a different function,
`findFirst`, so nothing is spoiled. Overload basics are in
`04-functions/LESSON.md` → "Overloads: one function, several contracts"
and `playground/04-functions/ex04__overloads.md`.

**The idea:** an overload list is a menu of signatures. TypeScript reads
the caller's arguments and picks the **first** one that fits. Here the
deciding argument is the predicate: is it a type guard or not?

```mermaid
flowchart TD
    C1["findFirst(mixed, (x): x is string => ...)"] --> O1{"overload 1<br/>pred: (item: T) => item is S"}
    C2["findFirst(mixed, (x) => String(x).length > 0)"] --> O1
    O1 -- "fits: S = string" --> R1["returns S | undefined<br/>= string | undefined"]
    O1 -- "no 'x is ...'" --> O2{"overload 2<br/>pred: (item: T) => boolean"}
    O2 -- "fits" --> R2["returns T | undefined<br/>= string | number | undefined"]
```

*Caption: the guard call stops at overload 1 and gets the narrow type. The
plain call falls through to overload 2 and keeps the wide type.*

```mermaid
flowchart LR
    G["(x): x is string => ..."] --> P["param typed<br/>(item: T) => boolean"]
    P --> L["only 'returns a boolean' is kept<br/>'x is string' is forgotten"]
```

*Caption: without overload 1, a guard still fits, because it returns a
boolean. But the parameter type has nowhere to store `S`, so the narrowing
is lost.*

## Three signatures, three jobs

| Line | Who sees it | Job |
| --- | --- | --- |
| Overload 1: `pred: (item: T) => item is S` → `S \| undefined` | callers | catches type-guard calls; `S` is read from `x is S` |
| Overload 2: `pred: (item: T) => boolean` → `T \| undefined` | callers | catches every other predicate |
| Implementation (has a body `{ }`) | only the body | wide enough to serve both; never matched against calls |

## Gotchas

- **Order matters.** Overload 2 also accepts a guard. Put it first and it
  catches every call, so overload 1 is never reached.
- **`S extends T`** makes sure the guard narrows *within* `T`. A guard for
  some type unrelated to the items makes no sense.
- **The body can't use `S`.** Inside, only the implementation signature
  exists, so the body works with plain `T`.
- An overload line ends with `;` and has **no body**. Only the last
  signature has `{ ... }`.
