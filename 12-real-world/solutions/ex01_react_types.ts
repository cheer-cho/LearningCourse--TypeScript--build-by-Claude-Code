// Reference solution — ex01

import type { ComponentProps, ReactNode } from 'react'

export type AvatarProps = {
  name: string
  size?: number
  onSelect?: (name: string) => void
}

export function Avatar(props: AvatarProps): ReactNode {
  const size = props.size ?? 32
  return `${props.name} (${size}px)`
}

export type PropsOfAvatar = ComponentProps<typeof Avatar>

export function useValue<S>(initial: S): [S, (next: S) => S] {
  let current = initial
  const set = (next: S): S => {
    current = next
    return current
  }
  return [current, set]
}

export function useToggle(initial: boolean) {
  let on = initial
  const toggle = (): boolean => {
    on = !on
    return on
  }
  return [on, toggle] as const
}
