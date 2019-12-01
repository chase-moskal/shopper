
import {DataStore} from "../toolbox/simple-data-store.js"
import {CartStorage, CartItem, CartData} from "../interfaces.js"

export function createCartStorage({key, dataStore}: {
	key: string
	dataStore: DataStore
}): CartStorage {

	let loaded = false

	return {
		async saveCart(catalog: CartItem[]) {
			if (!loaded) return
			const store: CartData = {}
			for (const {product, quantity} of catalog) {
				store[product.id] = {quantity}
			}
			await dataStore.setItem(key, JSON.stringify(store))
		},
		async loadCart(catalog: CartItem[]) {
			loaded = true
			const raw = await dataStore.getItem(key)
			if (!raw) return
			const store: CartData = JSON.parse(raw)
			for (const [uid, data] of Object.entries<any>(store)) {
				const {quantity} = data
				const item = catalog.find(item => item.product.id === uid)
				if (item) item.quantity = quantity
			}
		},
	}
}
