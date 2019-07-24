
import "menutown"
import "./register-all.js"

import {ShopifyAdapter} from "./ecommerce/shopify-adapter.js"
import {ShopperWrangler} from "./ecommerce/shopper-wrangler.js"

async function main() {
	const shopperWrangler = new ShopperWrangler({
		cartPanel: document.querySelector("cart-panel"),
		cartButton: document.querySelector("cart-button"),
		shopifyAdapter: new ShopifyAdapter({
			domain: "dev-bakery.myshopify.com",
			storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25"
		})
	})
	await shopperWrangler.loadCatalog("Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ==")
	const list = shopperWrangler.generateProductList(shopperWrangler.itemCatalog)
	const productArea = document.querySelector(".product-area")
	productArea.appendChild(list)
	console.log({list, productArea})
	window["shopperWrangler"] = shopperWrangler
}

main()
	.then(() => console.log("🤖"))
	.catch(error => console.error(error))
