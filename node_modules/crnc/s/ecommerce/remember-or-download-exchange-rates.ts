
import {cache} from "../toolbox/cache.js"
import {ConverterPersistence, DownloadExchangeRates, CurrencyExchangeRates, DownloadExchangeRatesResults} from "../interfaces.js"

export async function rememberOrDownloadExchangeRates({
			currencies,
			persistence: {storage, storageKeys, cacheLifespan},
			downloadExchangeRates,
		}: {
		currencies: string[]
		persistence: ConverterPersistence
		downloadExchangeRates: DownloadExchangeRates
	}) {

	const ratesCache = cache({
		storage,
		lifespan: cacheLifespan,
		storageKey: storageKeys.exchangeRatesCache,
		load: async() => downloadExchangeRates({currencies}),
	})

	let results = await ratesCache.readCache()

	const shouldDownloadFreshResults = results
		? !ratesAreSufficient(results.exchangeRates, currencies)
		: true

	if (shouldDownloadFreshResults)
		results = await ratesCache.readFresh()

	const validAndSufficient = (
		results?.exchangeRates
		&& ratesAreSufficient(results.exchangeRates, currencies)
	)

	const exchangeRates = validAndSufficient
		? trimOffIrrelevantRates(results.exchangeRates, currencies)
		: undefined

	return exchangeRates
}

function ratesAreSufficient(rates: CurrencyExchangeRates, currencies: string[]) {
	const exchangeKeys = Object.keys(rates)
	const currenciesMissingInRates = currencies.filter(
		currency => exchangeKeys.indexOf(currency) === -1
	)
	return currenciesMissingInRates.length
		? false
		: true
}

function trimOffIrrelevantRates(rates: CurrencyExchangeRates, currencies: string[]) {
	const relevant: CurrencyExchangeRates = {}

	for (const code of currencies)
		relevant[code] = rates[code]

	return relevant
}
