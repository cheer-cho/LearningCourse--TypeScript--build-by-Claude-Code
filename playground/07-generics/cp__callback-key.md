# 07 — A key NAME vs a key FUNCTION

Demo: `npm run playground cp__callback-key`

Prompted by checkpoint 7b's `groupBy`. In `groupBy(people, p => ...)`,
the second argument is not a property name. It is a **function**.

`pluck` (ex06) and `indexBy` take a key *name*, like `'age'`. So their
`K` is `keyof T`. `groupBy` takes a function that *computes* a key.
So its `K` is "whatever that function returns".

```mermaid
flowchart LR
    subgraph NAME["pluck(people, 'age')"]
        N1["argument: 'age'<br/>(a string)"] --> N2["K = 'age'<br/>K extends keyof T"]
    end
    subgraph FN["labelAll(people, p => ...)"]
        F1["argument: p => 'adult' or 'minor'<br/>(a function)"] --> F2["T flows IN to p"]
        F2 --> F3["return type flows OUT<br/>L = 'adult' | 'minor'"]
    end
```

*Caption: a key name is a value of type `keyof T`. A key function is
typed `(item: T) => L`, and `L` is read from what it returns.*

```mermaid
flowchart TD
    C["labelAll(people, p => ({ age: p.age }))"] --> R["callback returns { age: number }"]
    R --> Q{"does it satisfy<br/>L extends string?"}
    Q -- no --> E["❌ TS2322 at the call site"]
    Q -- yes --> OK["✅ L is inferred"]
```

*Caption: the constraint sits on the RETURN type parameter. That is how a
bad key gets rejected.*

## Name vs function

| | `pluck` / `indexBy` | `labelAll` / `groupBy` |
| --- | --- | --- |
| Caller passes | `'age'` | `p => p.age >= 18 ? 'adult' : 'minor'` |
| Parameter type | `key: K` | `fn: (item: T) => K` |
| `K` constrained by | `keyof T` | what a valid key may be |
| Body gets the key by | `item[key]` | `fn(item)` |

## Gotchas

- `K extends keyof T` on a callback is a category error: `keyof T` is a
  set of property names, not a function type.
- `items: T` with `T` being an array makes `keyof T` the *array's* keys
  (`length`, `map`, ...). Take `readonly T[]` so `T` is one item.
- The constraint goes on the type parameter (`<T, L extends ...>`), not on
  the callback's parameter.
