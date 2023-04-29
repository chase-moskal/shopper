
import {locale2} from "./locale2.js"

import {formatCurrency} from "./currency-tools/format-currency.js"
import {assumeUserCurrency} from "./ecommerce/assume-user-currency.js"
import {downloadExchangeRates} from "./currency-tools/download-exchange-rates.js"
import {ascertainEcommerceDetails} from "./ecommerce/ascertain-ecommerce-details.js"
import {convertAndFormatCurrency} from "./currency-tools/convert-and-format-currency.js"

; (<any>window).locale2 = locale2

async function crncDemo() {

	// define some arbitrary demo values
	const value = 123.45
	const inputCurrency = "CAD"
	const outputCurrency = "USD"
	const currencies = [inputCurrency, outputCurrency]

	// ecommerce experiment
	const {exchangeRates} = await ascertainEcommerceDetails({
		currencies,
		storeBaseCurrency: inputCurrency,
		userDisplayCurrency: assumeUserCurrency({currencies, fallback: inputCurrency}),
	})
	console.log(`crnc exchangeRates`, exchangeRates)

	// perform a currency conversion
	const result = convertAndFormatCurrency({
		exchangeRates,
		value,
		inputCurrency,
		outputCurrency,
	})

	// log the results to the console
	const start = formatCurrency({value, code: inputCurrency})
	console.log(`crnc demo: convert ${start.price} into ${result.price}`)
}

crncDemo()
