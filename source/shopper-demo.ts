
import {ShopperCart} from "./components/shopper-cart.js"
import {MockFailingShopifyAdapter, prepMockSlowShopifyAdapter} from "./ecommerce/shopify-adapter-mocks.js"

import "menutown"
import "./register-all.js"

const cart: ShopperCart = document.querySelector("shopper-cart")
const MockSlowShopifyAdapter = prepMockSlowShopifyAdapter({ms: 2 * 1000})
cart.shopifyAdapter = new MockSlowShopifyAdapter({domain: null, storefrontAccessToken: null})
