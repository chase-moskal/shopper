
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
// SHOPPERMAN DEMO FUNCTION
//

window["shoppermanDemo"] = async function() {

	//
	// basic settings
	//

	mobx.configure({enforceActions: true})
	const baseCurrency = "CAD"
	const displayCurrency = "USD"
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="
	const settings: shopperman.ShopifySettings = {
		domain: "dev-bakery.myshopify.com",
		storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25"
	}

	const {rates} = await crnc.downloadRates()

	//
	// create instances
	//

	const currencyControl = window["currencyControl"] = new shopperman.CurrencyControl({
		displayCurrency,
		baseCurrency,
		rates
	})

	const shopifyAdapter = new shopperman.ShopifyAdapter({
		settings,
		currencyControl
	})

	const cart = new shopperman.Cart({currencyControl})

	//
	// fetch products from shopify
	//

	const products = await shopifyAdapter.getProductsInCollection(collectionId)

	//
	// render product list
	//

	preact.render(
		<div className="product-list">
			{products.map(product =>
				<shopperman.ProductDisplay {...{product}}/>
			)}
		</div>,
		document.querySelector(".shopperman .product-area")
	)

	//
	// render cart system
	//

	preact.render(
		<shopperman.CartSystem {...{cart}}/>,
		document.querySelector(".shopperman .cart-area")
	)
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
