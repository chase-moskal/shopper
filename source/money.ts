
export const enum Currency { CAD, USD }

const CurrencyExchangeRates = {
	[Currency.CAD]: 1.0,
	[Currency.USD]: 0.79
}

export function centsToDollars(cents: number): string {
	return (cents / 100).toFixed(2)
}

export function formatPriceTag(cents: number, currency: Currency) {
	switch (currency) {
		case Currency.CAD: return `\$${this.centsToDollars(cents)} CAD`
		case Currency.USD: return `\$${this.centsToDollars(cents * CurrencyExchangeRates[Currency.USD])} USD`
	}
}
