
import {CurrencyControl} from "../stores/currency-control"

/**
 * SHOPIFY CLIENT INTERFACE
 */
export type ShopifyClient = any

/**
 * SHOPIFY SDK SETTINGS INTERFACE
 */
export interface ShopifySettings {
	domain: string
	storefrontAccessToken: string
}

/**
 * SHOPIFY ADAPTER OPTIONS INTERFACE
 */
export interface ShopifyAdapterOptions {
	settings: ShopifySettings
	currencyControl: CurrencyControl
}
