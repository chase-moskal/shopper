
import {observable, action} from "mobx"
import {CurrencyControlOptions} from "./stores-interfaces"
import {convertAndFormatCurrency, CurrencyExchangeRates} from "crnc"

/**
 * Facility for exchanging and displaying monetary values
 * - observable user display currency can be changed
 */
export class CurrencyControl {

	/** Currency in which to display monetary values */
	@observable userDisplayCurrency: string

	private readonly locale: string
	private readonly precision: number
	private readonly storeBaseCurrency: string
	private readonly exchangeRates: CurrencyExchangeRates

	constructor(options: CurrencyControlOptions) {
		Object.assign(this, options)
	}

	/**
	 * Switch the current currency being displayed to the user
	 */
	@action setUserDisplayCurrency(currency: string) {
		this.userDisplayCurrency = currency
	}

	/**
	 * Perform currency conversion and format into a nice price tag
	 * - optionally provide a precision override
	 */
	convertAndFormat(value, precisionOverride?: number): string {
		const {
			locale,
			precision: standardPrecision,
			exchangeRates,
			storeBaseCurrency: inputCurrency,
			userDisplayCurrency: outputCurrency
		} = this
		const precision = (precisionOverride !== null && precisionOverride !== undefined)
			? precisionOverride
			: standardPrecision
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
