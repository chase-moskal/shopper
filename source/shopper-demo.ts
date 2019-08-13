
import "menutown"
import "./register-all.js"

import {ShopperCart} from "./components/shopper-cart.js"
import {MockFailingShopifyAdapter, prepMockSlowShopifyAdapter} from "./ecommerce/shopify-adapter-mocks.js"

if (window.location.search.includes("fail")) {
	const cart: ShopperCart = document.querySelector("shopper-cart")
	const MockSlowShopifyAdapter = prepMockSlowShopifyAdapter({
		ShopifyAdapter: MockFailingShopifyAdapter,
		ms: 3 * 1000
	})
	cart.shopifyAdapter = new MockSlowShopifyAdapter({domain: null, storefrontAccessToken: null})
}
