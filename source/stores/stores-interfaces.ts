
import {OmniStorage} from "omnistorage"
import {CurrencyExchangeRates} from "crnc"

import {Product} from "./product"
import {CartItem} from "./cart-item"
import {CurrencyControl} from "./currency-control"

/**
 * Options for cart
 */
export interface CartOptions {
	itemCatalog: CartItem[]
	currencyControl: CurrencyControl
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
export interface CartItemOptions {
	product: Product
	currencyControl: CurrencyControl
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
export interface ProductOptions {
	id: string
	title: string
	value: number
	description: string
	currencyControl: CurrencyControl
	precision?: number
	attributes?: ElementAttributes
}
