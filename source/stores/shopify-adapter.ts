
import {Product} from "./product"
import * as shopifyBuy from "shopify-buy"
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
	settings: ShopifySettings
	currencyControl: CurrencyControl
}

/**
 * SHOPIFY ADAPTER CLASS
 * - wrapper for the shopify buy sdk
 * - launch shopify api requests
 * - return results with instances of shopperman typescript classes
 */
export class ShopifyAdapter {
	private readonly settings: ShopifySettings
	private readonly currencyControl: CurrencyControl
	private readonly shopifyClient: any

	constructor(options: ShopifyAdapterOptions) {
		Object.assign(this, options)
		this.shopifyClient = shopifyBuy.buildClient(this.settings)
	}

	/**
	 * Get products in collection
	 * - return the products from a shopify collection
	 */
	async getProductsInCollection(collectionId: string): Promise<Product[]> {
		const {shopifyClient, currencyControl} = this

		try {
			const collection = await shopifyClient.collection.fetchWithProducts(collectionId)
			const products: Product[] = collection.products.map(info => new Product({
				id: info.id,
				value: parseFloat(info.variants[0].price),
				title: info.title,
				currencyControl
			}))
			return products
		}

		catch (error) {
			error.message = "shopify error: " + error
			throw error
		}
	}
}
