
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

const sleep = (ms: number = 0) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const prepMockSlowShopifyAdapter: (opts: {ms: number}) =>
	typeof MockPassingShopifyAdapter = ({ms = 10 * 1000}) =>

	class MockSlowShopifyAdapter extends MockPassingShopifyAdapter {
		async fetchEverything(): Promise<ShopifyResults> {
			await sleep(ms)
			return super.fetchEverything()
		}
		async getProductsInCollection(): Promise<Product[]> {
			await sleep(ms)
			return super.getProductsInCollection()
		}
		async checkout(): Promise<string> {
			await sleep(ms)
			return super.checkout()
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
