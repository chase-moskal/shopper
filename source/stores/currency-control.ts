
import {observable, action} from "mobx"
import {CurrencyControlOptions} from "./interfaces"
import {convertAndFormatCurrency, CurrencyExchangeRates} from "crnc"

/**
 * CURRENCY CONTROL CLASS
 * - contains observable currency property
 * - setter method can change the observable currency property
 */
export class CurrencyControl {

	/** Currency in which to display monetary values */
	@observable displayCurrency: string

	private readonly locale: string
	private readonly precision: number
	private readonly baseCurrency: string
	private readonly exchangeRates: CurrencyExchangeRates

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
			locale,
			precision,
			exchangeRates,
			baseCurrency: inputCurrency,
			displayCurrency: outputCurrency
		} = this
		return convertAndFormatCurrency({
			value,
			locale,
			precision,
			inputCurrency,
			exchangeRates,
			outputCurrency
		})
	}
}
