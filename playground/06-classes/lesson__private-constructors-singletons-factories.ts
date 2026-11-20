// Purpose: a `private` constructor forces callers through a static method; a `protected` one only lets subclasses `new`.
// Run: npm run playground lesson__private-constructors-singletons-factories
//
// The two ❌ lines below are INTENTIONAL type errors (TS2673, TS2674).
// The runner type-checks, reports them, then runs anyway, which shows that
// both checks are compile-time only: the JavaScript happily calls `new`.
export {}

class AppConfig {
  private static instance: AppConfig | undefined;
  private constructor(readonly env: string) {}

  static get(): AppConfig {
    return (AppConfig.instance ??= new AppConfig('prod'));
  }
}

console.log('AppConfig.get().env ->', AppConfig.get().env); // 'prod'
console.log('AppConfig.get() === AppConfig.get() ->', AppConfig.get() === AppConfig.get()); // always the same instance
// ❌ error TS2673: Constructor of class 'AppConfig' is private and only accessible within the class declaration.
const sneaky = new AppConfig('dev');
console.log('sneaky.env (TS2673, runs anyway) ->', sneaky.env);
console.log('sneaky === AppConfig.get() ->', sneaky === AppConfig.get()); // a second "singleton"

class Repository {
  protected constructor(readonly table: string) {}
}
class UserRepository extends Repository {
  constructor() {
    super('users'); // ✅ a subclass may call it
  }
}
console.log('new UserRepository().table ->', new UserRepository().table);
// ❌ error TS2674: Constructor of class 'Repository' is protected and only accessible within the class declaration.
const bare = new Repository('x');
console.log('bare.table (TS2674, runs anyway) ->', bare.table);

// A subclass may re-declare the constructor as public: the base's `protected`
// does not stop the child from opening the door again.
class UserRepository2 extends Repository {
  constructor(table: string) {
    super(table);
  }
}

const user_rep_2 = new UserRepository2('abc');
console.log('new UserRepository2(\'abc\') ->', user_rep_2);
