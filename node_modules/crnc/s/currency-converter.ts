
import {restricted, snapstate} from "@chasemoskal/snapstate"

import {locale2} from "./locale2.js"
import {formatCurrency} from "./currency-tools/format-currency.js"
import {isCurrencyAllowed} from "./ecommerce/is-currency-allowed.js"
import {assumeUserCurrency} from "./ecommerce/assume-user-currency.js"
import {currenciesByLocales} from "./ecommerce/currencies-by-locales.js"
import {getDetailsForCurrencies} from "./ecommerce/currencies-to-details.js"
import {validateConverterParams} from "./ecommerce/validate-converter-params.js"
import {convertAndFormatCurrency} from "./currency-tools/convert-and-format-currency.js"
import {currencyLibrary as defaultCurrencyLibrary} from "./ecommerce/currency-library.js"
import {rememberOrDownloadExchangeRates} from "./ecommerce/remember-or-download-exchange-rates.js"
import {defaultListenForStorageChange, defaultPersistence} from "./ecommerce/currency-converter-defaults.js"
import {downloadExchangeRates as defaultDownloadExchangeRates} from "./currency-tools/download-exchange-rates.js"
import {ConverterDisplayOptions, ConverterParams, CurrencyConverter, CurrencyExchangeRates, CurrencyLibrary} from "./interfaces.js"

const currencyLibrary: CurrencyLibrary = defaultCurrencyLibrary

export function makeCurrencyConverter({
		baseCurrency,
		currencies = [baseCurrency],
		locale = locale2(),
		persistence = defaultPersistence(),
		downloadExchangeRates = defaultDownloadExchangeRates,
		listenForStorageChange = defaultListenForStorageChange(persistence),
	}: ConverterParams): CurrencyConverter {

	const validated = validateConverterParams({baseCurrency, currencies, currencyLibrary})
	currencies = validated.currencies
	baseCurrency = validated.baseCurrency
	const isOnlyBaseCurrency = currencies.length === 1

	const snap = snapstate({
		currencyPreference: baseCurrency as string,
		exchangeRates: undefined as undefined | CurrencyExchangeRates,
	})

	let exchangeRatesDownload: Promise<void | CurrencyExchangeRates>
		= Promise.resolve()

	if (!isOnlyBaseCurrency) {
		exchangeRatesDownload = rememberOrDownloadExchangeRates({
				currencies,
				persistence,
				downloadExchangeRates,
			})
			.then(rates => snap.state.exchangeRates = rates)
			.catch(() => {})
	}

	function getAvailableCurrencies() {
		const {exchangeRates} = snap.state
		return exchangeRates
			? getDetailsForCurrencies(
				[baseCurrency, ...Object.keys(exchangeRates)],
				currencyLibrary
			)
			: getDetailsForCurrencies([baseCurrency], currencyLibrary)
	}

	function getTargetCurrency() {
		const {currencyPreference} = snap.state
		const preferenceIsAvailable = Object.keys(getAvailableCurrencies())
			.indexOf(currencyPreference) !== -1
		return preferenceIsAvailable
			? currencyPreference
			: baseCurrency
	}

	function updateLocalCurrencyPreference(code: string) {
		code = code
			? code.toUpperCase()
			: assumeUserCurrency({
				locale,
				currencies,
				currenciesByLocales,
				fallback: baseCurrency,
			})
		const display = isCurrencyAllowed(code, currencies)
			? code
			: baseCurrency
		snap.state.currencyPreference = display
	}

	const reloadCurrencyPreference = () => updateLocalCurrencyPreference(
		persistence.storage.getItem(persistence.storageKeys.currencyPreference)
	)

	reloadCurrencyPreference()
	listenForStorageChange({reloadCurrencyPreference})

	return {

		snap: restricted(snap),

		get exchangeRatesDownload() {
			return exchangeRatesDownload
		},

		get baseCurrency() {
			return baseCurrency
		},

		get currencyPreference() {
			return snap.readable.currencyPreference
		},

		get targetCurrency() {
			return getTargetCurrency()
		},

		get availableCurrencies() {
			return getAvailableCurrencies()
		},

		setCurrencyPreference(currency: string) {
			currency = currency.toUpperCase()
			updateLocalCurrencyPreference(currency)
			persistence.storage.setItem(
				persistence.storageKeys.currencyPreference,
				snap.state.currencyPreference,
			)
		},

		display(valueInBaseCurrency: number, {currency, precision = 2}: ConverterDisplayOptions = {}) {
			const {exchangeRates} = snap.state

			currency = currency
				? Object.keys(getAvailableCurrencies()).includes(currency)
					? currency
					: getTargetCurrency()
				: getTargetCurrency()

			const conversionMustHappen = baseCurrency !== currency

			return (conversionMustHappen && exchangeRates)
				? convertAndFormatCurrency({
					value: valueInBaseCurrency,
					locale,
					precision,
					exchangeRates,
					inputCurrency: baseCurrency,
					outputCurrency: currency,
				})
				: formatCurrency({
					locale,
					precision,
					currencyLibrary,
					code: baseCurrency,
					value: valueInBaseCurrency,
				})
		},
	}
}
