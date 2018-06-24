
import {Product} from "./product"
import {CurrencyControl} from "./currency-control"

/**
 * SHOPIFY SDK SETTINGS INTERFACE
 */
export interface ShopifySettings {
	domain: string
	storefrontAccessToken: string
}

/**
 * SHOPIFY ADAPTER OPTIONS INTERFACE
 */
export interface ShopifyAdapterOptions {
	shopify: ShopifySettings
	currencyControl: CurrencyControl
}

/**
 * SHOPIFY ADAPTER CLASS
 * - launch shopify api requests
 */
export class ShopifyAdapter {
	private readonly shopify: ShopifySettings
	private readonly currencyControl: CurrencyControl

	constructor(options: ShopifyAdapterOptions) {
		Object.assign(this, options)
	}

	async getProductsInCollection(collectionId: string): Promise<Product[]> {
		return
	}
}
