// Q: "Passing a class as a value — is that even a real use case?"
// Yes. You have already used it. Two examples you will recognise.
export {}

// ── 1. Vitest: expect(fn).toThrow(RangeError) ────────────────────────────
// `toThrow` receives the CLASS RangeError, not an instance. Inside, it uses
// the class for `instanceof`. This is a construct signature in disguise.

type ErrorClass = new (...args: any[]) => Error

function expectToThrow(fn: () => void, Expected: ErrorClass): void {
  try {
    fn()
  } catch (e) {
    if (e instanceof Expected) {
      console.log(`✅ threw ${Expected.name}`)
      return
    }
    console.log(`❌ threw ${(e as Error).constructor.name}, expected ${Expected.name}`)
    return
  }
  console.log('❌ did not throw')
}

expectToThrow(() => { throw new RangeError('too big') }, RangeError) // ✅ threw RangeError
expectToThrow(() => { throw new TypeError('nope') }, RangeError)     // ❌ threw TypeError, expected RangeError

// You cannot pass an instance; the framework needs the class to compare against.
// ❌ error TS2345: Argument of type 'RangeError' is not assignable to parameter of type 'ErrorClass'.
// @ts-expect-error
expectToThrow(() => {}, new RangeError('x'))

// ── 2. ORM / DI: getRepository(User) ─────────────────────────────────────
// TypeORM, NestJS, Angular, Prisma-style DI: you hand the framework the CLASS,
// and it builds instances for you later. The class is the "key" that says
// which table / which service you want, and it also carries the type.

class User {
  constructor(public id: number, public name: string) {}
}
class Order {
  constructor(public id: number, public total: number) {}
}

// "give me a class whose constructor takes (id, ...rest) and returns T"
type Entity<T> = new (...args: any[]) => T

class Repository<T> {
  private rows: T[] = []
  constructor(private Model: Entity<T>) {}

  create(...args: any[]): T {
    const row = new this.Model(...args)    // the framework does the `new`, not you
    this.rows.push(row)
    return row
  }
  all(): T[] { return this.rows }
}

function getRepository<T>(Model: Entity<T>): Repository<T> {
  return new Repository(Model)
}

const users = getRepository(User)          // Repository<User>  — inferred from the class
const orders = getRepository(Order)        // Repository<Order>

const u = users.create(1, 'Ada')
console.log(u.name)                        // 'Ada'  — u is typed as User
console.log(orders.create(7, 99.5).total)  // 99.5   — typed as Order

// ❌ error TS2339: Property 'total' does not exist on type 'User'.
// @ts-expect-error
u.total

// ── 3. Same idea, tiny: a factory that picks the class at runtime ────────
type Shape = { area(): number }
class Square { constructor(private s: number) {} area() { return this.s ** 2 } }
class Circle { constructor(private r: number) {} area() { return Math.PI * this.r ** 2 } }

const shapes: Record<string, new (n: number) => Shape> = { square: Square, circle: Circle }

const kind = process.argv[2] ?? 'square'   // decided at runtime, e.g. from a config file
console.log(kind, new shapes[kind](2).area().toFixed(2))
