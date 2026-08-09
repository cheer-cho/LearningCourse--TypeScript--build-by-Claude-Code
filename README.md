# TypeScript Mastery Course

A complete, self-paced TypeScript course you study **inside VS Code**, with
Claude Code acting as your personal instructor. It is hands-on first: you
learn by writing code and making tests pass, not by reading long documents.

## What you'll get out of it

Full fluency in TypeScript — every piece of syntax, every concept, and
especially deep mastery of the type system (generics, conditional types,
mapped types, template literals, and type-level programming).

## Prerequisites

- Comfortable with JavaScript (functions, objects, arrays, promises).
- [Node.js](https://nodejs.org) 20 or newer.
- VS Code.
- No TypeScript experience needed.

## Setup

```bash
npm install
npm test          # run everything (expect failures — those are your TODOs!)
```

### Enable Mermaid diagrams in VS Code

Lessons use Mermaid diagrams heavily. To see them rendered:

1. Open the Extensions panel (`Ctrl+Shift+X`).
2. Install **"Markdown Preview Mermaid Support"** (`bierner.markdown-mermaid`).
3. Open any `LESSON.md` and press `Ctrl+Shift+V` (or `Ctrl+K V` for side-by-side).

## How to use this course

1. Open [ROADMAP.md](./ROADMAP.md) — it is your progress tracker.
2. Enter the current module folder (start with `01-setup-tooling/`).
3. Read `LESSON.md` — short, diagram-first. 5–10 minutes.
4. Work through `exercises/ex01.ts`, `ex02.ts`, … in order. Each file has
   instructions in comments and `TODO` stubs for you to fill in.
5. Check yourself: `npm test -- 01` (replace `01` with the module number).
6. Finish the module with `checkpoint.ts` — passing its tests means the
   module is complete. Your instructor will tick it off in the roadmap.
7. Skim `SUMMARY.md` as a cheat-sheet and take its self-quiz.

### How the tests work

Every exercise is verified in **two ways** on each test run:

| Check | Tool | Catches |
| --- | --- | --- |
| Runtime behavior | vitest (`expect`) | Wrong values, wrong logic |
| Type correctness | vitest typecheck (`expectTypeOf`, checked by `tsc`) | Wrong or sloppy types — including `any` |

A wrong type **fails the run**; type assertions never silently pass.

A freshly cloned repo compiles cleanly, but many tests fail — each failure
is an exercise you haven't solved yet. That's the point: your job is to
turn the module you're working on green.

### Commands

```bash
npm test              # all modules
npm test -- 03        # module 03 only ("3" works too)
npm test -- 03 -t ex02   # a single exercise within module 03
npm run typecheck     # tsc over the whole repo
```

## Working with your instructor

Open this repo in Claude Code. [CLAUDE.md](./CLAUDE.md) turns Claude into
your TypeScript teacher. Useful things to say:

- *"Explain this lesson to me"* / *"I don't get conditional types, draw it"*
- *"Check my answer for ex03"* — runs the tests **and** reviews your style
- *"Give me a hint"* — you get escalating hints, never the full solution
  (unless you explicitly ask for it)
- *"Quiz me"* — spaced-repetition review of earlier modules

## Repository layout

```
01-setup-tooling/     one folder per module
  LESSON.md           concise, diagram-first explanation
  exercises/          ex01.ts, ex02.ts, ... + their tests
  solutions/          reference solutions — don't peek, ask for hints instead
  checkpoint.ts       graded checkpoint; passing it = module complete
  SUMMARY.md          cheat-sheet + mindmap + self-quiz
playground/           scratch space for experiments with your instructor
NOTES.md              your instructor's log of your recurring mistakes
ROADMAP.md            full learning path + progress checkboxes
```
