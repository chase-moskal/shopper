
export type ShopifyClient = any

export interface ShopifyAdapterOptions {
	domain: string
	storefrontAccessToken: string
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
