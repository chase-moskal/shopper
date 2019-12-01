
export function objectMap<V = any, O extends {} = {}>(
	input: O,
	mapper: (value: any, key: string) => V
): {[P in keyof O]: V} {
	const output: any = {}
	for (const [key, value] of Object.entries(input))
		output[key] = mapper(value, key)
	return output
}
