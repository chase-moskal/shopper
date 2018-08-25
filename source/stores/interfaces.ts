
import {OmniStorage} from "omnistorage"
import {CurrencyExchangeRates} from "crnc"

import {Product} from "./product"
import {CartItem} from "./cart-item"
import {CurrencyControl} from "./currency-control"

/**
 * CART OPTIONS INTERFACE
 */
export interface CartOptions {
	itemCatalog: CartItem[]
	currencyControl: CurrencyControl
	storageKey?: string
	omniStorage?: OmniStorage
}

/**
 * CART STORAGE DATA
 * - information to persist the cart item quantities
 * - should eventually store other info, such as product variant customizations
 */
export interface CartStorageData {
	[productId: string]: {
		quantity: number
	}
}

/**
 * CART ITEM OPTIONS INTERFACE
 */
export interface CartItemOptions {
	product: Product
	currencyControl: CurrencyControl
	quantityMin: number
	quantityMax: number
}

/**
 * CURRENCY CONTROL OPTIONS
 */
export interface CurrencyControlOptions {

	/** Currency in which to display monetary values */
	displayCurrency: string

	/** Ecommerce system base currency with which product values are expressed */
	baseCurrency: string

	/** Currency exchange rates used in currency conversions */
	exchangeRates: CurrencyExchangeRates

	/** Digits of precision after the decimal point (default 2) */
	precision?: number

	/** Locale with which to display monetary values (defaults to browser user
		preference) */
	locale?: string
}

/**
 * PRODUCT OPTIONS INTERFACE
 */
export interface ProductOptions {
	id: string
	title: string
	description: string
	value: number
	currencyControl: CurrencyControl
}
