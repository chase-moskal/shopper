
import {Currencies} from "crnc/x/interfaces.js"
import {assumeUserCurrency} from "crnc/x/ecommerce/assume-user-currency.js"
import {currencies as defaultCurrencies} from "crnc/x/ecommerce/currencies.js"
import {ascertainEcommerceDetails} from "crnc/x/ecommerce/ascertain-ecommerce-details.js"

import {makeReader} from "../toolbox/pubsub.js"
import {SimpleDataStore} from "../toolbox/simple-data-store.js"
import {preparePriceDisplay} from "../components/price-display.js"
import {registerComponents} from "../toolbox/register-components.js"
import {createCurrencyStorage} from "../model/create-currency-storage.js"
import {CurrencyStorage, PriceModelState, SetCurrency} from "../interfaces.js"

export async function installPriceDisplaySystem({
		ratesUrl,
		baseCurrency,
		currencies = defaultCurrencies,
		currencyStorage = createCurrencyStorage({
			key: "price-display-currency",
			dataStore: new SimpleDataStore({storage: localStorage}),
		}),
	}: {
		baseCurrency: string
		ratesUrl?: string
		currencies?: Currencies
		currencyStorage?: CurrencyStorage
	}): Promise<void> {

	if (!baseCurrency) throw new Error("baseCurrency is not defined")
	baseCurrency = baseCurrency.toUpperCase()

	const state: PriceModelState = {
		exchangeRates: {[baseCurrency]: 1},
		inputCurrency: baseCurrency,
		outputCurrency: baseCurrency,
	}

	const {reader, update} = makeReader(state)

	const setCurrency: SetCurrency = (code: string) => {
		state.outputCurrency = code
		update()
		currencyStorage.save(code)
	}

	const PriceDisplay = preparePriceDisplay({
		state,
		reader,
		currencies,
		setCurrency,
	})

	registerComponents({PriceDisplay})

	try {
		const {
			exchangeRates,
			userDisplayCurrency,
		} = await ascertainEcommerceDetails({
			ratesUrl,
			storeBaseCurrency: baseCurrency,
			userDisplayCurrency: assumeUserCurrency({fallback: baseCurrency}),
		})
		state.exchangeRates = exchangeRates
		state.outputCurrency = (await currencyStorage.load()) || userDisplayCurrency
		update()
	}
	catch (error) {
		console.warn(`failed to download exchange rates via ratesUrl "${ratesUrl}"`)
	}
}
