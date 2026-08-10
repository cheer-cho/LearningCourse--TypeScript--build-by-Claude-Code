/**
 * ex01 — React types without JSX
 *
 * A React component is just a function: props in, tree out. All the type
 * machinery works without rendering anything — this exercise is React at
 * the type level only (plus two tiny plain-function "hooks").
 *
 * 1. AvatarProps: name (string, required), size (number, optional),
 *    onSelect (optional callback taking the name, returning nothing).
 * 2. Avatar: type it (props: AvatarProps) => ReactNode (import the type
 *    from 'react'). It returns the string `${name} (${size}px)`, with
 *    size defaulting to 32.
 * 3. PropsOfAvatar: extract the props type back OFF the component with
 *    ComponentProps<typeof Avatar> — don't repeat the shape by hand.
 * 4. useValue: give it the useState-shaped generic signature
 *    (initial: S) => [S, (next: S) => S] — the setter (unlike React's)
 *    returns the value it stored, so tests can observe it.
 * 5. useToggle: a custom hook returning `[on, toggle] as const`, i.e.
 *    readonly [boolean, () => boolean]. toggle flips the state and
 *    returns the new value.
 *
 * Check: npm test -- 12 -t ex01
 */

// TODO: name, optional size, optional onSelect callback.
export type AvatarProps = unknown

// TODO: type as (props: AvatarProps) => ReactNode, then implement.
export function Avatar(props: any): any {
  throw new Error('TODO: implement Avatar')
}

// TODO: ComponentProps<typeof Avatar>.
export type PropsOfAvatar = unknown

// TODO: (initial: S) => [S, (next: S) => S], then implement.
export function useValue<S>(initial: any): any {
  throw new Error('TODO: implement useValue')
}

// TODO: return [on, toggle] as const, then implement.
export function useToggle(initial: any): any {
  throw new Error('TODO: implement useToggle')
}
