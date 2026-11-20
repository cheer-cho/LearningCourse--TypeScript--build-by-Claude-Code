// Reference solution — ex04

export interface AppEvents {
  login: { userId: string }
  logout: { reason: string }
  message: { from: string; text: string }
}

export class TypedEmitter<M extends object> {
  // The store can't express "this array only holds callbacks for THIS
  // key" — `any` here is contained; the public methods stay precise.
  private listeners = new Map<keyof M, Array<(payload: any) => void>>()

  on<K extends keyof M>(event: K, cb: (payload: M[K]) => void): void {
    const existing = this.listeners.get(event) ?? []
    existing.push(cb)
    this.listeners.set(event, existing)
  }

  off<K extends keyof M>(event: K, cb: (payload: M[K]) => void): void {
    const existing = this.listeners.get(event)
    if (existing) {
      this.listeners.set(
        event,
        existing.filter((listener) => listener !== cb),
      )
    }
  }

  emit<K extends keyof M>(event: K, payload: M[K]): void {
    for (const cb of this.listeners.get(event) ?? []) cb(payload)
  }
}
