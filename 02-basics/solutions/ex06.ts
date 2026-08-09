// Reference solution — ex06

export function describeValue(value: unknown): string {
  if (typeof value === 'string') return `string of length ${value.length}`
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'
  if (Array.isArray(value)) return `array of ${value.length} items`
  return 'other'
}
