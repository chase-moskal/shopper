
import {Product} from "../interfaces.js"
import {ShopifyAdapter, ShopifyResults} from "./shopify-adapter.js"

export class MockPassingShopifyAdapter extends ShopifyAdapter {
	async fetchEverything(): Promise<ShopifyResults> {
		return {
			products: [],
			collectionIds: []
		}
	}
	async getProductsInCollection(): Promise<Product[]> {
		return []
	}
	async checkout(): Promise<string> {
		return "#"
	}
}

export class MockFailingShopifyAdapter extends ShopifyAdapter {
	async fetchEverything(): Promise<ShopifyResults> {
		throw new Error("mock failure")
	}
	async getProductsInCollection(): Promise<Product[]> {
		throw new Error("mock failure")
	}
	async checkout(): Promise<string> {
		throw new Error("mock failure")
	}
}

const sleep = (ms: number = 0) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const prepMockSlowShopifyAdapter: (opts: {ShopifyAdapter: typeof ShopifyAdapter; ms: number}) =>
 typeof ShopifyAdapter = ({ShopifyAdapter: A, ms = 10 * 1000}) =>

	class MockSlowShopifyAdapter extends A {
		async fetchEverything(): Promise<ShopifyResults> {
			await sleep(ms)
			return super.fetchEverything()
		}
		async getProductsInCollection(collectionId): Promise<Product[]> {
			await sleep(ms)
			return super.getProductsInCollection(collectionId)
		}
		async checkout(items): Promise<string> {
			await sleep(ms)
			return super.checkout(items)
		}
	}
