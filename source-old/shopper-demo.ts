
import "menutown"
import "./register-all.js"

import {ShopperCart} from "../source/components/shopper-cart.js"
import {MenuSystem} from "menutown/dist/components/menu-system.js"
import {MenuDisplay} from "menutown/dist/components/menu-display.js"
import {MockFailingShopifyAdapter, prepMockSlowShopifyAdapter} from "../source/ecommerce/shopify-adapter-mocks.js"

if (window.location.search.includes("fail")) {
	const cart: ShopperCart = document.querySelector("shopper-cart")
	const MockSlowShopifyAdapter = prepMockSlowShopifyAdapter({
		ShopifyAdapter: MockFailingShopifyAdapter,
		ms: 3 * 1000
	})
	cart.shopifyAdapter = new MockSlowShopifyAdapter({domain: null, storefrontAccessToken: null})
}

{
	const cart: ShopperCart = document.querySelector("shopper-cart")
	const menuSystem: MenuSystem = document.querySelector("menu-system")
	const menuDisplay: MenuDisplay = document.querySelector(".shopper-menu-display")

	cart.onAddToCart = () => {
		if (!menuSystem.active) menuDisplay.toggle()
	}

	window["cart"] = cart
}
