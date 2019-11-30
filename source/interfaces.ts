
import {Reader} from "./toolbox/pubsub.js"
import {ShopperComponent} from "./framework/shopper-component.js"

export interface ShopperConfig {
	mock: string
	shopifyDomain: string
	shopifyStorefrontAccessToken: string
	components: {[key: string]: typeof ShopperComponent}
}

export interface ShopperOptions extends ShopifyResults {
	catalog: CartItem[]
}

export interface CartItem {
	product: Product
	quantity: number
	quantityMin: number
	quantityMax: number
}

export interface ShopperState {
	error: string
	catalog: CartItem[]
	itemsInCart: CartItem[]
	cartValue: number
	cartPrice: string
	cartQuantity: number
}

export interface ShopperModel {
	reader: Reader<ShopperState>
	checkout: (options: {checkoutInSameWindow: boolean}) => Promise<void>
	clearCart: () => void
	addToCart: (item: CartItem) => void
	getItemPrice: (item: CartItem) => string
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
