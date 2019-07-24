
import {CartPanel} from "./components/cart-panel.js"
import {CartButton} from "./components/cart-button.js"
import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"

export interface ShopperSetup {
	cartPanel: CartPanel
	cartButton: CartButton
	collectionId: string
	shopifyAdapter: ShopifyAdapter
}

export type ShopifyClient = any

export interface ShopifyAdapterOptions {
	domain: string
	storefrontAccessToken: string
}

export interface ShopperWranglerOptions {
	shopifyAdapter: ShopifyAdapter
	cartPanel: CartPanel
	cartButton: CartButton
}

export interface CartPanelConnectOptions {
	cartButton?: CartButton
	shopifyAdapter: ShopifyAdapter
}

export interface Product {
	id: string
	value: number
	title: string
	description: string
}

export interface CartItem {
	product: Product
	quantity: number
	quantityMin: number
	quantityMax: number
}

export interface CheckoutMachine {
	checkout(items: CartItem): Promise<string>
}
