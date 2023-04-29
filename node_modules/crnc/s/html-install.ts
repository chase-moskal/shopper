
import {makeCurrencyConverter} from "./currency-converter.js"
import {parseConfig} from "./ecommerce/parse-config.js"
import {prepareComponents} from "./components/prepare-components.js"
import {registerComponents} from "./framework/utils/register-components.js"

void function htmlInstall() {

	const config = document.querySelector("crnc-config")

	if (!config)
		throw new Error("<crnc-config> element is required")

	const {baseCurrency, currencies} = parseConfig({
		baseCurrency: config.getAttribute("base-currency"),
		currencies: config.getAttribute("currencies"),
	})

	const currencyConverter = makeCurrencyConverter({
		baseCurrency,
		currencies,
	})

	registerComponents(prepareComponents({currencyConverter}))
}()
