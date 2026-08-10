import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { Avatar, useToggle, useValue, type AvatarProps, type PropsOfAvatar } from './ex01'

describe('ex12/ex01 — React types without JSX', () => {
  it('AvatarProps: required name, optional size, optional callback', () => {
    expectTypeOf<AvatarProps>().toEqualTypeOf<{
      name: string
      size?: number
      onSelect?: (name: string) => void
    }>()
  })

  it('Avatar is a typed function component', () => {
    expect(Avatar({ name: 'Ada' })).toBe('Ada (32px)')
    expect(Avatar({ name: 'Grace', size: 48 })).toBe('Grace (48px)')
    const onSelect = vi.fn()
    expect(Avatar({ name: 'Lin', size: 20, onSelect })).toBe('Lin (20px)')
    expect(onSelect).not.toHaveBeenCalled()
    expectTypeOf(Avatar).toEqualTypeOf<(props: AvatarProps) => ReactNode>()
  })

  it('PropsOfAvatar extracts the props from the component type', () => {
    expectTypeOf<PropsOfAvatar>().toEqualTypeOf<{
      name: string
      size?: number
      onSelect?: (name: string) => void
    }>()
  })

  it('useValue has the useState-shaped generic signature', () => {
    const [value, setValue] = useValue<number>(10)
    expect(value).toBe(10)
    expect(setValue(11)).toBe(11)
    expectTypeOf(useValue<number>).toEqualTypeOf<
      (initial: number) => [number, (next: number) => number]
    >()
  })

  it('useToggle returns a readonly [state, toggle] tuple', () => {
    const [on, toggle] = useToggle(false)
    expect(on).toBe(false)
    expect(toggle()).toBe(true)
    expect(toggle()).toBe(false)
    expectTypeOf(useToggle).parameter(0).toEqualTypeOf<boolean>()
    expectTypeOf(useToggle).returns.toEqualTypeOf<readonly [boolean, () => boolean]>()
  })
})
