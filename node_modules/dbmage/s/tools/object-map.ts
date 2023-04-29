
export function objectMap<OutputValue = any, InputValue = any, Input extends {} = {}>(
	input: Input,
	mapper: (value: InputValue, key: string) => OutputValue
): {[P in keyof Input]: OutputValue} {
	const output: any = {}
	for (const [key, value] of Object.entries<InputValue>(input))
		output[key] = mapper(value, key)
	return output
}

export function objectMap2<Input extends {}, Output extends {}>(
	input: Input,
	mapper: (value: any, key: string) => any
): Output {
	const output: any = {}
	for (const [key, value] of Object.entries(input))
		output[key] = mapper(value, key)
	return output
}

export function objectMap3<InputObject extends {}, OutputValue>(
		input: InputObject,
		mapper: (
			value: InputObject[keyof InputObject],
			key: string,
		) => OutputValue,
	) {
	return <{[P in keyof InputObject]: OutputValue}>(
		Object.fromEntries(
			Object.entries<InputObject[keyof InputObject]>(input).map(
				([key, value]) => [key, mapper(value, key)]
			)
		)
	)
}

export function objectTransform<I extends {}, O>(
		input: I,
		mapper: (entry: [string, I[keyof I]]) => [string, O],
	) {
	return <{[key: string]: O}>(
		Object.fromEntries(
			Object.entries(input).map(mapper)
		)
	)
}
