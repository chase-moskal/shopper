
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
	@observable userDisplayCurrency: string

	private readonly locale: string
	private readonly precision: number
	private readonly storeBaseCurrency: string
	private readonly exchangeRates: CurrencyExchangeRates

	constructor(options: CurrencyControlOptions) {
		Object.assign(this, options)
	}

	/**
	 * Set display currency
	 */
	@action setUserDisplayCurrency(currency: string) {
		this.userDisplayCurrency = currency
	}

	/**
	 * Convert and format
	 * - perform currency conversion
	 * - format number into user-facing price tag
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
