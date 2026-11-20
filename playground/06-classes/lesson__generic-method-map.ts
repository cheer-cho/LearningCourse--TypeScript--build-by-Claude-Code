class Queue<T> {
  private items: T[] = []
  enqueue(item: T): void { this.items.push(item) }
  toArray(): T[] { return [...this.items] }

  map<U>(fn: (item: T) => U): Queue<U> {
    const out = new Queue<U>()
    for (const item of this.items) out.enqueue(fn(item))
    return out
  }
}

const nums = new Queue<number>()       // T = number (fixed for this queue)
nums.enqueue(1); nums.enqueue(2); nums.enqueue(3)

const labels = nums.map(n => `#${n}`)  // U = string (inferred from the callback)
//    ^? Queue<string>
const flags = nums.map(n => n > 1)     // U = boolean (same queue, different call)
//    ^? Queue<boolean>

console.log(nums.toArray())    // [1, 2, 3]   — original untouched
console.log(labels.toArray())  // ['#1', '#2', '#3']
console.log(flags.toArray())   // [false, true, true]

// ❌ error TS2345: Argument of type '(s: string) => number' is not assignable
//    to parameter of type '(item: number) => number'.
// nums.map((s: string) => s.length)
