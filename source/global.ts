
import * as crnc from "crnc"
import * as mobx from "mobx"
import * as preact from "preact"
import * as commotion from "commotion"
import * as mobxPreact from "mobx-preact"
import * as omnistorage from "omnistorage"

import * as shopperman from "."
import {ecommerceShopifyStore} from "./ecommerce/shopify-store"

window["crnc"] = crnc
window["mobx"] = mobx
window["preact"] = preact
window["commotion"] = commotion
window["mobxPreact"] = mobxPreact
window["shopperman"] = shopperman

//
// SHOPPERMAN DEMO FUNCTION
//

window["shoppermanDemo"] = async function() {
	mobx.configure({enforceActions: true})
	await ecommerceShopifyStore({
		omniStorage: new omnistorage.LocalClient({storage: window.localStorage}),
		currency: await crnc.ascertainEcommerceDetails({
			storeBaseCurrency: "CAD",
			userDisplayCurrency: crnc.assumeUserCurrency({fallback: "CAD"})
		}),
		shopify: {
			domain: "dev-bakery.myshopify.com",
			storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25"
		},
		collections: [{
			collectionId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ==",
			productsArea: document.querySelector<HTMLElement>(".shopperman .products-area")
		}],
		cartArea: document.querySelector<HTMLElement>(".shopperman .cart-area"),
		cartSystem: {
			checkoutInNewWindow: false
		},
		quantifier: product => ({
			quantityMin: 1,
			quantityMax: 5
		})
	})
}
