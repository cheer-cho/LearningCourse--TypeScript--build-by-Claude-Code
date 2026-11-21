// Reference solution — ex03

export function greet(name: string, options?: greet.Options): string {
  return `Hello, ${name}${options?.punctuation ?? '!'}`
}

export namespace greet {
  export interface Options {
    punctuation?: string
  }

  export const defaultName = 'world'

  export function shout(name: string): string {
    return greet(name).toUpperCase()
  }
}
