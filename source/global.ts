
import * as crnc from "crnc"
import * as mobx from "mobx"
import * as shopperman from "."
import * as preact from "preact"
import * as commotion from "commotion"
import * as mobxPreact from "mobx-preact"

import {installShopifyCollectionCartSystem} from "./ecommerce/shopify-collection"

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

	//
	// basic settings
	//

	mobx.configure({enforceActions: true})

	installShopifyCollectionCartSystem({
		currency: {
			baseCurrency: "CAD",
			displayCurrency: "EUR",
			rates: (await crnc.downloadRates()).rates
		},
		shopify: {
			domain: "dev-bakery.myshopify.com",
			storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25"
		},
		collectionId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ==",
		cartSystem: {
			checkoutInNewWindow: false
		},
		quantifier: (product) => ({
			quantityMin: 1,
			quantityMax: 6
		}),
		renderTargets: {
			cartArea: document.querySelector<HTMLElement>(".shopperman .cart-area"),
			productsArea: document.querySelector<HTMLElement>(".shopperman .products-area")
		}
	})
}

//
// TEST CURRENCY EXCHANGE FUNCTION
//

window["shoppermanTestCurrencyExchange"] = async function() {
	const {rates} = await crnc.downloadRates()
	const converto = (value: number = 10.82) => {
		const input = "CAD"
		const outputs = ["CAD", "USD", "EUR", "GBP"]
		for (const output of outputs) console.log(
			crnc.convertAndFormatCurrency({value, input, output, rates})
		)
	}
	converto()
	return {converto}
}
