
import {observable, action} from "mobx"
import {convertAndFormatCurrency} from "crnc"
import {CurrencyControlOptions} from "./interfaces"
import {CurrencyExchangeRates} from "crnc/dist/interfaces"

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
			rates,
			locale,
			precision,
			baseCurrency: input,
			displayCurrency: output
		} = this
		return convertAndFormatCurrency({
			value,
			input,
			rates,
			output,
			locale,
			precision
		})
	}
}
