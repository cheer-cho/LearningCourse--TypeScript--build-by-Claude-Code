import { describe, expect, expectTypeOf, it } from 'vitest'
import { Note, Serializable, Timestamped, type Constructor } from './ex07'

describe('ex06/ex07 — mixins', () => {
  it('Constructor<T> models any newable that produces a T', () => {
    expectTypeOf<Constructor<{ x: number }>>().toEqualTypeOf<new (...args: any[]) => { x: number }>()
  })

  it('Note stores title and body via parameter properties', () => {
    const n = new Note('Groceries', 'milk, eggs')
    expect(n.title).toBe('Groceries')
    expect(n.body).toBe('milk, eggs')
    expectTypeOf(n.title).toEqualTypeOf<string>()
  })

  it('Serializable(Note) adds serialize() and keeps title/body', () => {
    class SerializableNote extends Serializable(Note) {}
    const n = new SerializableNote('Groceries', 'milk, eggs')
    expect(n.serialize()).toBe(JSON.stringify({ title: 'Groceries', body: 'milk, eggs' }))
    expectTypeOf(n.serialize).toEqualTypeOf<() => string>()
    expectTypeOf(n.title).toEqualTypeOf<string>()
  })

  it('Timestamped(Note) adds a fresh createdAt per instance', () => {
    class TimestampedNote extends Timestamped(Note) {}
    const a = new TimestampedNote('A', 'a')
    const b = new TimestampedNote('B', 'b')
    expect(a.createdAt).toBeInstanceOf(Date)
    expect(a.createdAt).not.toBe(b.createdAt)
    expectTypeOf(a.createdAt).toEqualTypeOf<Date>()
  })

  it('mixins compose by chaining: Timestamped(Serializable(Note))', () => {
    class FullNote extends Timestamped(Serializable(Note)) {}
    const n = new FullNote('Recipe', 'flour, sugar')
    expect(n.serialize()).toContain('Recipe')
    expect(n.createdAt).toBeInstanceOf(Date)
    expectTypeOf(n.title).toEqualTypeOf<string>()
    expectTypeOf(n.serialize).toEqualTypeOf<() => string>()
    expectTypeOf(n.createdAt).toEqualTypeOf<Date>()
  })
})
