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
| 04 | `04-functions/cp__default-vs-or.md` | default parameter vs `||` fallback: they differ only on `''` |
| 04 | `04-functions/ex02__falsy-vs-missing.md` | `||` vs `??`, value by value |
| 04 | `04-functions/ex02__presence-on-objects.md` | `in` vs `!== undefined` vs truthy on optional properties |
| 04 | `04-functions/cp__functions-review.md` | let built-ins do it: `padStart`, `[].join`, `charAt(0)` vs `[0]` |
| 04 | `04-functions/ex01__annotating-function-values.md` | where a function type can go, and why a declaration isn't one of them |
| 04 | `04-functions/ex02__optional-vs-default.md` | `if (end)` vs `end !== undefined`; a default removes `\| undefined` |
| 04 | `04-functions/ex02__three-forms.md` | optional vs default vs required-but-may-be-`undefined` |
| 04 | `04-functions/ex03__rest-and-tuple-spreads.md` | the empty-tail `buildPath` trap; only a tuple spreads into fixed positions |
| 04 | `04-functions/ex04__overloads.md` | union return vs exact return; the body sees only the implementation |
| 04 | `04-functions/ex04__date-timezone.md` | `makeDate`: date-only string is UTC, `(y, m, d)` is local |
| 04 | `04-functions/ex04__overloads2.md` | the two rules behind TS2394 and TS2769 |
| 04 | `04-functions/ex04__why-overloads.md` | what the implementation signature alone loses |
| 04 | `04-functions/ex04__overload-forms.md` | every place overloads can be written |
| 04 | `04-functions/ex04__this-param.md` | a `this` parameter turns a detached-method crash into TS2684 |
| 04 | `04-functions/ex06__void-quirk.md` | `void` on a target type is lenient; on your own signature it is strict |
| 05 | `05-unions-narrowing/ex01__union-common-members.md` | only members every union part shares are usable (`Set` has `.size`, not `.length`) |
| 05 | `05-unions-narrowing/ex01__narrowing-tour.md` | every narrowing tool in one file: typeof, instanceof, in, tag, predicate, truthiness, equality |
| 05 | `05-unions-narrowing/ex04__sizeof-variants.md` | `string[]` vs `Set<string>`: `in` is fooled by an extra key, `instanceof` isn't |
| 05 | `05-unions-narrowing/ex06__exhaustive-inline-never.md` | `assertNever` vs inline `never` vs `satisfies never` |
| 05 | `05-unions-narrowing/ex07__predicate-wrapper.md` | TS 5.5+ infers a predicate for `(pet) => isFish(pet)` |
| 05 | `05-unions-narrowing/ex07__predicate-wrapper-old.md` | before 5.5: a `: boolean` return throws the predicate away |
| 05 | `05-unions-narrowing/ex08__predicate-vs-assertion.md` | predicate narrows a branch, assertion narrows the rest of the scope |
| 05 | `05-unions-narrowing/ex08__asserts-condition-narrows.md` | `asserts condition` narrows whatever expression you pass |
| 05 | `05-unions-narrowing/ex08__throw-travels-up.md` | an error rises through callers; rethrowing a blank `Error` loses the message |
| 05 | `05-unions-narrowing/ex08__assert-null-guard.md` | `typeof v !== 'object' && v === null` is never true; `\|\|` is the fix |
| 05 | `05-unions-narrowing/cp__contextual-param.md` | an unannotated arrow param takes its type from the `const`'s annotation |
| 05 | `05-unions-narrowing/cp__never-call-narrowing.md` | a `never` helper narrows only if its type is written down |
| 05 | `05-unions-narrowing/cp__unions-review.md` | checkpoint review: `String` vs `string`, annotate throwing helpers, check the tag |
| 06 | `06-classes/cp__readonly-array.md` | read-only for outsiders: private `#field` + getter returning `readonly T[]` |
| 06 | `06-classes/cp__readonly-check.md` | `@ts-expect-error` as a regression guard on the real checkpoint |
| 06 | `06-classes/ex03__private-fields.md` | `#private` hides at runtime, `private` doesn't; TS18009 |
| 06 | `06-classes/ex04__static-inherit.md` | `ClassName.x` vs `this.x` in a static method; a subclass write splits the counter |
| 06 | `06-classes/ex04__static-this.md` | detaching a static method: safe if it names the class, crashes if it uses `this` |
| 06 | `06-classes/ex07__puzzle.md` | mixin construction order: why `createdAt` is missing inside the constructor |
| 06 | `06-classes/ex07__serialize.md` | `JSON.stringify(this)` sees every mixin layer's fields |
| 06 | `06-classes/lesson__abstract-type-as-supertype.md` | `: Notifier` vs `: EmailNotifier`: the annotation picks which subclasses fit |
| 06 | `06-classes/lesson__construct-signatures-class-as-value.md` | `new (name: string): Plugin` describes the class itself, not its instances |
| 06 | `06-classes/lesson__construct-signatures-real-world.md` | passing a class in real code: `toThrow(RangeError)`, `getRepository(User)`, factories |
| 06 | `06-classes/lesson__default-visibility.md` | no modifier means `public`; the "who reads / may it change" flowchart |
| 06 | `06-classes/lesson__extends-vs-implements.md` | the full 7-combination `extends` / `implements` grid (TS2689, TS1176) |
| 06 | `06-classes/lesson__generic-method-map.md` | class `T` fixed per instance vs method `U` chosen per call |
| 06 | `06-classes/lesson__interface-extends-class.md` | a `private` member makes an interface that extends a class nominal |
| 06 | `06-classes/lesson__mixin-eval.md` | a mixin runs once, at module load; a throwing mixin breaks every import |
| 06 | `06-classes/lesson__mixin-greetable.md` | constrained mixin (TS2345); a mixin builds members, `&` only describes them |
| 06 | `06-classes/lesson__party-of-t.md` | "class Party of T" — generic class with a constraint |
| 06 | `06-classes/lesson__private-constructors-singletons-factories.md` | `private` constructor (TS2673) vs `protected` (TS2674): singletons, subclass-only bases |
| 06 | `06-classes/lesson__reading-angle-brackets.md` | reading `<T extends {...}>` as a typed blank with a rule |
| 06 | `06-classes/lesson__shape-check.md` | the shape check compares members only; `implements` just checks early |
| 06 | `06-classes/lesson__small-hierarchy.md` | the four arrow kinds; which ones move runtime code |
| 06 | `06-classes/lesson__this-binding.md` | the call site sets `this`; what TS2684 does and doesn't catch |
| 06 | `06-classes/lesson__type-predicate-recap.md` | type predicate recap |
| 06 | `06-classes/lesson__typeof-class-static-vs-instance.md` | `Robot` (instance) vs `typeof Robot` (constructor + statics), `InstanceType`, TS2576 |
| 06 | `06-classes/lesson__why-interface-and-party.md` | why both `Combatant` and `Character` exist |
| 07 | `07-generics/lesson__how-T-is-picked.md` | how the compiler picks `T` (explicit → args → target → default → unknown) |
| 07 | `07-generics/lesson__keyof-lookup.md` | `K extends keyof T` + `T[K]` typed property lookup |
| 07 | `07-generics/ex04__default-type-param.md` | `E = Error` is a fallback: used only when `E` is left out; erased at runtime |
| 07 | `07-generics/ex04__type-param-naming.md` | `T`/`U`/`K`/`V`/`E`/`R`/`A` conventions, when to use `TData`-style names, shadowing trap |
