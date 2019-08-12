

import "menutown"
import "./register-all.js"

import {ShopperCart} from "./components/shopper-cart.js"
import {MockFailingShopifyAdapter, prepMockSlowShopifyAdapter} from "./ecommerce/shopify-adapter-mocks.js"
const cart: ShopperCart = document.querySelector("shopper-cart")
const MockSlowShopifyAdapter = prepMockSlowShopifyAdapter({
	ShopifyAdapter: MockFailingShopifyAdapter,
	ms: 6 * 1000
})
cart.shopifyAdapter = new MockSlowShopifyAdapter({domain: null, storefrontAccessToken: null})
