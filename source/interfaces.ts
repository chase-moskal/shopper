
import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"

export interface ShopperConfig {
	mock: string
	shopifyDomain: string
	shopifyStorefrontAccessToken: string
}

export interface ShopperOptions {
	onUpdate: () => void
	shopifyAdapter: ShopifyAdapter
}

export interface CartItem {
	product: Product
	quantity: number
	quantityMin: number
	quantityMax: number
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
