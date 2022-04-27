
import * as crnc from "crnc"
import {ShopperConfig} from "../interfaces.js"

export function setupCrnc(config: ShopperConfig) {

	const {baseCurrency, currencies} = crnc.parseConfig({
		baseCurrency: config.baseCurrency,
		currencies: config.currencies,
		errorLabel: "<shopper-config> error:",
	})

	try {
		const currencyConverter = crnc.makeCurrencyConverter({
			baseCurrency,
			currencies,
		})
		const components = crnc.prepareComponents({currencyConverter})
		return {currencyConverter, components}
	}
	catch (error) {
		error.message = `shopper startup error in crnc: ${error.message}`
		throw error
	}
}
