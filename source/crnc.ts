
/*

crnc — currency conversions and formatting for the web

*/

import {requestJson} from "./commotion"

export interface CurrencyExchangeRates {
	[key: string]: number
}

/**
 * Download up-to-date currency exchange information from the internet
 * - returns 'updated', the date-string of the information
 * - return 'rates', dictionary of exchange rate values
 */
export async function downloadCurrencyExchangeRates(): Promise<{updated: string; rates: CurrencyExchangeRates}> {
	const {base, date, rates} = await requestJson({link: "https://exchangeratesapi.io/api/latest"})
	return {
		updated: date,
		rates: {...rates, [base]: 1.0}
	}
}

export interface ExchangeCurrencyValueParams {
	value: number
	input: string
	output: string
	rates: CurrencyExchangeRates
}

/**
 * Exchange monetary value from one currency into another
 * - returns a numeric value
 */
export function exchangeCurrency({value, input, output, rates}: ExchangeCurrencyValueParams): number {
	const inputRate = rates[input]
	const outputRate = rates[output]
	const scrutinizeRate = (rate: number) => {
		if (rate === undefined || rate === null || isNaN(rate))
			throw new Error(`invalid rate "${rate}"`)
	}
	scrutinizeRate(inputRate)
	scrutinizeRate(outputRate)
	return value * (outputRate / inputRate)
}

export type CurrencyFormatter = (cents: number) => string

export interface FormatCurrencyStringParams {
	cents: number
	currency: string
	formatters?: { [key: string]: CurrencyFormatter }
	locale?: string
}

/**
 * Express monetary value in human-readable format
 */
export function formatCurrency({
	cents,
	currency,
	formatters,
	locale = undefined
}: FormatCurrencyStringParams): string {

	const centsToDollars = (cents: number): string => (Math.ceil(cents) / 100)
		.toLocaleString(locale, {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2
		})

	const centsToBitcoins = (cents: number): string => (cents / 100)
		.toLocaleString(locale, {
			maximumFractionDigits: 8,
			minimumFractionDigits: 8
		})

	const formatter: CurrencyFormatter = (formatters || {
		CAD: cents => `\$${centsToDollars(cents)} CAD`,
		USD: cents => `\$${centsToDollars(cents)} USD`,
		EUR: cents => `\€${centsToDollars(cents)} EUR`,
		GBP: cents => `\£${centsToDollars(cents)} GBP`,
		XBT: cents => `\Ƀ${centsToBitcoins(cents)} XBT`
	})[currency]

	if (!formatter) throw new Error(`unknown formatter "${currency}"`)
	return formatter(cents)
}

/**
 * Exchange and format money in one shot
 */
export function exchangeAndFormatCurrency({cents, input, output, rates, locale = undefined}: {
	cents: number
	input: string
	output: string
	rates: CurrencyExchangeRates
	locale?: string
}): string {
	return formatCurrency({
		cents: exchangeCurrency({value: cents, input, output, rates}),
		currency: output,
		locale
	})
}
