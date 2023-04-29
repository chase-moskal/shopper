
import {BasicStorage, JsonStorage} from "../interfaces.js"

export function jsonStorage(storage: BasicStorage): JsonStorage {
	return {

		getItem(key) {
			const data = storage.getItem(key)
			let value: any
			if (data) {
				try { value = JSON.parse(data) }
				catch (error) {}
			}
			return value
		},

		setItem(key, value) {
			storage.setItem(key, JSON.stringify(value))
		},

		removeItem(key) {
			storage.removeItem(key)
		},
	}
}
