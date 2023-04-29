
import {requestXml} from "../toolbox/request-xml.js"
import {filterOutCurrenciesNotSupportedByBankOfCanada} from "./bank-of-canada/supported-currencies.js"
import {CurrencyExchangeRates, DownloadExchangeRatesParams, DownloadExchangeRatesResults} from "../interfaces.js"

/**
 * Download exchange rates
 * - from bank of canada valet service https://www.bankofcanada.ca/valet/docs
 */
export async function downloadExchangeRates({
		currencies,
	}: DownloadExchangeRatesParams): Promise<DownloadExchangeRatesResults> {

	currencies = filterOutCurrenciesNotSupportedByBankOfCanada(currencies)

	const canadian = "CAD"
	const nonCanadianOnly = (currency: string) => currency !== canadian
	const toBankOfCanadaSeries = (currency: string) => `FX${currency}${canadian}`
	const series = currencies
		.filter(nonCanadianOnly)
		.map(toBankOfCanadaSeries)
		.join(",")

	const url = `https://www.bankofcanada.ca/valet/fx_rss/${series}`
	const xml = await requestXml(url)

	const exchangeRateElements = Array.from(xml.querySelectorAll("exchangeRate"))
	const rawRates = exchangeRateElements.map(element => {
		const value = parseFloat(element.querySelector("value").textContent)
		const currency = element.querySelector("targetCurrency").textContent
		return {currency, value}
	})

	const exchangeRates: CurrencyExchangeRates = {}
	exchangeRates["CAD"] = 1.0
	for (const rate of rawRates)
		exchangeRates[rate.currency] = 1 / rate.value

	return {exchangeRates}
}
