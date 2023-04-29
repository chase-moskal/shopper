
export function isPlainObject(value: any) {
	if (typeof value !== "object" || value === null)
		return false
	const prototype = Object.getPrototypeOf(value)
	return prototype === Object.prototype || prototype === null
}
