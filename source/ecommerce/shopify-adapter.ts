
import shopifyBuy from "shopify-buy/index.es.js"
import {
	Product,
	CartItem,
	ShopifyClient,
	ShopifyAdapterOptions
} from "../interfaces.js"

/**
 * Shopify adapter
 * - wrapper for the shopify buy sdk
 * - exposes methods for making calls to shopify
 * - exposes a checkout machine which can be used by other components
 */
export class ShopifyAdapter {
	private _shopifyClient: ShopifyClient

	constructor({domain, storefrontAccessToken}: ShopifyAdapterOptions) {
		this._shopifyClient = shopifyBuy.buildClient({
			domain,
			storefrontAccessToken
		})
	}

	async getProductsInCollection(collectionId: string): Promise<Product[]> {
		try {
			const collection = await this._shopifyClient
				.collection.fetchWithProducts(collectionId)

			const products = collection.products.map(info => ({
				id: info.variants[0].id,
				value: parseFloat(info.variants[0].price),
				title: info.title,
				description: info.descriptionHtml
			}))

			return products
		}
		catch (error) {
			error.message = "shopify error" + error.message
			throw error
		}
	}

	async checkout(items: CartItem[]): Promise<string> {
		const checkout = await this._shopifyClient.checkout.create({
			lineItems: items.map(item => ({
				variantId: item.product.id,
				quantity: item.quantity
			}))
		})
		return checkout.webUrl
	}
}
