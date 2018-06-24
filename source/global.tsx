
import {h} from "preact"

import * as crnc from "crnc"
import * as mobx from "mobx"
import * as preact from "preact"
import * as commotion from "commotion"
import * as mobxPreact from "mobx-preact"

import * as shopperman from "."

window["crnc"] = crnc
window["mobx"] = mobx
window["preact"] = preact
window["commotion"] = commotion
window["mobxPreact"] = mobxPreact

window["shopperman"] = shopperman

//
// SHOPPERMAN DEMO
//

window["shoppermanDemo"] = async function() {
	mobx.configure({enforceActions: true})

	const shopify = {
		options: {
			domain: "dev-bakery.myshopify.com",
			storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25",
		},
		collectionId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="
	}

	// const cart = new Cart()
	// preact.render(<CartSystem {...{cart}}/>, document.querySelector(".shopperman"))
	// const currency = "CAD"

	// try {
	// 	const shopifyClient = shopifyBuy.buildClient(shopify.options)
	// 	const collection = await shopifyClient.collection.fetchWithProducts(shopify.collectionId)
	// 	for (const product of collection.products) {
	// 		cart.add(new CartItem({
	// 			id: product.id,
	// 			value: parseFloat(product.variants[0].price),
	// 			title: product.title,
	// 			currency
	// 		}))
	// 	}
	// }
	// catch (error) {
	// 	error.message = "shopify buy error: " + error
	// 	console.error(error)

	// 	cart.add(new CartItem({
	// 		id: "AE2468",
	// 		value: 10.82,
	// 		title: "Apple Pie",
	// 		currency
	// 	}))

	// 	cart.add(new CartItem({
	// 		id: "BC3682",
	// 		value: 3.41,
	// 		title: "Blueberry Muffin",
	// 		currency
	// 	}))
	// }
}

//
// CURRENCY CONVERSION TEST
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
