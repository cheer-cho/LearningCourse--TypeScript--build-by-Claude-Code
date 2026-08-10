// Reference solution — capstone-a-task-manager

// ---------- Branded ids (module 11) ----------

export type Brand<T, B extends string> = T & { readonly __brand: B }

export type TaskId = Brand<string, 'TaskId'>

export function taskId(raw: string): TaskId {
  return raw as TaskId
}

// ---------- Task, discriminated by status (module 02 / 05) ----------

export type TaskStatus = 'pending' | 'done'

export type Task =
  | { readonly id: TaskId; readonly title: string; readonly createdAt: number; readonly status: 'pending' }
  | {
      readonly id: TaskId
      readonly title: string
      readonly createdAt: number
      readonly status: 'done'
      readonly completedAt: number
    }

export function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`)
}

export function statusLabel(task: Task): string {
  switch (task.status) {
    case 'pending':
      return 'Pending'
    case 'done':
      return `Done (completed at ${task.completedAt})`
    default:
      return assertNever(task)
  }
}

// ---------- State ----------

export interface TaskState {
  readonly tasks: readonly Task[]
  readonly nextId: number
}

export const initialState: TaskState = { tasks: [], nextId: 1 }

// ---------- Result (module 10) ----------

export type Result<T, E> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E }

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

// ---------- Core operations ----------

export function addTask(
  state: TaskState,
  title: string,
  createdAt: number,
): { readonly state: TaskState; readonly task: Task } {
  const task: Task = { id: taskId(`task-${state.nextId}`), title, createdAt, status: 'pending' }
  const next: TaskState = { tasks: [...state.tasks, task], nextId: state.nextId + 1 }
  return { state: next, task }
}

export function completeTask(state: TaskState, id: TaskId, completedAt: number): Result<TaskState, string> {
  const index = state.tasks.findIndex((t) => t.id === id)
  const found = index === -1 ? undefined : state.tasks[index]
  if (!found) return err(`task not found: ${id}`)
  if (found.status === 'done') return err(`task already done: ${id}`)
  const updated: Task = {
    id: found.id,
    title: found.title,
    createdAt: found.createdAt,
    status: 'done',
    completedAt,
  }
  const tasks = state.tasks.map((t, i) => (i === index ? updated : t))
  return ok({ tasks, nextId: state.nextId })
}

export function removeTask(state: TaskState, id: TaskId): Result<TaskState, string> {
  const exists = state.tasks.some((t) => t.id === id)
  if (!exists) return err(`task not found: ${id}`)
  return ok({ tasks: state.tasks.filter((t) => t.id !== id), nextId: state.nextId })
}

export function filterTasks(tasks: readonly Task[], status?: TaskStatus): readonly Task[] {
  if (status === undefined) return tasks
  return tasks.filter((t) => t.status === status)
}

export type SortKey = 'title' | 'createdAt' | 'status'

export function sortTasks(tasks: readonly Task[], key: SortKey): readonly Task[] {
  const copy = [...tasks]
  copy.sort((a, b) => {
    switch (key) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'createdAt':
        return a.createdAt - b.createdAt
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return assertNever(key)
    }
  })
  return copy
}

// ---------- Command parsing ----------

export type Command =
  | { readonly type: 'add'; readonly title: string }
  | { readonly type: 'list'; readonly status?: TaskStatus }
  | { readonly type: 'done'; readonly id: TaskId }
  | { readonly type: 'remove'; readonly id: TaskId }

function isTaskStatus(x: string): x is TaskStatus {
  return x === 'pending' || x === 'done'
}

export function parseCommand(argv: readonly string[]): Result<Command, string> {
  const [head, ...rest] = argv
  switch (head) {
    case 'add': {
      const title = rest.join(' ').trim()
      if (title.length === 0) return err('add requires a title')
      return ok({ type: 'add', title })
    }
    case 'list': {
      const raw = rest[0]
      if (raw === undefined) return ok({ type: 'list' })
      if (!isTaskStatus(raw)) return err(`unknown status: ${raw}`)
      return ok({ type: 'list', status: raw })
    }
    case 'done': {
      const raw = rest[0]
      if (raw === undefined) return err('done requires an id')
      return ok({ type: 'done', id: taskId(raw) })
    }
    case 'remove': {
      const raw = rest[0]
      if (raw === undefined) return err('remove requires an id')
      return ok({ type: 'remove', id: taskId(raw) })
    }
    default:
      return err(`unknown command: ${head ?? '(empty)'}`)
  }
}

// ---------- Reducer ----------

export type Message =
  | { readonly kind: 'added'; readonly task: Task }
  | { readonly kind: 'listed'; readonly tasks: readonly Task[] }
  | { readonly kind: 'completed'; readonly task: Task }
  | { readonly kind: 'removed'; readonly id: TaskId }
  | { readonly kind: 'error'; readonly reason: string }

export function execute(
  state: TaskState,
  command: Command,
  now: number,
): { readonly state: TaskState; readonly messages: readonly Message[] } {
  switch (command.type) {
    case 'add': {
      const { state: next, task } = addTask(state, command.title, now)
      return { state: next, messages: [{ kind: 'added', task }] }
    }
    case 'list': {
      const tasks = filterTasks(state.tasks, command.status)
      return { state, messages: [{ kind: 'listed', tasks }] }
    }
    case 'done': {
      const result = completeTask(state, command.id, now)
      if (!result.ok) return { state, messages: [{ kind: 'error', reason: result.error }] }
      const task = result.value.tasks.find((t) => t.id === command.id)
      if (!task) return { state, messages: [{ kind: 'error', reason: `task not found: ${command.id}` }] }
      return { state: result.value, messages: [{ kind: 'completed', task }] }
    }
    case 'remove': {
      const result = removeTask(state, command.id)
      if (!result.ok) return { state, messages: [{ kind: 'error', reason: result.error }] }
      return { state: result.value, messages: [{ kind: 'removed', id: command.id }] }
    }
    default:
      return assertNever(command)
  }
}
