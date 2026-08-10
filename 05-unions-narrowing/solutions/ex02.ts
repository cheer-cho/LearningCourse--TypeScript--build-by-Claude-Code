// Reference solution — ex02

export type Identified = { id: number }
export type Serializable = { serialize: () => string }

export type Entity = Identified & Serializable

export type Overlap = ('a' | 'b') & ('b' | 'c')

export type Impossible = string & number

export function makeEntity(id: number, payload: string): Entity {
  return {
    id,
    serialize: () => `${id}:${payload}`,
  }
}
