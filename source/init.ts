
import {provideModel} from "./framework/provide-model.js"
import {parseShopperConfig} from "./startup/parse-shopper-config.js"
import {createShopperModel} from "./startup/create-shopper-model.js"
import {generateShopperOptions} from "./startup/generate-shopper-options.js"

import {ShopperCart} from "./components/shopper-cart.js"
import {registerComponents} from "./toolbox/register-components.js"

;(async() => {
	const config = parseShopperConfig(document.querySelector("shopper-config"))
	const options = generateShopperOptions(config)
	const model = await createShopperModel(options)
	window["shopperModel"] = model

	registerComponents({
		ShopperCart: provideModel(model, ShopperCart)
	})
})()
	.then(() => console.log("shopper initialized"))
	.catch(error => console.error("shopper failed to initialize", error))
