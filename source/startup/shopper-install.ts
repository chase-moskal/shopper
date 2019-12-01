
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
import {dashify, registerComponents} from "../toolbox/register-components.js"
import {wireModelToComponents} from "../framework/wire-model-to-components.js"

export async function shopperInstall() {

	// parse <shopper-config> element
	const config = parseConfig(select("shopper-config"))

	// assemble the shopper model
	const {model, loadCatalog} = assembleModel({
		...config,
		cartStorage: createCartStorage({
			key: "shopper-cart",
			dataStore: new SimpleDataStore({storage: window.localStorage})
		})
	})

	// wire the model to the components, and register those components
	registerComponents(wireModelToComponents(model, {
		ShopperCart,
		ShopperButton,
		ShopperProduct,
		ShopperCollection,
	}))

	// begin loading the catalog from shopify
	await loadCatalog()

	// specify how the cart interacts with the menu system
	wireCartToMenuDisplay({cartSelector: dashify(ShopperCart.name)})
}
