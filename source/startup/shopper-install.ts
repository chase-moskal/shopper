
import {
	currencies as defaultCurrencies
} from "crnc/dist/ecommerce/currencies.js"

import {parseConfig} from "./parse-config.js"
import {assembleModel} from "./assemble-model.js"
import {wireCartToMenuDisplay} from "./wire-cart-to-menu-display.js"

import {ShopperCart} from "../components/shopper-cart.js"
import {ShopperButton} from "../components/shopper-button.js"
import {ShopperProduct} from "../components/shopper-product.js"
import {ShopperCollection} from "../components/shopper-collection.js"

import {select} from "../toolbox/select.js"
import {SimpleDataStore} from "../toolbox/simple-data-store.js"
import {createCartStorage} from "../model/create-cart-storage.js"
import {createCurrencyStorage} from "../model/create-currency-storage.js"
import {installPriceDisplaySystem} from "./install-price-display-system.js"
import {dashify, registerComponents} from "../toolbox/register-components.js"
import {wireModelToComponents} from "../framework/wire-model-to-components.js"
import {
	CartStorage,
	ShopperConfig,
} from "../interfaces.js"
import {objectMap} from "../toolbox/object-map.js"
import {Currency, Currencies} from "crnc/dist/interfaces.js"

export type CurrencyStorage = any
export interface ShopperInstallOptions {
	config?: ShopperConfig
	cartStorage?: CartStorage
	currencyStorage?: CurrencyStorage
}

export async function shopperInstall({

	// parse shopper config
	config = parseConfig(select("shopper-config")),

	// cart storage mechanism
	cartStorage = createCartStorage({
		key: "shopper-cart",
		dataStore: new SimpleDataStore({storage: localStorage})
	}),

	// currency preference storage
	currencyStorage = createCurrencyStorage({
		key: "shopper-currency",
		dataStore: new SimpleDataStore({storage: localStorage})
	})

}: ShopperInstallOptions = {}) {
	const {ratesUrl, baseCurrency} = config

	// assemble the shopper model
	const {model, loadCatalog} = assembleModel({
		...config,
		cartStorage
	})

	// wire the model to the components, and register those components
	registerComponents({
		...wireModelToComponents(model, {
			ShopperCart,
			ShopperButton,
			ShopperProduct,
			ShopperCollection,
		}),
	})

	// figure out which available currencies are configured
	const currency: boolean = !!config.currencies
	const installCurrencyConversions = currency
		? async() => {
			const codes = config.currencies
				.split(",")
				.map(code => code.trim())
				.map(code => code.toUpperCase())
			const currencies: Currencies = {}
			for (const code of codes) {
				const currency = defaultCurrencies[code]
				if (!currency) throw new Error(`unknown currency "${code}"`)
				currencies[code] = defaultCurrencies[code]
			}
			await installPriceDisplaySystem({
				ratesUrl,
				currencies,
				baseCurrency,
				currencyStorage,
			})
		}
		: async() => {}

	// do a bunch of concurrent stuff
	await Promise.all([

		// begin loading the catalog from shopify
		loadCatalog()

			// specify how the cart interacts with the menu system
			.then(() => wireCartToMenuDisplay({
				cartSelector: dashify(ShopperCart.name)
			})),

		// download exchange rates and set up currency conversions
		installCurrencyConversions()
	])
}
