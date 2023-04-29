
export function clone<X>(x: X): X {
	return JSON.parse(JSON.stringify(x))
}
