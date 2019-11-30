
import {assembleShopper} from "./startup/assemble-shopper.js"
import {parseShopperConfig} from "./startup/parse-shopper-config.js"

import {ShopperCart} from "./components/shopper-cart.js"
import {ShopperButton} from "./components/shopper-button.js"

(async() => {
	const config = parseShopperConfig(document.querySelector("shopper-config"))

	const {shopifyAdapter, updateCatalog, updateError} = assembleShopper(config, {
		ShopperCart,
		ShopperButton,
	})

	try {
		updateCatalog(await shopifyAdapter.fetchEverything())
	}
	catch (error) {
		updateError("shopping cart error")
		console.error(error)
	}
})()
	.then(() => console.log("shopper initialized"))
	.catch(error => console.error("shopper failed to initialize", error))
