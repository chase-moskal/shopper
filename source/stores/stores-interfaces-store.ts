
import {OmniStorage} from "omnistorage"
import {CurrencyExchangeRates} from "crnc"

import {ProductStore} from "./product-store"
import {CartItemStore} from "./cart-item-store"
import {CurrencyControlStore} from "./currency-control-store"

/**
 * Options for cart
 */
export interface CartStoreOptions {
	itemCatalog: CartItemStore[]
	currencyControlStore: CurrencyControlStore
	storageKey?: string
	omniStorage?: OmniStorage
}

/**
 * Data for cart storage
 * - information to persist the cart item quantities
 * - should eventually store other info, such as product variant customizations
 */
export interface CartStorageData {
	[productId: string]: {
		quantity: number
	}
}

/**
 * Options for cart item
 */
export interface CartItemStoreOptions {
	productStore: ProductStore
	currencyControlStore: CurrencyControlStore
	quantityMin: number
	quantityMax: number
}

/**
 * Options for currency control
 */
export interface CurrencyControlOptions {

	/** Currency in which to display monetary values */
	storeBaseCurrency: string

	/** Ecommerce system base currency with which product values are expressed */
	userDisplayCurrency: string

	/** Currency exchange rates used in currency conversions */
	exchangeRates: CurrencyExchangeRates

	/** Locale with which to display monetary values (defaults to browser user
		preference) */
	locale?: string

	/** Digits of precision after the decimal point (default 2) */
	precision?: number
}

/**
 * Attributes for an html element
 */
export interface ElementAttributes {
	[key: string]: string
}

/**
 * Options for a product
 */
export interface ProductStoreOptions {
	id: string
	title: string
	value: number
	description: string
	currencyControlStore: CurrencyControlStore
	precision?: number
	attributes?: ElementAttributes
}
