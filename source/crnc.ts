
export interface Rates {
	[key: string]: number
}

export interface ExchangeParams {
	value: number
	input: string
	output: string
	rates: Rates
}

function scrutinizeRate(rate: number) {
	if (rate === undefined || rate === null || isNaN(rate))
		throw new Error(`invalid rate "${rate}"`)
}

export function exchange({value, input, output, rates}: ExchangeParams): number {
	const inputRate = rates[input]
	const outputRate = rates[output]
	scrutinizeRate(inputRate)
	scrutinizeRate(outputRate)
	return value * (outputRate / inputRate)
}

export type CurrencyFormatter = (cents: number) => string

export interface FormatPriceTagParams {
	cents: number
	currency: string
	formatters?: { [key: string]: CurrencyFormatter }
	locale?: string
}

export function formatPriceTag({
	cents,
	currency,
	formatters,
	locale = undefined
}: FormatPriceTagParams): string {

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
		GBP: cents => `\£${centsToDollars(cents)} GBP`,
		XBT: cents => `\Ƀ${centsToBitcoins(cents)} XBT`
	})[currency]

	if (!formatter) throw new Error(`unknown formatter "${currency}"`)
	return formatter(cents)
}
