// Reference solution — ex06

export interface Routes {
  '/users/:id': { id: string; name: string }
  '/users/:userId/posts/:postId': { title: string; body: string }
  '/health': { ok: boolean }
}

export type ParamNames<Path extends string> = Path extends `${string}:${infer Name}/${infer Rest}`
  ? Name | ParamNames<`/${Rest}`>
  : Path extends `${string}:${infer Name}`
    ? Name
    : never

export type PathParams<Path extends string> = {
  [K in ParamNames<Path>]: string
}

export async function request<K extends keyof Routes>(
  fetcher: (url: string) => Promise<unknown>,
  path: K,
  params: PathParams<K>,
): Promise<Routes[K]> {
  let url: string = path
  for (const [name, value] of Object.entries(params as Record<string, string>)) {
    url = url.replace(`:${name}`, value)
  }
  const result = await fetcher(url)
  return result as Routes[K]
}
