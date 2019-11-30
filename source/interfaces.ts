
import {CartItem} from "./ecommerce/cart-item.js"
import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"

export type Constructor<T = {}> = new(...args: any[]) => T

export type ConstructorWithModel<T = {}> = {
	model: any
	new(...args: any[]): T
}

export interface ShopperConfig {
	mock: string
	shopifyDomain: string
	shopifyStorefrontAccessToken: string
}


export interface ShopperOptions {
	onUpdate: () => void
	shopifyAdapter: ShopifyAdapter
}

export interface ShopperModel {
	getCartValue: () => number
	getCartPrice: () => string
	getCartQuantity: () => number
	getItemsInCart: () => CartItem[]

	addToCart: (item: CartItem) => void
	clearCart: () => void
}

export type ShopifyClient = any

export interface ShopifyAdapterOptions {
	domain: string
	storefrontAccessToken: string
}

export interface ShopifyResults {
	products: Product[],
	collectionIds: string[]
}

export interface Product {
	id: string
	value: number
	title: string
	description: string
	collections: string[]
	firstVariantId: string
}

export interface CheckoutMachine {
	checkout(items: CartItem): Promise<string>
}
