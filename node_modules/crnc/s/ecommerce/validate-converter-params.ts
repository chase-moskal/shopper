
import {CurrencyLibrary} from "../interfaces.js"

export function validateConverterParams({
		baseCurrency, currencies, currencyLibrary
	}: {
		baseCurrency: string
		currencies: string[]
		currencyLibrary: CurrencyLibrary
	}) {

	baseCurrency = baseCurrency.toUpperCase()
	currencies = currencies.map(currency => currency.toUpperCase())
	currencies = [...new Set([baseCurrency, ...currencies])]

	const libraryKeys = Object.keys(currencyLibrary)
	const notInLibrary = currencies
		.filter(currency => libraryKeys.indexOf(currency) === -1)

	if (notInLibrary.length)
		throw new Error(`these currency codes are not in the currencyLibrary (${notInLibrary.join(", ")})`)

	return {baseCurrency, currencies}
}
