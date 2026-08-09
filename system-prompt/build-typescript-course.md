Build a complete, self-paced TypeScript mastery course as a Git repository
that I will study inside VS Code with you (Claude Code) acting as my
instructor. Follow this spec exactly.

## Goal
I want to become 100% fluent in TypeScript — every syntax, every concept,
with especially deep mastery of the type system. The course must be
hands-on first: I learn by writing code and solving exercises, not by
reading long documents.

## Readability & diagrams (applies to EVERY document in the course)
- Write for clarity above all: short sentences, plain language, one
  idea per paragraph. Assume I'm smart but new to the concept.
- Every LESSON.md must follow this flow: (1) "Why this exists" — the
  problem the feature solves, in 2–3 sentences; (2) a Mermaid diagram
  showing the concept visually; (3) minimal syntax with a tiny runnable
  example; (4) common gotchas; (5) "Try it now" pointer to exercises.
- Use Mermaid diagrams generously to show flows and relationships,
  for example:
  - flowchart for type narrowing decision paths (typeof → instanceof
    → in → discriminant → never)
  - flowchart for how the compiler resolves conditional types and
    distributes over unions
  - graph for the assignability hierarchy (unknown → ... → never)
  - graph for type relationships (extends, implements, structural
    compatibility)
  - sequence diagram for async/Promise typing flow
  - flowchart for tsconfig module resolution
  - mindmap in each SUMMARY.md recapping the module's concepts
- Every diagram must have a one-line caption saying what to notice.
- ROADMAP.md must open with a single Mermaid flowchart of the entire
  course: modules as nodes, arrows showing the learning path,
  checkpoints marked as diamond nodes.
- Prefer a diagram + short prose over long prose. If a concept
  involves any flow, hierarchy, or decision, it gets a diagram.
- Use tables for comparisons (interface vs type, any vs unknown,
  enum vs const enum, etc.).

## Repository structure
- README.md — course overview, prerequisites, how to use the course,
  how to run exercises and tests, and how to enable Mermaid preview
  in VS Code.
- ROADMAP.md — full learning path as a checklist with checkboxes for
  every module and checkpoint, opening with the course-map Mermaid
  flowchart described above. This is my progress tracker.
- CLAUDE.md — instructions that turn you into my instructor whenever I
  open this repo (spec below).
- One folder per module: 01-basics/, 02-functions/, etc. Each module
  contains:
  - LESSON.md — concise, diagram-first concept explanation following
    the readability rules above (short — teach the minimum needed to
    attempt exercises).
  - exercises/ — numbered exercise files (ex01.ts, ex02.ts, ...) with
    TODO stubs and clear instructions in comments. Many exercises per
    topic, progressing from simple to hard.
  - solutions/ — reference solutions, kept out of my way (I should not
    see them unless I ask).
  - exercises/*.test.ts — automated tests that verify BOTH runtime
    behavior (vitest) AND type correctness (vitest expectTypeOf /
    assertType, or @type-challenges style type-level assertions).
    Every exercise must be verifiable by running `npm test`.
  - SUMMARY.md — one-page cheat-sheet recap of the module: key syntax,
    rules, gotchas, a Mermaid mindmap of the concepts, and a 5–10
    question self-quiz.
  - checkpoint.ts — a graded checkpoint exercise combining everything
    in the module. Passing its tests = module complete.

## Curriculum (cover ALL of TypeScript — expand as needed, but at minimum)
1. Setup & tooling: tsc, tsconfig deep-dive (strict flags explained
   one by one), ts-node/tsx, source maps, declaration files.
2. Basics: primitives, arrays, tuples, enums, any/unknown/never/void,
   type annotations vs inference, literal types.
3. Objects & interfaces: optional/readonly, index signatures,
   interface vs type alias, extension, declaration merging.
4. Functions: signatures, optional/default/rest params, overloads,
   this typing, void-returning quirks.
5. Unions & intersections: narrowing (typeof, instanceof, in,
   truthiness, equality), discriminated unions, exhaustiveness with
   never, type predicates (is), assertion functions.
6. Classes: access modifiers, abstract, implements, generics in
   classes, parameter properties, static, mixins.
7. Generics: functions, interfaces, classes, constraints (extends),
   defaults, generic inference, variance intuition.
8. The type system deep-dive (the heart of the course — go heavy here):
   - keyof, typeof, indexed access types
   - conditional types, distributive conditionals, infer
   - mapped types, key remapping (as), modifiers (+/- readonly, ?)
   - template literal types
   - recursive types
   - all built-in utility types (Partial, Required, Pick, Omit,
     Record, Exclude, Extract, ReturnType, Parameters, Awaited, etc.)
     — and exercises where I REIMPLEMENT each one from scratch
   - const assertions, satisfies operator
   - structural typing, excess property checks, assignability rules
   - type-challenges style puzzles (easy → medium → a few hard)
9. Modules & organization: ESM/CJS interop, import type,
   namespaces (legacy), triple-slash directives, .d.ts authoring,
   augmenting third-party types, DefinitelyTyped.
10. Async & error handling: typing Promises, async/await, typed
    errors, unknown in catch.
11. Advanced patterns: branded/nominal types, builder patterns,
    function composition typing, event emitter typing, deep
    readonly/partial, type-safe API clients.
12. Real-world TypeScript: typing React props/hooks (brief),
    Node.js, zod for runtime validation vs static types, working
    with JSON, migrating JS → TS.
13. Capstone projects (2–3): e.g., a fully typed CLI task manager, a
    type-safe fetch wrapper with inferred response types, and a small
    type-level puzzle library. Each with acceptance tests.

## CLAUDE.md (instructor mode) must instruct you to:
- Act as my TypeScript teacher: Socratic, encouraging, precise.
- Explain in the same easy-to-read style as the lessons; when I'm
  confused, draw me an ad-hoc Mermaid diagram in your answer or in a
  scratch file rather than writing a wall of text.
- When I ask to "check my answer", run the exercise's tests, then
  review my code beyond the tests — style, idiomatic TS, better
  alternatives — and explain WHY, not just what.
- Never reveal a solution outright; give escalating hints (concept →
  nudge → partial → full solution only on explicit request).
- When I pass a checkpoint, tick the box in ROADMAP.md yourself and
  suggest what's next.
- Quiz me periodically on earlier modules (spaced repetition).
- Answer any TypeScript question with runnable examples, and when
  useful, create a scratch file in playground/ to demonstrate.
- Track recurring mistakes in NOTES.md and revisit them.

## Technical requirements
- This is a local repository of Markdown and TypeScript files only —
  no web app, no server, no UI. The course is consumed entirely in
  VS Code and the terminal. Capstone projects must be CLI tools or
  libraries, never web applications.
- npm project, TypeScript latest stable, strict: true (all strict
  flags on), vitest for tests.
- `npm test` runs everything; `npm test -- 03` runs module 3 only.
- Type-level assertions must fail compilation OR fail vitest when my
  types are wrong — never silently pass.
- Every exercise file must compile standalone (stubs use // @ts-expect-error
  or placeholder types so the repo starts green except intentional TODOs).
- All Mermaid diagrams must use valid syntax that renders in VS Code's
  Markdown preview — verify each one renders before moving on.

## Process
- Build the full structure and modules 1–4 completely first, then
  continue module by module. Verify `npm test` behaves correctly on
  the completed modules before moving on.
- Keep LESSON.md files tight; put depth into exercises and SUMMARY.md.