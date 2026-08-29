import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  addTask,
  assertNever,
  completeTask,
  execute,
  filterTasks,
  initialState,
  parseCommand,
  removeTask,
  sortTasks,
  statusLabel,
  taskId,
  type Command,
  type Message,
  type Result,
  type Task,
  type TaskId,
  type TaskState,
} from './capstone-a-task-manager'

describe('capstone-a — branded TaskId', () => {
  it('taskId brands a raw string', () => {
    const id = taskId('task-1')
    expect(id).toBe('task-1')
    expectTypeOf(id).toEqualTypeOf<TaskId>()
  })

  it('a plain string is not a TaskId', () => {
    // @ts-expect-error — raw strings must go through taskId()
    const bad: TaskId = 'task-1'
    expect(typeof bad).toBe('string')
  })
})

// Not invoked at describe-scope on purpose: taskId() is a TODO stub, and
// calling it outside an `it(...)` would throw while the file is still
// being *collected*, taking every test in the file down with it.
function fixtureTasks(): { pending: Task; done: Task } {
  return {
    pending: { id: taskId('task-1'), title: 'Write tests', createdAt: 0, status: 'pending' },
    done: { id: taskId('task-2'), title: 'Ship it', createdAt: 0, status: 'done', completedAt: 10 },
  }
}

describe('capstone-a — Task discriminated by status', () => {
  it('narrows to reveal completedAt only on done tasks', () => {
    const { pending, done } = fixtureTasks()
    if (done.status === 'done') {
      expectTypeOf(done.completedAt).toEqualTypeOf<number>()
    }
    expect(pending.status).toBe('pending')
  })

  it('statusLabel is exhaustive and precisely typed', () => {
    const { pending, done } = fixtureTasks()
    expect(statusLabel(pending)).toBe('Pending')
    expect(statusLabel(done)).toBe('Done (completed at 10)')
    expectTypeOf(statusLabel).toEqualTypeOf<(task: Task) => string>()
  })

  it('assertNever is typed (x: never) => never', () => {
    expectTypeOf(assertNever).toEqualTypeOf<(x: never) => never>()
  })
})

describe('capstone-a — pure operations never mutate', () => {
  it('addTask returns a fresh state and does not touch the original', () => {
    const before = initialState
    const { state: after, task } = addTask(before, 'Buy milk', 100)
    expect(before.tasks).toEqual([])
    expect(after.tasks).toEqual([task])
    expect(after).not.toBe(before)
    expect(after.tasks).not.toBe(before.tasks)
    expect(task).toEqual({ id: 'task-1', title: 'Buy milk', createdAt: 100, status: 'pending' })
    expectTypeOf(task).toMatchTypeOf<Task>()
  })

  it('completeTask replaces only the matching task, immutably', () => {
    const s0 = initialState
    const { state: s1, task: t1 } = addTask(s0, 'A', 0)
    const { state: s2 } = addTask(s1, 'B', 0)
    const before = s2.tasks
    const result = completeTask(s2, t1.id, 50)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(before).toEqual(s2.tasks) // s2 untouched
      const completed = result.value.tasks.find((t) => t.id === t1.id)
      expect(completed).toEqual({ id: t1.id, title: 'A', createdAt: 0, status: 'done', completedAt: 50 })
      // the other task is unaffected and still the SAME object reference
      const other = result.value.tasks.find((t) => t.id !== t1.id)
      expect(other).toBe(s2.tasks[1])
    }
  })

  it('completeTask reports errors as values, not throws', () => {
    const missing = completeTask(initialState, taskId('nope'), 1)
    expect(missing).toEqual({ ok: false, error: 'task not found: nope' })

    const { state: s1, task } = addTask(initialState, 'A', 0)
    const doneOnce = completeTask(s1, task.id, 1)
    expect(doneOnce.ok).toBe(true)
    if (doneOnce.ok) {
      const doneTwice = completeTask(doneOnce.value, task.id, 2)
      expect(doneTwice.ok).toBe(false)
      // a DIFFERENT error than "not found" — the two paths must not blur
      expect(doneTwice).toEqual({ ok: false, error: `task already done: ${task.id}` })
    }
    expectTypeOf(completeTask).returns.toEqualTypeOf<Result<TaskState, string>>()
  })

  it('removeTask drops exactly one task, immutably', () => {
    const { state: s1, task: a } = addTask(initialState, 'A', 0)
    const { state: s2 } = addTask(s1, 'B', 0)
    const result = removeTask(s2, a.id)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.tasks).toHaveLength(1)
      expect(result.value.tasks[0]?.title).toBe('B')
    }
    expect(s2.tasks).toHaveLength(2) // original untouched
    expect(removeTask(s2, taskId('ghost')).ok).toBe(false)
  })
})

// Same reasoning as fixtureTasks(): build this fresh inside each `it`.
function buildSortState(): TaskState {
  const s1 = addTask(initialState, 'Charlie', 3).state
  const s2 = addTask(s1, 'alpha', 1).state
  const s3 = addTask(s2, 'bravo', 2).state
  const doneResult = completeTask(s3, s3.tasks[0]!.id, 99)
  return doneResult.ok ? doneResult.value : s3
}

