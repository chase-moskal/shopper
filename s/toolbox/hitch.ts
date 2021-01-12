
export type Hitcher = () => void
export type AsyncHitcher = () => Promise<void>

const noop = () => {}
const anoop = async() => {}

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

export function asyncHitch<T extends (...args: any[]) => Promise<any>>(
	handler: T,
	{before = anoop, after = anoop}: {before?: AsyncHitcher; after?: AsyncHitcher}
): T {
	return <T>(async(...args: any[]) => {
		await before()
		const result = await handler(...args)
		await after()
		return result
	})
}
