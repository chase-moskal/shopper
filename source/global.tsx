
import {h} from "preact"
import * as crnc from "crnc"
import * as mobx from "mobx"
import * as shopperman from "."
import * as preact from "preact"
import * as commotion from "commotion"
import * as mobxPreact from "mobx-preact"

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

	const options = {
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
		checkoutInNewWindow: false
	}

	//
	// instances
	//

	const currencyControl = new shopperman.CurrencyControl(options.currency)
	const shopifyAdapter = new shopperman.ShopifyAdapter({
		settings: options.shopify,
		currencyControl
	})

	//
	// fetch products from shopify
	//

	const products = await shopifyAdapter.getProductsInCollection(options.collectionId)

	//
	// create cart model
	//

	const cart = new shopperman.Cart({
		currencyControl,
		itemCatalog: products.map(product =>
			new shopperman.CartItem({
				product,
				currencyControl,
				quantityMin: 1,
				quantityMax: 5
			}))
	})

	//
	// render components
	//

	preact.render(
		<div className="product-list">
			{products.map(product =>
				<shopperman.ProductDisplay {...{cart, product}}/>
			)}
		</div>,
		document.querySelector(".shopperman .product-area")
	)

	preact.render(
		<shopperman.CartSystem {...{
			cart,
			checkoutMachine: shopifyAdapter.checkoutMachine,
			checkoutInNewWindow: options.checkoutInNewWindow
		}}/>,
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
