
export function objectMap<OutputValue = any, InputValue = any, Input extends {} = {}>(
		input: Input,
		mapper: (value: InputValue, key: string) => OutputValue
	): {[P in keyof Input]: OutputValue} {

	const output: any = {}

	for (const [key, value] of Object.entries<InputValue>(input))
		output[key] = mapper(value, key)

	return output
}
