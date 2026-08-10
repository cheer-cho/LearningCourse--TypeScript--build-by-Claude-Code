import { describe, expectTypeOf, it } from 'vitest'
import type { EventHandlerName, ExtractParam, Greeting, ParseQuery } from './ex07'

describe('ex08/ex07 — template literal types', () => {
  it('Greeting interpolates the name', () => {
    expectTypeOf<Greeting<'Ada'>>().toEqualTypeOf<'Hello, Ada!'>()
  })

  it('EventHandlerName combines on + Capitalize', () => {
    expectTypeOf<EventHandlerName<'click'>>().toEqualTypeOf<'onClick'>()
    expectTypeOf<EventHandlerName<'submit'>>().toEqualTypeOf<'onSubmit'>()
  })

  it('ExtractParam infers the dynamic segment name', () => {
    expectTypeOf<ExtractParam<'/users/:id'>>().toEqualTypeOf<'id'>()
    expectTypeOf<ExtractParam<'/posts/:postId'>>().toEqualTypeOf<'postId'>()
  })

  it('ParseQuery splits a key=value pair', () => {
    expectTypeOf<ParseQuery<'name=Ada'>>().toEqualTypeOf<{ key: 'name'; value: 'Ada' }>()
  })
})
