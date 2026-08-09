// Reference solution — ex03

export const entry: [string, number] = ['ada', 42]

export const rgba: [number, number, number, number?] = [255, 128, 0]

export const logLine: [string, ...number[]] = ['temps', 21.5, 22.1, 19.8]

export function distance(a: [x: number, y: number], b: [x: number, y: number]): number {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  return Math.sqrt(dx * dx + dy * dy)
}
