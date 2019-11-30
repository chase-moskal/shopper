
import {CartItem} from "./ecommerce/cart-item.js"
import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"

export type Constructor<T = {}> = new(...args: any[]) => T

export type ConstructorWithModel<T = {}> = {
	model: any
	new(...args: any[]): T
}

export interface ShopperConfig {
	shopifyDomain: string
	shopifyStorefrontAccessToken: string
}

export interface ShopperOptions {
	shopifyAdapter: ShopifyAdapter
	onUpdate: () => void
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

// export interface CartPanelConnectOptions {
// 	cartButton?: ShopperButton
// 	shopifyAdapter: ShopifyAdapter
// }

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
