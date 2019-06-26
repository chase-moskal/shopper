
import {CurrencyControlStore} from "../stores/currency-control-store"

/**
 * Shopify api client
 */
export type ShopifyClient = any

/**
 * Shopify's sdk settings
 */
export interface ShopifySettings {
	domain: string
	storefrontAccessToken: string
}

/**
 * Options for the shopper shopify adapter
 */
export interface ShopifyAdapterOptions {
	settings: ShopifySettings
	currencyControlStore: CurrencyControlStore
}
