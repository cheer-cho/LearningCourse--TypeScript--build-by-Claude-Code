/**
 * ✦ CHECKPOINT 11 — Advanced Patterns
 *
 * A tiny typed task store, combining three patterns from this module:
 * branded ids (ex01), an event map with typed on/emit (ex04), and an
 * exhaustive Record<State, handler> reducer instead of a switch (ex07).
 *
 * 1. TaskId: Brand<string, 'TaskId'>. taskId(raw) does the one cast.
 * 2. TaskState: 'todo' | 'doing' | 'done'.
 * 3. TaskEvent: 'start' | 'complete' | 'reopen'.
 * 4. TASK_TRANSITIONS: Record<TaskState, (event: TaskEvent) => TaskState>,
 *    exhaustive by construction:
 *      todo:  start    -> doing,  else stays todo
 *      doing: complete -> done,   reopen -> todo, else stays doing
 *      done:  reopen   -> todo,   else stays done
 * 5. StoreEvents: { changed: { id: TaskId; from: TaskState; to: TaskState } }
 * 6. TaskStore:
 *      - addTask(title: string): Task — fresh TaskId, state starts 'todo'.
 *      - getTask(id: TaskId): Task | undefined
 *      - send(id: TaskId, event: TaskEvent): Task — looks the task up, runs
 *        it through TASK_TRANSITIONS, updates its state, and emits
 *        'changed' ONLY when the state actually changed. Throws
 *        `Error('unknown task: ' + id)` for an unknown id.
 *      - on<K extends keyof StoreEvents>(event: K, cb: (payload: StoreEvents[K]) => void): void
 *
 *    const store = new TaskStore()
 *    const t = store.addTask('write tests')        // { state: 'todo', ... }
 *    store.on('changed', (p) => console.log(p.from, '->', p.to))
 *    store.send(t.id, 'start')                      // -> 'doing', emits changed
 *    store.send(t.id, 'start')                      // no-op, no event
 *
 * Passing `npm test -- 11` completes this module. 🎉
 */

export type Brand<T, B extends string> = T & { readonly __brand: B }

// TODO: Brand<string, 'TaskId'>
export type TaskId = unknown

// TODO: cast the raw string once.
export function taskId(raw: any): any {
  throw new Error('TODO: implement taskId')
}

// TODO: 'todo' | 'doing' | 'done'
export type TaskState = unknown

// TODO: 'start' | 'complete' | 'reopen'
export type TaskEvent = unknown

export interface Task {
  id: unknown // TODO: TaskId
  title: string
  state: unknown // TODO: TaskState
}

// TODO: Record<TaskState, (event: TaskEvent) => TaskState>, exhaustive.
export const TASK_TRANSITIONS: Record<string, (event: any) => any> = {}

export interface StoreEvents {
  changed: { id: unknown; from: unknown; to: unknown } // TODO: TaskId / TaskState
}

export class TaskStore {
  // TODO: internal state — a map of tasks, a listener store, an id counter.

  // TODO: implement.
  addTask(title: any): any {
    throw new Error('TODO: implement addTask')
  }

  // TODO: implement.
  getTask(id: any): any {
    throw new Error('TODO: implement getTask')
  }

  // TODO: implement.
  send(id: any, event: any): any {
    throw new Error('TODO: implement send')
  }

  // TODO: generic signature, then implement.
  on(event: any, cb: any): void {
    throw new Error('TODO: implement on')
  }
}
