
import {CurrencyStorage} from "../interfaces.js"
import {DataStore} from "../toolbox/simple-data-store.js"

export function createCurrencyStorage({key, dataStore}: {
	key: string
	dataStore: DataStore
}): CurrencyStorage {

	let loaded = false

	return {
		async save(code: string) {
			if (!loaded) return null
			if (code) {
				const store = {code}
				await dataStore.setItem(key, JSON.stringify(store))
			}
			else {
				await dataStore.setItem(key, "")
			}
		},
		async load() {
			const raw = await dataStore.getItem(key)
			loaded = true
			if (!raw) return
			try {
				const {code} = JSON.parse(raw)
				return code
			}
			catch (error) {
				console.warn("shopper error loading stored currency preference", error)
			}
		},
	}
}
