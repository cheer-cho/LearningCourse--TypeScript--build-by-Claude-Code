import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  TASK_TRANSITIONS,
  taskId,
  TaskStore,
  type StoreEvents,
  type Task,
  type TaskEvent,
  type TaskId,
  type TaskState,
} from './checkpoint'

describe('✦ checkpoint 11 — advanced patterns', () => {
  it('TaskId is a branded string; raw strings are not assignable', () => {
    expectTypeOf<TaskId>().toEqualTypeOf<string & { readonly __brand: 'TaskId' }>()
    expectTypeOf<string>().not.toExtend<TaskId>()
    expectTypeOf(taskId).toEqualTypeOf<(raw: string) => TaskId>()
  })

  it('TASK_TRANSITIONS has exactly one exhaustive handler per state', () => {
    expectTypeOf(TASK_TRANSITIONS).toEqualTypeOf<Record<TaskState, (event: TaskEvent) => TaskState>>()
    expect(Object.keys(TASK_TRANSITIONS).sort()).toEqual(['doing', 'done', 'todo'])
  })

  it('addTask starts a fresh task in the todo state', () => {
    const store = new TaskStore()
    const task = store.addTask('write tests')
    expect(task.title).toBe('write tests')
    expect(task.state).toBe('todo')
    expectTypeOf(task).toEqualTypeOf<Task>()
    // an empty title is still a title, and ids stay distinct
    const blank = store.addTask('')
    expect(blank.title).toBe('')
    expect(blank.id).not.toBe(task.id)
  })

  it('getTask finds tasks by id, and returns undefined otherwise', () => {
    const store = new TaskStore()
    const task = store.addTask('ship it')
    expect(store.getTask(task.id)).toEqual(task)
    expect(store.getTask(taskId('nope'))).toBeUndefined()
  })

  it('send drives the task through TASK_TRANSITIONS', () => {
    const store = new TaskStore()
    const task = store.addTask('write tests')
    expect(store.send(task.id, 'start').state).toBe('doing')
    expect(store.send(task.id, 'complete').state).toBe('done')
    expect(store.send(task.id, 'reopen').state).toBe('todo')
    // the stored task is updated, not just the returned copy
    expect(store.getTask(task.id)?.state).toBe('todo')
  })

  it('send is a no-op when the event does not apply to the current state', () => {
    const store = new TaskStore()
    const task = store.addTask('write tests')
    const seen: unknown[] = []
    store.on('changed', (p) => seen.push(p))
    store.send(task.id, 'complete') // todo doesn't react to complete
    expect(store.getTask(task.id)?.state).toBe('todo')
    expect(seen).toEqual([])
  })

  it('send emits "changed" exactly when the state actually changes', () => {
    const store = new TaskStore()
    const task = store.addTask('write tests')
    const seen: string[] = []
    store.on('changed', (p) => {
      expectTypeOf(p).toEqualTypeOf<StoreEvents['changed']>()
      seen.push(`${p.from}->${p.to}`)
    })
    store.send(task.id, 'start')
    store.send(task.id, 'start') // already doing — no-op, no extra event
    store.send(task.id, 'complete')
    expect(seen).toEqual(['todo->doing', 'doing->done'])
  })

  it('send throws for an unknown task id', () => {
    const store = new TaskStore()
    expect(() => store.send(taskId('missing'), 'start')).toThrow(/unknown task/)
  })

  it('on rejects unknown events and incompatible payload callbacks', () => {
    const store = new TaskStore()
    const attempt = () => {
      // @ts-expect-error — 'renamed' is not a key of StoreEvents
      store.on('renamed', () => {})
      // @ts-expect-error — from must accept every TaskState, not just 'doing'
      store.on('changed', (p: { id: TaskId; from: 'doing'; to: TaskState }) => p)
    }
    expect(typeof attempt).toBe('function')
  })

  it('a transitions map missing a state does not compile', () => {
    const attempt = () => {
      // @ts-expect-error — missing the 'done' handler
      const incomplete: Record<TaskState, (event: TaskEvent) => TaskState> = {
        todo: (event) => (event === 'start' ? 'doing' : 'todo'),
        doing: (event) => (event === 'complete' ? 'done' : 'doing'),
      }
      return incomplete
    }
    expect(typeof attempt).toBe('function')
  })
})
