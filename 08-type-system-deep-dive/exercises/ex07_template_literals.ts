/**
 * ex07 — Template literal types
 *
 * Template literal types build string types the way template literal
 * VALUES build strings — and, combined with `infer`, they can also
 * PARSE a string type apart.
 *
 * 1. Greeting<Name>: `Hello, ${Name}!`
 * 2. EventHandlerName<T>: `on` + the capitalized event name.
 *      EventHandlerName<'click'> -> 'onClick'
 * 3. ExtractParam<T>: the dynamic segment name from a route pattern
 *    like '/users/:id'. Assume exactly one `:param` segment.
 *      ExtractParam<'/users/:id'> -> 'id'
 * 4. ParseQuery<T>: split a single `key=value` pair into an object.
 *      ParseQuery<'name=Ada'> -> { key: 'name'; value: 'Ada' }
 *
 * Check: npm test -- 08 -t ex07
 */

// TODO
export type Greeting<Name extends string> = unknown

// TODO
export type EventHandlerName<T extends string> = unknown

// TODO
export type ExtractParam<T extends string> = unknown

// TODO
export type ParseQuery<T extends string> = unknown
