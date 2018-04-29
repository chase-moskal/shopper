
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

export function centsToDollars(cents: number, locale: string): string {
	return (Math.ceil(cents) / 100).toLocaleString(locale, {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	})
}

export interface CurrencyFormatters {
	[key: string]: (cents: number, locale?: string) => string
}

const currencyFormatters: CurrencyFormatters = {
	CAD: (cents, locale) => `\$${centsToDollars(cents, locale)} CAD`,
	USD: (cents, locale) => `\$${centsToDollars(cents, locale)} USD`,
	GBP: (cents, locale) => `\£${centsToDollars(cents, locale)} GBP`,
	BTC: (cents, locale) => `\Ƀ${centsToDollars(cents, locale)} BTC`
}

export interface FormatPriceTagParams {
	cents: number
	currency: string
	locale?: string
	formatters?: CurrencyFormatters
}

export function formatPriceTag({
	cents,
	currency,
	locale = undefined,
	formatters = currencyFormatters
}: FormatPriceTagParams): string {
	const formatter = formatters[currency]
	if (!formatter) throw new Error(`unknown formatter "${currency}"`)
	return formatter(cents, locale)
}
