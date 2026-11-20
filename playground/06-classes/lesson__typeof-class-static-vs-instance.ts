// Purpose: one class declaration makes two types: `Robot` (instances) and `typeof Robot` (the constructor + statics).
// Run: npm run playground lesson__typeof-class-static-vs-instance
//
// The ❌ line at the bottom is an INTENTIONAL type error (TS2576). The runner
// reports it, then runs anyway: at runtime the instance simply has no `factory`.
export {}

class Robot {
  static factory = 'Acme'
  constructor(public model: string) {}
}

const unit: Robot = new Robot('R2')          // instance side
const Ctor: typeof Robot = Robot             // static side (the constructor)
type RobotInstance = InstanceType<typeof Robot>   // Robot, recovered from the ctor
// Hovering RobotInstance shows `Robot`: the same type as the instance side.

const fromCtor: RobotInstance = new Ctor('C3') // `new` on the static side gives the instance side
console.log('Ctor === Robot ->', Ctor === Robot)
console.log('typeof Ctor (runtime) ->', typeof Ctor)
console.log('typeof unit (runtime) ->', typeof unit)
console.log('Ctor.factory ->', Ctor.factory)                 // 'Acme'
console.log('unit.model ->', unit.model)                     // 'R2'
console.log('fromCtor.model ->', fromCtor.model)             // 'C3'
console.log('fromCtor instanceof Robot ->', fromCtor instanceof Robot)
console.log('unit.constructor === Robot ->', unit.constructor === Robot) // the way back, at runtime

// ❌ error TS2576: Property 'factory' does not exist on type 'Robot'. Did you mean to access the static member 'Robot.factory' instead?
console.log('unit.factory (TS2576, runs anyway) ->', unit.factory) // undefined
