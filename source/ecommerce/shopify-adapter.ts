
import shopifyBuy from "shopify-buy/index.es.js"

import {CartItem} from "../ecommerce/cart-item.js"

import {
	Product,
	ShopifyClient,
	ShopifyAdapterOptions
} from "../interfaces.js"

export interface ShopifyResults {
	products: Product[],
	collectionIds: string[]
}

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

	async fetchEverything(): Promise<ShopifyResults> {
		try {
			const collections = await this._shopifyClient.collection.fetchAllWithProducts()
			let products = []

			for (const collection of collections) {
				for (const shopifyProduct of collection.products) {
					const product = products.find(product => product.id === shopifyProduct.id)
	
					// if the product is already known, add the collection id
					if (product) {
						const existingCollectionId = product.collections.find(id => id === collection.id)
						if (!existingCollectionId) product.collections.push(collection.id)
					}
	
					// else, add the new product to the products array
					else {
						const product = this._shopifyProductToShopperProduct(
							shopifyProduct,
							collection.id
						)
						products.push(product)
					}
				}
			}

			return {
				products,
				collectionIds: collections.map(collection => collection.id)
			}
		}
		catch (error) {
			error.message = "shopify error" + error.message
			throw error
		}
	}

	private _shopifyProductToShopperProduct(shopifyProduct: any, collectionId?: string): Product {
		const [firstVariant] = shopifyProduct.variants
		return {
			id: shopifyProduct.id,
			value: parseFloat(firstVariant.price),
			title: shopifyProduct.title,
			description: shopifyProduct.descriptionHtml,
			collections: collectionId ? [collectionId] : [],
			firstVariantId: firstVariant.id
		}
	}

	async getProductsInCollection(collectionId: string): Promise<Product[]> {
		try {
			const collection = await this._shopifyClient
				.collection.fetchWithProducts(collectionId)

			const products = collection.products.map(
				(shopifyProduct: any) => this._shopifyProductToShopperProduct(
					shopifyProduct,
					collectionId
				)
			)

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
				variantId: item.product.firstVariantId,
				quantity: item.quantity
			}))
		})
		return checkout.webUrl
	}
}
