
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
		baseCurrency,
		currencies = defaultCurrencies,
		currencyStorage = createCurrencyStorage({
			key: "price-display-currency",
			dataStore: new SimpleDataStore({storage: localStorage}),
		}),
	}: {
		baseCurrency: string
		currencies?: Currencies
		currencyStorage?: CurrencyStorage
	}) {

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

	const rememberedDisplayCurrency = await currencyStorage.load()

	const {
		exchangeRates,
		userDisplayCurrency,
	} = await ascertainEcommerceDetails({
		storeBaseCurrency: baseCurrency,
		userDisplayCurrency: rememberedDisplayCurrency
			|| assumeUserCurrency({fallback: baseCurrency}),
	})

	state.exchangeRates = exchangeRates
	state.outputCurrency = userDisplayCurrency
	update()

	return {
		refreshCurrencyStorage: async() => {
			const code = await currencyStorage.load()
			setCurrency(code)
		},
	}
}
