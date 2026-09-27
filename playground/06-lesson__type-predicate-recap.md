# Type predicate — `value is Vault`

Companion diagram for [`06-lesson__type-predicate-recap.ts`](./06-lesson__type-predicate-recap.ts).
Preview this file in VS Code (`⇧⌘V`) to see the Mermaid render.

```mermaid
flowchart LR
    A["Vault.isVault(thing)<br/>thing : unknown"] -->|"returns true"| B["thing : Vault<br/>thing.secret is allowed"]
    A -->|"returns false"| C["thing : unknown<br/>Vault excluded"]
```

*A predicate turns a boolean check into a narrowing point. The same call, with a plain `boolean` return type, would leave `thing` as `unknown` on both branches.*

```mermaid
flowchart TB
    subgraph runtime["What JavaScript sees"]
        R["function isVault(value) { return ... }<br/>returns true / false"]
    end
    subgraph compile["What TypeScript adds"]
        T["': value is Vault'<br/>if true ⇒ value narrows to Vault"]
    end
    R --- T
```

*The predicate is erased at runtime. Only the checker uses it, so the body must really test the shape — TypeScript trusts you.*
