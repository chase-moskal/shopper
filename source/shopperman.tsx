
import {h} from "preact"

import * as crnc from "crnc"
import * as mobx from "mobx"
import * as preact from "preact"
import * as commotion from "commotion"
import * as mobxPreact from "mobx-preact"
import * as shopifyBuy from "shopify-buy"

import * as stores from "./stores"
import * as components from "./components"

window["mobx"] = mobx
window["preact"] = preact
window["mobxPreact"] = mobxPreact

window["crnc"] = crnc
window["commotion"] = commotion

window["shopperman"] = {
	stores,
	components,

	demo: async function() {
		const {CartSystem} = components
		const {Cart, CartItem} = stores

		const shopify = {
			options: {
				domain: "dev-bakery.myshopify.com",
				storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25",
			},
			collectionId: "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="
		}

		mobx.configure({enforceActions: true})

		const cart = new Cart()
		preact.render(<CartSystem {...{cart}}/>, document.querySelector(".shopperman"))
		const currency = "CAD"

		try {
			const shopifyClient = shopifyBuy.buildClient(shopify.options)
			const collection = await shopifyClient.collection.fetchWithProducts(shopify.collectionId)
			for (const product of collection.products) {
				cart.add(new CartItem({
					id: product.id,
					value: parseFloat(product.variants[0].price),
					title: product.title,
					currency
				}))
			}
		}
		catch (error) {
			error.message = "shopify buy error: " + error
			console.error(error)

			cart.add(new CartItem({
				id: "AE2468",
				value: 10.82,
				title: "Apple Pie",
				currency
			}))
	
			cart.add(new CartItem({
				id: "BC3682",
				value: 3.41,
				title: "Blueberry Muffin",
				currency
			}))
		}
	},

	testCurrencyExchange: async function() {
		const {updated, rates} = await crnc.downloadRates()
		const converto = (value: number = 10.82) => {
			const input = "CAD"
			console.log(crnc.convertAndFormatCurrency({value, input, output: "CAD", rates}))
			console.log(crnc.convertAndFormatCurrency({value, input, output: "USD", rates}))
			console.log(crnc.convertAndFormatCurrency({value, input, output: "EUR", rates}))
			console.log(crnc.convertAndFormatCurrency({value, input, output: "GBP", rates}))
		}
		converto()
		return {converto}
	}
}
