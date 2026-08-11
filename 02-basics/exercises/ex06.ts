/**
 * ex06 — any vs unknown
 *
 * `any` says "trust me" — the compiler stops checking. `unknown` says
 * "check me" — you must prove what it is before using it. Prefer unknown
 * for values from the outside world.
 *
 * Implement `describeValue`. It takes literally anything and must narrow
 * with runtime checks (typeof, Array.isArray) before touching the value:
 *
 *   describeValue('hey')      -> 'string of length 3'
 *   describeValue(7)          -> 'number'
 *   describeValue(true)       -> 'boolean'
 *   describeValue([1, 2, 3])  -> 'array of 3 items'
 *   describeValue(null)       -> 'other'
 *   describeValue({})         -> 'other'
 *
 * The parameter MUST be unknown, not any — the tests check.
 *
 * Check: npm test -- 02 -t ex06
 */

export function describeValue(value: unknown): string {
  switch (typeof value) {
    case 'string':
      return `string of length ${value.length}`;
    case 'number':
    case 'boolean':
      return typeof value;
    default:
      if (Array.isArray(value)) {
        return `array of ${value.length} items`;
      }
      return 'other';
  };
  // throw new Error('TODO: implement describeValue')
}
