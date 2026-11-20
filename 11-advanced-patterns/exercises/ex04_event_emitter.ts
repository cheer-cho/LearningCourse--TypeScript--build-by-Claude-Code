/**
 * ex04 — Typed event emitter
 *
 * An event map interface ties each event NAME to its PAYLOAD type. The
 * emitter's generic methods look the payload up per call, so listeners
 * get precisely-typed payloads and emit() rejects wrong ones.
 *
 * 1. Type the three methods with a method-level generic:
 *      on<K extends keyof M>(event: K, cb: (payload: M[K]) => void): void
 *      off — same signature as on (removes that callback)
 *      emit<K extends keyof M>(event: K, payload: M[K]): void
 * 2. Implement them. Internally a
 *      Map<keyof M, Array<(payload: any) => void>>
 *    store is fine — precise types belong on the PUBLIC surface; the
 *    private store can't track the per-key link (that's the gotcha).
 *
 *    const e = new TypedEmitter<AppEvents>()
 *    e.on('login', (p) => p.userId)        // p: { userId: string }
 *    e.emit('login', { userId: 'u1' })     // ok
 *    e.emit('login', { reason: 'x' })      // must NOT compile
 *
 * Check: npm test -- 11 -t ex04
 */

export interface AppEvents {
  login: { userId: string }
  logout: { reason: string }
  message: { from: string; text: string }
}

export class TypedEmitter<M extends object> {
  // TODO: the listener store.

  // TODO: generic signature, then implement.
  on(event: any, cb: any): void {
    throw new Error('TODO: implement on')
  }

  // TODO: generic signature, then implement.
  off(event: any, cb: any): void {
    throw new Error('TODO: implement off')
  }

  // TODO: generic signature, then implement.
  emit(event: any, payload: any): void {
    throw new Error('TODO: implement emit')
  }
}
