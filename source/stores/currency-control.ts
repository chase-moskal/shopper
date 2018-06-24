
import {observable, action} from "mobx"
import {convertAndFormatCurrency} from "crnc"
import {CurrencyExchangeRates} from "crnc/dist/interfaces"

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
 * CURRENCY CONTROL CLASS
 * - contains observable currency property
 * - setter method can change the observable currency property
 */
export class CurrencyControl {

	/** Currency in which to display monetary values */
	@observable displayCurrency: string

	private readonly baseCurrency: string
	private readonly rates: CurrencyExchangeRates
	private readonly precision: number
	private readonly locale: string

	constructor(options: CurrencyControlOptions) {
		Object.assign(this, options)
	}

	/**
	 * Set display currency
	 */
	@action setDisplayCurrency(currency: string) {
		this.displayCurrency = currency
	}

	/**
	 * Convert and format
	 * - perform currency conversion
	 * - format number into user-facing price tag
	 */
	convertAndFormat(value): string {
		const {
			displayCurrency: output,
			baseCurrency: input,
			rates,
			precision,
			locale
		} = this
		return convertAndFormatCurrency({
			value,
			input,
			output,
			rates,
			precision,
			locale
		})
	}
}
