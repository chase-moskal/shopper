
import {parseConfig} from "./parse-config.js"
import {assembleModel} from "./assemble-model.js"
import {wireCartToMenuDisplay} from "./wire-cart-to-menu-display.js"

import {ShopperCart} from "../components/shopper-cart.js"
import {ShopperButton} from "../components/shopper-button.js"
import {ShopperProduct} from "../components/shopper-product.js"
import {ShopperCollection} from "../components/shopper-collection.js"
import {QuantityInput} from "../components/quantity-input/quantity-input.js"

import {select} from "../toolbox/select.js"
import {SimpleDataStore} from "../toolbox/simple-data-store.js"
import {preparePriceDisplay} from "../components/price-display.js"
import {createCartStorage} from "../model/create-cart-storage.js"
import {makeCurrencyConverter} from "crnc/x/currency-converter.js"
import {CartStorage, CurrencyStorage, ShopperConfig} from "../interfaces.js"
import {dashify, registerComponents} from "../toolbox/register-components.js"
import {wireModelToComponents} from "../framework/wire-model-to-components.js"

export interface ShopperInstallOptions {
	config?: ShopperConfig
	cartStorage?: CartStorage
}

export async function shopperInstall({

		// parse shopper config
		config = parseConfig(select("shopper-config")),

		// cart storage mechanism
		cartStorage = createCartStorage({
			key: "shopper-cart",
			dataStore: new SimpleDataStore({storage: localStorage})
		}),

	}: ShopperInstallOptions = {}) {

	// assemble the shopper model
	const {model, loadCatalog, refreshCartStorage} = assembleModel({
		...config,
		cartStorage
	})

	// listen for localstorage changes
	window.addEventListener("storage", refreshCartStorage)

	// wire the model to the components, and register those components
	registerComponents({
		QuantityInput,
		...wireModelToComponents(model, {
			ShopperCart,
			ShopperButton,
			ShopperProduct,
			ShopperCollection,
		}),
	})

	async function installPriceSystem() {
		const currencyConverter = await makeCurrencyConverter({
			baseCurrency: config.baseCurrency,
			currencies: config.currencies
				.split(",")
				.map(code => code.trim()),
		})
		const PriceDisplay = preparePriceDisplay(currencyConverter)
		registerComponents({PriceDisplay})
	}

	// do a bunch of concurrent stuff
	await Promise.all([

		// begin loading the catalog from shopify
		loadCatalog()

			// specify how the cart interacts with the menu system
			.then(() => wireCartToMenuDisplay({
				cartSelector: dashify(ShopperCart.name)
			})),

		// download exchange rates and set up currency conversions
		installPriceSystem()
	])
}
