export type Config = {
  readonly host: string
  readonly port: number
  debug: boolean
}

const c: Config = { host: 'localhost', port: 8080, debug: false }
const plain: { host: string; port: number; debug: boolean } = c

plain.port = 3000   // does this compile? what is c.port now?

console.log(plain.port);


const x: { host: string; port: number; debug: boolean } = { host: 'localhost', port: 8080, debug: false }

const y: Config = x;
y.port = 3000;