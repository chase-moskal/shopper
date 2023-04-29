export type Constructor<T extends {} = {}> = new (...args: any[]) => T;
export type Mixin<C extends Constructor, T extends {}> = new (...args: ConstructorParameters<C>) => InstanceType<C> & T;
