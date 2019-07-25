
import {CartItem} from "./ecommerce/cart-item.js"
import {ShopperButton} from "./components/shopper-button.js"
import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"

export type ShopifyClient = any

export interface ShopifyAdapterOptions {
	domain: string
	storefrontAccessToken: string
}

export interface CartPanelConnectOptions {
	cartButton?: ShopperButton
	shopifyAdapter: ShopifyAdapter
}

export interface Product {
	id: string
	value: number
	title: string
	description: string
	collections: string[]
}

export interface CheckoutMachine {
	checkout(items: CartItem): Promise<string>
}
