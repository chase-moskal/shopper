
import {assembleShopper} from "./assemble-shopper.js"
import {parseShopperConfig} from "./parse-shopper-config.js"
import {wireCartToMenuDisplay} from "./wire-cart-to-menu-display.js"

import {ShopperCart} from "../components/shopper-cart.js"
import {ShopperButton} from "../components/shopper-button.js"
import {ShopperProduct} from "../components/shopper-product.js"
import {ShopperCollection} from "../components/shopper-collection.js"

import {select} from "../toolbox/select.js"
import {dashify, registerComponents} from "../toolbox/register-components.js"
import {wireModelToComponents} from "../framework/wire-model-to-components.js"

export async function shopperInstall() {

	// parse <shopper-config> element
	const config = parseShopperConfig(select("shopper-config"))

	// assemble the shopper model
	const {model, loadCatalog} = assembleShopper(config)

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
