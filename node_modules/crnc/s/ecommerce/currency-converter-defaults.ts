
import {ConverterPersistence, ListenForStorageChange} from "../interfaces.js"

export const oneHour = 1000 * 60 * 60

export const defaultPersistenceStorageKeys: ConverterPersistence["storageKeys"]
	= Object.freeze({
		exchangeRatesCache: "crnc-exchange-rates-cache",
		currencyPreference: "crnc-currency-preference",
	})

export const defaultPersistence = (): ConverterPersistence => ({
	storage: window.localStorage,
	cacheLifespan: oneHour,
	storageKeys: defaultPersistenceStorageKeys,
})

export const defaultListenForStorageChange = (
	(persistence: ConverterPersistence): ListenForStorageChange =>
		({reloadCurrencyPreference}) =>
			window.addEventListener("storage", storageEvent => {

				const storageEventIsRelevant =
					storageEvent.storageArea === persistence.storage
					&& storageEvent.key === persistence.storageKeys.currencyPreference

				if (storageEventIsRelevant)
					reloadCurrencyPreference()
			})
)
