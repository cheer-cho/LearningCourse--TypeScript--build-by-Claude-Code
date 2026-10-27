class Robot {
  static factory = 'Acme'
  constructor(public model: string) {}
}

const unit: Robot = new Robot('R2')          // instance side
const Ctor: typeof Robot = Robot             // static side (the constructor)
type RobotInstance = InstanceType<typeof Robot>   // Robot, recovered from the ctor
/**
 * 
    type RobotInstance = {
        model: string;
    }
 */

Ctor.factory                                 // 'Acme'
// ❌ error TS2339: Property 'factory' does not exist on type 'Robot'.
unit.factory
