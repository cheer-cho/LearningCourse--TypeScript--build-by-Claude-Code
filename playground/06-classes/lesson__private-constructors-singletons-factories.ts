class AppConfig {
  private static instance: AppConfig | undefined;
  private constructor(readonly env: string) {}

  static get(): AppConfig {
    return (AppConfig.instance ??= new AppConfig('prod'));
  }
}

AppConfig.get().env; // 'prod' — always the same instance
// ❌ error TS2673: Constructor of class 'AppConfig' is private and only accessible within the class declaration.
new AppConfig('dev');

class Repository {
  protected constructor(readonly table: string) {}
}
class UserRepository extends Repository {
  constructor() {
    super('users'); // ✅ a subclass may call it
  }
}
new UserRepository();
// ❌ error TS2674: Constructor of class 'Repository' is protected and only accessible within the class declaration.
new Repository('x');

class UserRepository2 extends Repository {
  constructor(table: string) {
    super(table);
  }
}

const user_rep_2 = new UserRepository2('abc')
console.dir(user_rep_2);