// Reference solution — checkpoint

export type Brand<T, B extends string> = T & { readonly __brand: B }

export type TaskId = Brand<string, 'TaskId'>

export function taskId(raw: string): TaskId {
  return raw as TaskId
}

export type TaskState = 'todo' | 'doing' | 'done'

export type TaskEvent = 'start' | 'complete' | 'reopen'

export interface Task {
  id: TaskId
  title: string
  state: TaskState
}

export const TASK_TRANSITIONS: Record<TaskState, (event: TaskEvent) => TaskState> = {
  todo: (event) => (event === 'start' ? 'doing' : 'todo'),
  doing: (event) => (event === 'complete' ? 'done' : event === 'reopen' ? 'todo' : 'doing'),
  done: (event) => (event === 'reopen' ? 'todo' : 'done'),
}

export interface StoreEvents {
  changed: { id: TaskId; from: TaskState; to: TaskState }
}

export class TaskStore {
  private tasks = new Map<TaskId, Task>()
  private listeners = new Map<keyof StoreEvents, Array<(payload: any) => void>>()
  private nextId = 1

  addTask(title: string): Task {
    const task: Task = { id: taskId(`task-${this.nextId++}`), title, state: 'todo' }
    this.tasks.set(task.id, task)
    return task
  }

  getTask(id: TaskId): Task | undefined {
    return this.tasks.get(id)
  }

  send(id: TaskId, event: TaskEvent): Task {
    const task = this.tasks.get(id)
    if (!task) throw new Error(`unknown task: ${id}`)
    const from = task.state
    const to = TASK_TRANSITIONS[from](event)
    if (to !== from) {
      task.state = to
      this.emit('changed', { id, from, to })
    }
    return task
  }

  on<K extends keyof StoreEvents>(event: K, cb: (payload: StoreEvents[K]) => void): void {
    const existing = this.listeners.get(event) ?? []
    existing.push(cb)
    this.listeners.set(event, existing)
  }

  private emit<K extends keyof StoreEvents>(event: K, payload: StoreEvents[K]): void {
    for (const cb of this.listeners.get(event) ?? []) cb(payload)
  }
}
