
import * as shopifyBuy from "shopify-buy"

import {ProductStore} from "../stores/product-store"
import {CurrencyControlStore} from "../stores/currency-control-store"
import {ShopifyCheckoutMachine} from "./shopify-checkout-machine"
import {
	ShopifyClient,
	ShopifySettings,
	ShopifyAdapterOptions
} from "./shopify-interfaces"

/**
 * Shopify adapter
 * - wrapper for the shopify buy sdk
 * - launch shopify api requests
 * - return results with instances of shopper typescript classes
 * - exposes a checkout machine which can be used by other components
 */
export class ShopifyAdapter {
	readonly checkoutMachine: ShopifyCheckoutMachine

	private readonly settings: ShopifySettings
	private readonly shopifyClient: ShopifyClient
	private readonly currencyControlStore: CurrencyControlStore

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
	async getProductsInCollection(collectionId: string): Promise<ProductStore[]> {
		const {shopifyClient, currencyControlStore} = this

		try {
			const collection = await shopifyClient.collection.fetchWithProducts(collectionId)
			const products: ProductStore[] = collection.products.map(info => new ProductStore({
				id: info.variants[0].id,
				value: parseFloat(info.variants[0].price),
				title: info.title,
				description: info.descriptionHtml,
				currencyControlStore
			}))
			return products
		}

		catch (error) {
			error.message = "shopify error: " + error
			throw error
		}
	}
}
