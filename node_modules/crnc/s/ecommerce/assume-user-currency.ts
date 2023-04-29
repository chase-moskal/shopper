
import {locale2} from "../locale2.js"
import {AssumeUserCurrencyParams} from "../interfaces.js"
import {isCurrencyAllowed} from "./is-currency-allowed.js"
import {currenciesByLocales as defaultCurrenciesToLocales} from "./currencies-by-locales.js"

/**
 * Assume what currency the user might want to see
 *  + guess is based on locale
 *  + if a currency doesn't exist for the given locale, fallback is used
 */
export function assumeUserCurrency({
		fallback,
		locale = locale2(),
		currencies,
		currenciesByLocales = defaultCurrenciesToLocales
	}: AssumeUserCurrencyParams): string {

	const currency = currenciesByLocales[locale.toLowerCase()] ?? fallback
	return isCurrencyAllowed(currency, currencies)
		? currency
		: fallback
}
