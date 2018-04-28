
export type Currency = "USD" | "CAD" | "EUR" | "GBP"

export interface Rates {
	[key: string]: number
}

export const mockRates: Rates = {
	USD: 1.0,
	CAD: 2.0,
	EUR: 3.0,
	GBP: 4.0
}

export interface CurrencyExchangerOptions {
	rates: Rates
}

export interface ExchangeCurrencyParams {
	value: number
	input: string
	output: string
}

export interface ExchangeCurrencyResults {
	value: number
}

export interface CurrencyExchanger {
	rates: Rates
	exchangeCurrency(params: ExchangeCurrencyParams): ExchangeCurrencyResults
}

export class Exchanger implements CurrencyExchanger {
	rates: Rates

	constructor(options: CurrencyExchangerOptions) {
		this.rates = options.rates
	}

	exchangeCurrency({value: startValue, input, output}: {
		value: number
		input: string
		output: string
	}): {
		value: number
	} {
		const endValue = startValue
		return {value: endValue}
	}
}
