/**
 * ✦ CAPSTONE A — Typed CLI Task Manager (library core)
 *
 * This is a project, not a drill: build the in-memory core of a task
 * manager CLI. There is no `checkpoint.ts` for this module — this file
 * IS the graded work. It draws on almost every earlier module:
 *   - 02 literal unions & exhaustive switches
 *   - 05 discriminated unions & narrowing
 *   - 07 generics (Result<T, E>)
 *   - 09 pure functions / immutable state
 *   - 10 the Result pattern (errors as values)
 *   - 11 branded (nominal) types
 *
 * GOALS
 *   1. A branded TaskId so a raw string can never masquerade as an id.
 *   2. A Task type discriminated by `status`, so a 'done' task's extra
 *      field (`completedAt`) is only visible after narrowing.
 *   3. Pure operations — add / complete / remove / filter / sort — that
 *      never mutate their inputs; every operation returns a NEW state.
 *   4. parseCommand(argv): turn a `string[]` (like `process.argv.slice(2)`)
 *      into a typed, discriminated `Command`.
 *   5. execute(state, command, now): a pure reducer. Given a state and a
 *      command, returns the next state plus a list of typed `Message`s
 *      describing what happened (never throws, never logs — that's the
 *      caller's job).
 *
 * ACCEPTANCE CRITERIA (see the test file for the exact contract)
 *   - TaskId values can only be produced by `taskId()`; a plain string is
 *     NOT assignable to TaskId.
 *   - `Task` narrows: after checking `task.status === 'done'`,
 *     `task.completedAt` must be accessible; before that, it must not be.
 *   - `statusLabel` and `sortTasks` are EXHAUSTIVE — every switch/branch
 *     ends in `assertNever` for the case that's structurally impossible.
 *   - `addTask` / `completeTask` / `removeTask` never mutate `state.tasks`
 *     or any existing `Task` object — always return fresh arrays/objects.
 *   - `parseCommand` returns `Result<Command, string>` — unknown commands
 *     and missing arguments are typed errors, never thrown exceptions.
 *   - `execute` is pure: calling it twice with the same arguments returns
 *     equal (deep) results, and it never touches wall-clock time itself
 *     (the caller passes `now`).
 *
 * Check: npm test -- 13 -t capstone-a
 */

// ---------- Branded ids (see module 11 — Brand<T, B>) ----------

// TODO: T & { readonly __brand: B }
export type Brand<T, B extends string> = unknown

// TODO: brand string as 'TaskId'
export type TaskId = unknown

// TODO: the only place a raw string becomes a TaskId.
export function taskId(raw: any): any {
  throw new Error('TODO: implement taskId')
}

// ---------- Task, discriminated by status ----------

// TODO: 'pending' | 'done'
export type TaskStatus = unknown

// TODO: a union of two object shapes sharing id/title/createdAt/status,
// where only the 'done' variant also has `completedAt: number`.
export type Task = unknown

// TODO: (x: never) => never — throw inside; used for exhaustiveness proofs.
export function assertNever(x: any): any {
  throw new Error('TODO: implement assertNever')
}

// TODO: exhaustive switch on task.status. 'pending' -> 'Pending'.
// 'done' -> `Done (completed at ${task.completedAt})`.
export function statusLabel(task: any): any {
  throw new Error('TODO: implement statusLabel')
}

// ---------- State ----------

export interface TaskState {
  readonly tasks: readonly Task[]
  readonly nextId: number
}

export const initialState: TaskState = { tasks: [], nextId: 1 }

// ---------- Result (see module 10) ----------

export type Result<T, E> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E }

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

// ---------- Core operations ----------

// TODO: create a new pending Task with id `task-${state.nextId}`, append
// it, bump nextId, and return BOTH the new state and the created task.
// Must not mutate `state.tasks`.
export function addTask(state: any, title: any, createdAt: any): any {
  throw new Error('TODO: implement addTask')
}

// TODO: find the task by id. Result.err if missing OR already done.
// Otherwise return ok(newState) with that one task replaced by a 'done'
// copy (completedAt = the given timestamp). Must not mutate anything.
export function completeTask(state: any, id: any, completedAt: any): any {
  throw new Error('TODO: implement completeTask')
}

// TODO: Result.err if the id doesn't exist, else ok(newState) with that
// task removed. Must not mutate `state.tasks`.
export function removeTask(state: any, id: any): any {
  throw new Error('TODO: implement removeTask')
}

// TODO: no status -> return tasks unchanged; else only matching tasks.
export function filterTasks(tasks: any, status?: any): any {
  throw new Error('TODO: implement filterTasks')
}

// TODO: 'title' | 'createdAt' | 'status'
export type SortKey = unknown

// TODO: return a NEW sorted array (don't mutate the input). Exhaustive
// switch on `key` ending in assertNever.
export function sortTasks(tasks: any, key: any): any {
  throw new Error('TODO: implement sortTasks')
}

// ---------- Command parsing ----------

// TODO: a discriminated union —
//   { type: 'add'; title: string }
//   { type: 'list'; status?: TaskStatus }
//   { type: 'done'; id: TaskId }
//   { type: 'remove'; id: TaskId }
export type Command = unknown

// TODO: parseCommand(['add', 'Buy', 'milk'])   -> ok({ type: 'add', title: 'Buy milk' })
//       parseCommand(['add'])                  -> err('add requires a title')
//       parseCommand(['list'])                 -> ok({ type: 'list' })
//       parseCommand(['list', 'done'])         -> ok({ type: 'list', status: 'done' })
//       parseCommand(['list', 'bogus'])        -> err(...)
//       parseCommand(['done', 'task-1'])       -> ok({ type: 'done', id: taskId('task-1') })
//       parseCommand(['remove', 'task-1'])     -> ok({ type: 'remove', id: taskId('task-1') })
//       parseCommand(['done'])                 -> err('done requires an id')
//       parseCommand(['nope'])                 -> err('unknown command: nope')
//       parseCommand([])                       -> err('unknown command: (empty)')
export function parseCommand(argv: any): any {
  throw new Error('TODO: implement parseCommand')
}

// ---------- Reducer ----------

// TODO: a discriminated union of typed outcomes —
//   { kind: 'added'; task: Task }
//   { kind: 'listed'; tasks: readonly Task[] }
//   { kind: 'completed'; task: Task }
//   { kind: 'removed'; id: TaskId }
//   { kind: 'error'; reason: string }
export type Message = unknown

// TODO: pure reducer. Dispatch on command.type (exhaustive, assertNever
// default), delegate to addTask/filterTasks/completeTask/removeTask, and
// wrap the outcome as { state, messages: [Message] }. Errors from
// completeTask/removeTask become a single { kind: 'error' } message and
// leave `state` UNCHANGED.
export function execute(state: any, command: any, now: any): any {
  throw new Error('TODO: implement execute')
}
