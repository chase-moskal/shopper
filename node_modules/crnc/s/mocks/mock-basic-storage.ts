
import {BasicStorage} from "../interfaces.js"

export function mockBasicStorage(): BasicStorage {
	const map = new Map<string, string>()
	return {
		getItem: key => map.get(key),
		setItem: (key, value) => map.set(key, value),
		removeItem: key => map.delete(key),
	}
}