describe('capstone-a — filter and sort', () => {
  it('filterTasks with no status returns everything, unchanged reference', () => {
    const state = buildSortState()
    expect(filterTasks(state.tasks)).toBe(state.tasks)
  })

  it('filterTasks narrows by status', () => {
    const state = buildSortState()
    expect(filterTasks(state.tasks, 'done')).toHaveLength(1)
    expect(filterTasks(state.tasks, 'pending')).toHaveLength(2)
  })

  it('sortTasks orders by title without mutating the input', () => {
    const state = buildSortState()
    const original = [...state.tasks]
    const sorted = sortTasks(state.tasks, 'title')
    expect(sorted.map((t) => t.title)).toEqual(['alpha', 'bravo', 'Charlie'].sort((a, b) => a.localeCompare(b)))
    expect(state.tasks).toEqual(original) // input order untouched
  })

  it('sortTasks orders by createdAt', () => {
    const state = buildSortState()
    const sorted = sortTasks(state.tasks, 'createdAt')
    expect(sorted.map((t) => t.createdAt)).toEqual([1, 2, 3])
  })

  it('sortTasks orders by status — the third SortKey', () => {
    const state = buildSortState()
    const sorted = sortTasks(state.tasks, 'status')
    expect(sorted.map((t) => t.status)).toEqual(['done', 'pending', 'pending'])
    expect(filterTasks([], 'done')).toEqual([])
  })
})

describe('capstone-a — parseCommand', () => {
  it('parses add with a multi-word title', () => {
    expect(parseCommand(['add', 'Buy', 'milk'])).toEqual({ ok: true, value: { type: 'add', title: 'Buy milk' } })
  })

  it('rejects add with no title', () => {
    const r = parseCommand(['add'])
    expect(r).toEqual({ ok: false, error: 'add requires a title' })
    // whitespace-only is no title either — the trim must happen before the check
    expect(parseCommand(['add', '   '])).toEqual({ ok: false, error: 'add requires a title' })
  })

  it('parses list with and without a status filter', () => {
    expect(parseCommand(['list'])).toEqual({ ok: true, value: { type: 'list' } })
    expect(parseCommand(['list', 'done'])).toEqual({ ok: true, value: { type: 'list', status: 'done' } })
    expect(parseCommand(['list', 'pending'])).toEqual({
      ok: true,
      value: { type: 'list', status: 'pending' },
    })
    expect(parseCommand(['list', 'bogus']).ok).toBe(false)
  })

  it('parses done and remove with an id', () => {
    expect(parseCommand(['done', 'task-1'])).toEqual({ ok: true, value: { type: 'done', id: 'task-1' } })
    expect(parseCommand(['remove', 'task-1'])).toEqual({ ok: true, value: { type: 'remove', id: 'task-1' } })
    expect(parseCommand(['done']).ok).toBe(false)
    expect(parseCommand(['remove']).ok).toBe(false)
  })

  it('rejects unknown commands, including empty input', () => {
    expect(parseCommand(['nope'])).toEqual({ ok: false, error: 'unknown command: nope' })
    expect(parseCommand([])).toEqual({ ok: false, error: 'unknown command: (empty)' })
  })

  it('has the precise inferred signature', () => {
    expectTypeOf(parseCommand).toEqualTypeOf<(argv: readonly string[]) => Result<Command, string>>()
  })
})

describe('capstone-a — execute reducer', () => {
  it('add produces a new state and an "added" message', () => {
    const { state, messages } = execute(initialState, { type: 'add', title: 'Write docs' }, 10)
    expect(state.tasks).toHaveLength(1)
    expect(messages).toEqual([{ kind: 'added', task: state.tasks[0] }])
  })

  it('list never changes state', () => {
    const s1 = execute(initialState, { type: 'add', title: 'A' }, 1).state
    const { state, messages } = execute(s1, { type: 'list' }, 2)
    expect(state).toBe(s1)
    expect(messages).toEqual([{ kind: 'listed', tasks: s1.tasks }])
    // a filtered list still leaves state alone
    const filtered = execute(s1, { type: 'list', status: 'done' }, 3)
    expect(filtered.state).toBe(s1)
    expect(filtered.messages).toEqual([{ kind: 'listed', tasks: [] }])
  })

  it('done completes a task and reports an error for a bad id', () => {
    const s1 = execute(initialState, { type: 'add', title: 'A' }, 1).state
    const id = s1.tasks[0]!.id
    const done = execute(s1, { type: 'done', id }, 5)
    expect(done.messages).toEqual([{ kind: 'completed', task: { ...s1.tasks[0], status: 'done', completedAt: 5 } }])

    const missing = execute(s1, { type: 'done', id: taskId('ghost') }, 6)
    expect(missing.state).toBe(s1) // unchanged on error
    expect(missing.messages).toEqual([{ kind: 'error', reason: 'task not found: ghost' }])
  })

  it('remove drops a task and reports an error for a bad id', () => {
    const s1 = execute(initialState, { type: 'add', title: 'A' }, 1).state
    const id = s1.tasks[0]!.id
    const removed = execute(s1, { type: 'remove', id }, 2)
    expect(removed.state.tasks).toHaveLength(0)
    expect(removed.messages).toEqual([{ kind: 'removed', id }])

    const missing = execute(s1, { type: 'remove', id: taskId('ghost') }, 3)
    expect(missing.state).toBe(s1)
    expect(missing.messages[0]).toEqual({ kind: 'error', reason: 'task not found: ghost' })
  })

  it('is pure — same inputs, equal outputs, no shared mutation', () => {
    const s1 = execute(initialState, { type: 'add', title: 'A' }, 1).state
    const runA = execute(s1, { type: 'list' }, 2)
    const runB = execute(s1, { type: 'list' }, 2)
    expect(runA).toEqual(runB)
    expect(s1.tasks).toHaveLength(1) // execute never touched s1
  })

  it('has the precise inferred signature', () => {
    expectTypeOf(execute).toEqualTypeOf<
      (state: TaskState, command: Command, now: number) => { readonly state: TaskState; readonly messages: readonly Message[] }
    >()
  })
})
