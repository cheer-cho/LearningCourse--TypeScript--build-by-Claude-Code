// Version A — names the class (like your ex04)
class A {
  static next = 100
  static issue() { return A.next++ }
}
class VipA extends A {}

console.log('A:', A.issue(), VipA.issue(), A.issue()) // shared?

// Version B — uses `this`
class B {
  static next = 100
  static issue() { return this.next++ }
}
class VipB extends B {}

console.log('B:', B.issue(), VipB.issue(), B.issue(), VipB.issue())
console.log('VipB has own next?', Object.hasOwn(VipB, 'next'))
