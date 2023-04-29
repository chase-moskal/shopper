
export type Await<P> = P extends Promise<infer Value>
	? Value
	: never

export type Constructor<T extends {} = {}> = new(...args: any[]) => T
