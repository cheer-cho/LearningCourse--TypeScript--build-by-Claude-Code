// Reference solution — ex05

export type RequestState =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: string }
  | { status: 'error'; message: string }

export function describeState(state: RequestState): string {
  switch (state.status) {
    case 'idle':
      return 'idle'
    case 'loading':
      return `loading since ${state.startedAt}`
    case 'success':
      return `got: ${state.data}`
    case 'error':
      return `error: ${state.message}`
  }
}

export function dataOrDefault(state: RequestState, fallback: string): string {
  return state.status === 'success' ? state.data : fallback
}
