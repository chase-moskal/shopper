
import {cache} from "../toolbox/cache.js"
import {downloadExchangeRates} from "../currency-tools/download-exchange-rates.js"
import {EcommerceDetails, AscertainEcommerceDetailsParams} from "../interfaces.js"

const oneHour = 1000 * 60 * 60

/**
 * Establish some ecommerce-related currency details
 *  - attempt to download rates, and upon failure, avoid currency conversions
 */
export async function ascertainEcommerceDetails({
	currencies,
	storeBaseCurrency,
	userDisplayCurrency,
	cacheLifespan = oneHour,
	cacheStorage = window.localStorage,
	cacheStorageKey = `crnc-download-cache`,
}: AscertainEcommerceDetailsParams): Promise<EcommerceDetails> {

	const downloadCache = cache({
		lifespan: cacheLifespan,
		storage: cacheStorage,
		storageKey: cacheStorageKey,
		load: async() => downloadExchangeRates({currencies}),
	})

	try {
		const {exchangeRates} = await downloadCache.read()
		const userDisplayCurrencyIsValid =
			Object.keys(exchangeRates).indexOf(userDisplayCurrency) !== -1
		if (!userDisplayCurrencyIsValid)
			console.warn(`userDisplayCurrency ${userDisplayCurrency} is not available. going with ${storeBaseCurrency} instead`)
		return {
			exchangeRates,
			storeBaseCurrency,
			userDisplayCurrency: userDisplayCurrencyIsValid
			? userDisplayCurrency
			: storeBaseCurrency,
		}
	}
	catch (error) {
		console.warn(`error loading currency exchange rates, now only using "${storeBaseCurrency}"`)
		const exchangeRates = {[storeBaseCurrency]: 1.0}
		return {
			exchangeRates,
			storeBaseCurrency,
			userDisplayCurrency: storeBaseCurrency
		}
	}
}
