/**
 * ✦ CHECKPOINT 11 — Advanced Patterns
 *
 * A tiny typed task store, combining three patterns from this module:
 * branded ids (ex01), an event map with typed on/emit (ex04), and an
 * exhaustive Record<State, handler> reducer instead of a switch (ex07).
 * Each declaration below explains its own job.
 *
 *   const store = new TaskStore()
 *   const t = store.addTask('write tests')        // { state: 'todo', ... }
 *   store.on('changed', (p) => console.log(p.from, '->', p.to))
 *   store.send(t.id, 'start')                      // -> 'doing', emits changed
 *   store.send(t.id, 'start')                      // no-op, no event
 *
 * Passing `npm test -- 11` completes this module. 🎉
 */

export type Brand<T, B extends string> = T & { readonly __brand: B }

// A branded string, so plain strings can't be passed where an id is
// expected: Brand<string, 'TaskId'>
export type TaskId = unknown

// The ONE place a raw string becomes a TaskId — a single cast.
//   Signature: (raw: string) => TaskId
export function taskId(raw: any): any {
  throw new Error('TODO: implement taskId')
}

// Where a task can be: 'todo' | 'doing' | 'done'
export type TaskState = unknown

// What can happen to a task: 'start' | 'complete' | 'reopen'
export type TaskEvent = unknown

export interface Task {
  id: unknown // TODO: TaskId
  title: string
  state: unknown // TODO: TaskState
}

// The state machine as data — one handler per state, exhaustive BY
// CONSTRUCTION (a missing state is a compile error):
//   Record<TaskState, (event: TaskEvent) => TaskState>
//     todo:  start    -> doing,  else stays todo
//     doing: complete -> done,   reopen -> todo, else stays doing
//     done:  reopen   -> todo,   else stays done
export const TASK_TRANSITIONS: Record<string, (event: any) => any> = {}

// The store's event map: one 'changed' event whose payload says which
// task moved, from where, to where. TODO: TaskId / TaskState.
export interface StoreEvents {
  changed: { id: unknown; from: unknown; to: unknown } // TODO: TaskId / TaskState
}

export class TaskStore {
  // TODO: internal state — a map of tasks, a listener store, an id counter.

  // Create a task with a fresh TaskId; state starts at 'todo'.
  //   Signature: (title: string) => Task
  addTask(title: any): any {
    throw new Error('TODO: implement addTask')
  }

  // Look a task up by id.
  //   Signature: (id: TaskId) => Task | undefined
  getTask(id: any): any {
    throw new Error('TODO: implement getTask')
  }

  // Advance a task: look it up, run it through TASK_TRANSITIONS, update
  // its state, and emit 'changed' ONLY when the state actually changed.
  // Throws Error('unknown task: ' + id) for an unknown id.
  //   Signature: (id: TaskId, event: TaskEvent) => Task
  send(id: any, event: any): any {
    throw new Error('TODO: implement send')
  }

  // Subscribe to a store event — typed per key:
  //   on<K extends keyof StoreEvents>(event: K,
  //      cb: (payload: StoreEvents[K]) => void): void
  on(event: any, cb: any): void {
    throw new Error('TODO: implement on')
  }
}
