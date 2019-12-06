
import {DataStore} from "../toolbox/simple-data-store.js"
import {CurrencyStorage} from "../interfaces.js"

export function createCurrencyStorage({key, dataStore}: {
	key: string
	dataStore: DataStore
}): CurrencyStorage {

	let loaded = false

	return {
		async save(code: string) {
			if (!loaded) return null
			const store = {code}
			await dataStore.setItem(key, JSON.stringify(store))
		},
		async load() {
			const raw = await dataStore.getItem(key)
			loaded = true
			if (!raw) return
			const {code}  = JSON.parse(raw)
			return code
		},
	}
}

