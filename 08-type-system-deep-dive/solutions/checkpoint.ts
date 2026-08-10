// Reference solution — checkpoint 8

export type EventMap = Record<string, unknown>

export type ListenerMap<T extends EventMap> = { [K in keyof T]: (payload: T[K]) => void }

export type OnEventName<K extends string> = `on${Capitalize<K>}`

export type PayloadOf<H> = H extends (payload: infer P) => void ? P : never

export type Events = {
  login: { user: string }
  logout: undefined
}

export const EVENT_NAMES = ['login', 'logout'] as const satisfies readonly (keyof Events)[]

export class EventBus<T extends EventMap> {
  private handlers: { [K in keyof T]?: Array<(payload: T[K]) => void> } = {}

  on<K extends keyof T>(event: K, handler: (payload: T[K]) => void): void {
    const list = this.handlers[event]
    if (list === undefined) {
      this.handlers[event] = [handler]
    } else {
      list.push(handler)
    }
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    const list = this.handlers[event]
    if (list === undefined) return
    for (const handler of list) handler(payload)
  }
}
