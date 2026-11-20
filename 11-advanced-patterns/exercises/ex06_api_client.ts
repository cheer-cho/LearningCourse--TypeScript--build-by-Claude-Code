/**
 * ex06 — Type-safe API client from a route table
 *
 * One interface maps each route path to its response type. Template-
 * literal types PARSE the path string itself to find the `:param` names,
 * so calling `request` with a route key demands exactly the right params
 * and returns exactly the right response type.
 *
 * 1. ParamNames<Path>: union of the `:param` names in a path.
 *      ParamNames<'/users/:id'>                 -> 'id'
 *      ParamNames<'/users/:userId/posts/:postId'> -> 'userId' | 'postId'
 *      ParamNames<'/health'>                    -> never
 *    Hint: match `${string}:${infer Name}/${infer Rest}` first (a param
 *    followed by more path), recurse on `/${Rest}`; then match a final
 *    `${string}:${infer Name}`.
 * 2. PathParams<Path>: object with one string property per param name.
 *      PathParams<'/users/:id'> -> { id: string }
 *    Hint: map over ParamNames<Path>.
 * 3. request(fetcher, path, params):
 *      - generic over K extends keyof Routes
 *      - params: PathParams<K>; returns Promise<Routes[K]>
 *      - substitute each `:name` in the path with params[name], call
 *        fetcher(url), return its result (cast to the response type).
 *
 *    await request(fetcher, '/users/:id', { id: '7' })
 *      -> fetcher called with '/users/7', result typed { id; name }
 *
 * Check: npm test -- 11 -t ex06
 */

export interface Routes {
  '/users/:id': { id: string; name: string }
  '/users/:userId/posts/:postId': { title: string; body: string }
  '/health': { ok: boolean }
}

// TODO: recursive template-literal type.
export type ParamNames<Path extends string> = unknown

// TODO: { [each param name]: string }
export type PathParams<Path extends string> = unknown

// TODO: generic signature over keyof Routes, then implement.
export async function request(fetcher: any, path: any, params: any): Promise<any> {
  throw new Error('TODO: implement request')
}
