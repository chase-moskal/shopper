
import {Reader} from "./toolbox/pubsub.js"
import {ShopperComponent} from "./framework/shopper-component.js"

export type ShopperMock = null | "" | "mock" | "fail"

export interface ShopperConfig {
	mock: ShopperMock
	ratesUrl: string
	baseCurrency: string
	shopifyDomain: string
	shopifyStorefrontAccessToken: string
}

export interface ShopperAssemblyOptions extends ShopperConfig {
	cartStorage: CartStorage
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

export interface CartStorage {
	saveCart(catalog: CartItem[]): Promise<void>
	loadCart(catalog: CartItem[]): Promise<void>
}

export interface CartData {
	[productId: string]: {
		quantity: number
	}
}

export interface ShopperState {
	error: string
	catalog: CartItem[]
	checkedOut: boolean
	checkoutInProgress: boolean
}

export interface ShopperGetters {
	readonly itemsInCart: CartItem[]
	readonly cartValue: number
	readonly cartQuantity: number
	getUnitValue(item: CartItem): number
	getLineValue(item: CartItem): number
}

export interface ShopperActions {
	addToCart(item: CartItem): Promise<void>
	clearCart(): Promise<void>
	setItemQuantity(item: CartItem, quantity: number): Promise<void>
	checkout(options: {checkoutInSameWindow: boolean}): Promise<void>
	setError(message: string): Promise<void>
	setShopifyResults(results: ShopifyResults): Promise<void>
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
