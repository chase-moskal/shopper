
import {Product} from "./product"
import {CartItem} from "./cart-item"
import {CurrencyControl} from "./currency-control"
import {CurrencyExchangeRates} from "crnc/dist/interfaces"

/**
 * CART OPTIONS INTERFACE
 */
export interface CartOptions {
	itemCatalog: CartItem[]
	currencyControl: CurrencyControl
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
	rates: CurrencyExchangeRates

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
