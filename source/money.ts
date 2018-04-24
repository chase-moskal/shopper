
export const enum Currency { CAD, USD }

export const CurrencyExchangeRates = {
	[Currency.CAD]: 1.0,
	[Currency.USD]: 0.79
}

export function requestXml({link}: {link: string}) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.onload = () => resolve(request.responseXML)
		request.onerror = event => reject(event.error)
		request.open("GET", link)
		request.send()
	})
}

export const defaultRates = {
	"USD": 1.2382,
	"JPY": 132.88,
	"BGN": 1.9558,
	"CZK": 25.327,
	"DKK": 7.4478,
	"GBP": 0.86975,
	"HUF": 310.37,
	"PLN": 4.1664,
	"RON": 4.6570,
	"SEK": 10.3778,
	"CHF": 1.1976,
	"ISK": 123.30,
	"NOK": 9.5825,
	"HRK": 7.4120,
	"RUB": 75.2875,
	"TRY": 4.9838,
	"AUD": 1.5892,
	"BRL": 4.1925,
	"CAD": 1.5606,
	"CNY": 7.7717,
	"HKD": 9.7182,
	"IDR": 17070.75,
	"ILS": 4.3437,
	"INR": 81.4580,
	"KRW": 1314.38,
	"MXN": 22.4668,
	"MYR": 4.8085,
	"NZD": 1.6938,
	"PHP": 64.432,
	"SGD": 1.6208,
	"THB": 38.644,
	"ZAR": 14.7813
}

export type Rates = typeof defaultRates

export class CurrencyExchanger {
	readonly rates: Rates

	constructor({rates = defaultRates}: {rates?: Rates}) {
		this.rates = rates
	}

	/**
	 * Update rates from the European Central Bank
	 * - they provide a free daily xml feed
	 */
	async updateRates() {
		const link = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
		const response = await requestXml({link})
		console.log("RATES", response)
	}
}

export function centsToDollars(cents: number): string {
	return (Math.ceil(cents) / 100).toFixed(2)
}

export function formatPriceTag(cents: number, currency: Currency) {
	const exchangeRate = CurrencyExchangeRates[currency]
	const value = this.centsToDollars(cents * exchangeRate)
	switch (currency) {
		case Currency.CAD: return `\$${value} CAD`
		case Currency.USD: return `\$${value} USD`
	}
}
