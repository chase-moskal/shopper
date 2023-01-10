
import {DataStore} from "../toolbox/simple-data-store.js"
import {CartStorage, CartItem, CartData} from "../interfaces.js"
import {shopifyUnknownToGid} from "../toolbox/shopify-ids/shopify-unknown-to-gid.js"

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
			try {
				const raw = await dataStore.getItem(key)
				loaded = true
				if (!raw) return
				const store: CartData = JSON.parse(raw)
				for (const [id, data] of Object.entries<any>(store)) {
					const gid = shopifyUnknownToGid(id)
					const item = catalog.find(item => item.product.id === gid)
					if (item)
						item.quantity = data.quantity
				}
			}
			catch (error) {
				console.error("error reading cart", error)
			}
		},
	}
}
