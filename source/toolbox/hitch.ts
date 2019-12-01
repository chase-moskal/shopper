
export type Hitcher = () => void

const noop = () => {}

export function hitch<T extends (...args: any[]) => any>(
	handler: T,
	{before = noop, after = noop}: {before?: Hitcher; after?: Hitcher}
): T {
	return <T>((...args: any[]) => {
		before()
		const result = handler(...args)
		after()
		return result
	})
}
