
import {Product} from "./product"
import {CurrencyControl} from "./currency-control"

/**
 * SHOPIFY SDK OPTIONS INTERFACE
 */
export interface ShopifyOptions {
	domain: string
	storefrontAccessToken: string
}

/**
 * SHOPPERMAN OPTIONS INTERFACE
 */
export interface ShoppermanOptions {
	shopify: ShopifyOptions
	currencyControl: CurrencyControl
}

/**
 * SHOPPERMAN CLASS
 * - launch shopify api requests
 */
export class Shopperman {
	private readonly shopify: ShopifyOptions
	private readonly currencyControl: CurrencyControl

	constructor(options: ShoppermanOptions) {
		Object.assign(this, options)
	}

	async getProductsInCollection(collectionId: string): Promise<Product[]> {
		return
	}
}
