
import * as shopifyBuy from "shopify-buy"

import {Product} from "../stores/product"
import {CurrencyControl} from "../stores/currency-control"
import {ShopifyCheckoutMachine} from "./shopify-checkout-machine"

export type ShopifyClient = any

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
 * - exposes a checkout machine which can be used by other components
 */
export class ShopifyAdapter {
	readonly checkoutMachine: ShopifyCheckoutMachine

	private readonly settings: ShopifySettings
	private readonly currencyControl: CurrencyControl
	private readonly shopifyClient: ShopifyClient

	constructor(options: ShopifyAdapterOptions) {
		Object.assign(this, options)
		const shopifyClient = shopifyBuy.buildClient(this.settings)
		this.checkoutMachine = new ShopifyCheckoutMachine({shopifyClient})
		this.shopifyClient = shopifyClient
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
				id: info.variants[0].id,
				value: parseFloat(info.variants[0].price),
				title: info.title,
				description: info.descriptionHtml,
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
