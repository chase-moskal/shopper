
import {assembleShopper} from "./startup/assemble-shopper.js"
import {parseShopperConfig} from "./startup/parse-shopper-config.js"

import {ShopperCart} from "./components/shopper-cart.js"
import {ShopperButton} from "./components/shopper-button.js"
import {ShopperProduct} from "./components/shopper-product.js"
import {ShopperCollection} from "./components/shopper-collection.js"

(async() => {
	const config = parseShopperConfig(document.querySelector("shopper-config"))

	const {loadCatalog} = assembleShopper({
		...config,
		components: {
			ShopperCart,
			ShopperButton,
			ShopperProduct,
			ShopperCollection,
		}
	})

	await loadCatalog()
})()
	.then(() => console.log("shopper initialized"))
	.catch(error => console.error("shopper failed to initialize", error))
