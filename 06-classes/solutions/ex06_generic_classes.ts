// Reference solution — ex06

export class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  get size(): number {
    return this.items.length
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }
}

export class LoggingStack<T> extends Stack<T> {
  log: string[] = []

  override push(item: T): void {
    this.log.push('push')
    super.push(item)
  }

  override pop(): T | undefined {
    const item = super.pop()
    this.log.push('pop')
    return item
  }
}
