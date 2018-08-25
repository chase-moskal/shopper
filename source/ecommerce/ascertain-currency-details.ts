
import * as crnc from "crnc"
import {CurrencyControlOptions} from "../stores"
import {AscertainCurrencyDetailsParams} from "./interfaces"

export const getLocale = (): string => (
	navigator.language
		|| navigator["browserLanguage"]
		|| (navigator.languages || ["en"])[0]
	).toLowerCase()

const localesToCurrencies = {
	"en-ca": "CAD",
	"fr-ca": "CAD",
	"en-us": "USD",
	"en-gb": "GBP"
}

const getLocalCurrency = (locale: string, fallback: string): string =>
	localesToCurrencies[locale] || fallback

/**
 * Establish currency options by attempting to download rates
 * - if rates fail to download, the base currency will be used as a fallback
 */
export async function ascertainCurrencyDetails({
	ratesLink,
	baseCurrency,
	locale = getLocale()
}: AscertainCurrencyDetailsParams): Promise<CurrencyControlOptions> {
	try {
		const {exchangeRates} = await crnc.downloadExchangeRates({link: ratesLink})
		return {
			baseCurrency,
			exchangeRates,
			displayCurrency: getLocalCurrency(locale, baseCurrency)
		}
	}
	catch (error) {
		console.warn(`error loading currency exchange rates, now only using "${baseCurrency}"`)
		return {
			baseCurrency,
			displayCurrency: baseCurrency,
			exchangeRates: {[baseCurrency]: 1.0}
		}
	}
}
