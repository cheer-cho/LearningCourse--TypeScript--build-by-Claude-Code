# 02 — Two spellings of a readonly array

Demo: `npm run playground readonly-spellings`

This expands the `Readonly arrays` section of `02-basics/LESSON.md`.
It came up during ex03.

There are two ways to write "an array you can't change".
`readonly number[]` and `ReadonlyArray<number>` mean exactly the same thing.

There is no third spelling. `readonly Array<number>` is an error.
The `readonly` keyword only attaches to the bracket syntax.

```mermaid
flowchart TD
    Q["read-only array of numbers"] --> A["readonly number[]"]
    Q --> B["ReadonlyArray&lt;number&gt;"]
    Q --> C["readonly Array&lt;number&gt;"]
    A --> OK["✅ same type"]
    B --> OK
    C --> NO["❌ TS1354"]
```

*Caption: `readonly` is a modifier for `T[]` and tuple syntax.
For the generic form, use the separate `ReadonlyArray<T>` type.*

## `readonly` exists only for the compiler

```mermaid
flowchart LR
    S["a.push(4)"] --> TC{"type-check"}
    TC -->|"TS2339: no 'push' on readonly number[]"| Stop["❌ you are warned"]
    TC -. "@ts-expect-error silences it" .-> R["runtime: plain array"]
    R --> G["a is now [1, 2, 3, 4]"]
```

*Caption: `readonly` is erased. If you silence the error, the push really
happens. The type system was the only guard.*

The demo silences both errors on purpose, then prints:

```text
a after push -> [ 1, 2, 3, 4 ]
b after push -> [ 1, 2, 3, 4 ]
c (plain array at runtime) -> [ 1, 2, 3 ]
```

## Cheat sheet

| Spelling | Valid? | `.push` / `[i] =` | `.map` / `.slice` | At runtime |
| --- | --- | --- | --- | --- |
| `readonly number[]` | ✅ | ❌ TS2339 | ✅ (return new arrays) | plain array |
| `ReadonlyArray<number>` | ✅ | ❌ TS2339 | ✅ | plain array |
| `readonly Array<number>` | ❌ TS1354 | — | — | — |
| `number[]` | ✅ | ✅ | ✅ | plain array |

## Gotchas

- `readonly` is shallow. A `readonly User[]` stops `push`, but you can
  still change `users[0].name`.
- Need a runtime guard too? `Object.freeze(arr)` makes `push` throw
  ("object is not extensible"). Its return type is already `readonly T[]`.
- A `number[]` can be passed where `readonly number[]` is expected. Not the
  other way round. Take `readonly` parameters when you don't mutate.
