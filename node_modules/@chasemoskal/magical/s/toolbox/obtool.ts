
export function obtool<Input extends {}>(input: Input) {
	return {

		map<OutputValue>(
				mapper: (value: Input[keyof Input], key: string) => OutputValue
			) {
			return <{[P in keyof Input]: OutputValue}>(
				Object.fromEntries(
					Object.entries<Input[keyof Input]>(input).map(
						([key, value]) => [key, mapper(value, key)]
					)
				)
			)
		},
	}
}
