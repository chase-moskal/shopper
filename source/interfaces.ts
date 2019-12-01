
import {Reader} from "./toolbox/pubsub.js"
import {ShopperComponent} from "./framework/shopper-component.js"

export type ShopperMock = null | "" | "mock" | "fail"

export interface ShopperConfig {
	mock: ShopperMock
	shopifyDomain: string
	shopifyStorefrontAccessToken: string
}

export interface ShopperAssembly extends ShopperConfig {
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
}

export interface ShopperGetters {
	readonly itemsInCart: CartItem[]
	readonly cartValue: number
	readonly cartPrice: string
	readonly cartQuantity: number
	getItemPrice(item: CartItem): string
}

export interface ShopperActions {
	addToCart(item: CartItem): void
	clearCart(): void
	checkout(options: {checkoutInSameWindow: boolean}): Promise<void>
	setError(message: string): void
	setShopifyResults(results: ShopifyResults): void
}

export interface ShopperModel {
	reader: Reader<ShopperState>
	getters: ShopperGetters
	actions: ShopperActions
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
