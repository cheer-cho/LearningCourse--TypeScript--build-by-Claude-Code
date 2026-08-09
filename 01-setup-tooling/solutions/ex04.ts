// Reference solution — ex04

export type User = {
  id: number
  name: string
  tags: string[]
  active: boolean
}

export function parseUser(json: string): User {
  return JSON.parse(json)
}
