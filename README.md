
# **shopperman** <br/> <em><small>cart ui for custom shopify frontends</small></em>

## basics

- frontend tech to implement custom shopify stores
- preact components, mobx stores, some scss

## goals

- **display a product for sale on a web page**
	- *buy now* button
	- *add to cart* button

- **cart system**
	- add and remove products from cart
	- ui to change item quantities
	- big green checkout button

- **currency conversion system**
	- currency switcher ui can be placed within cart
	- all prices on the site can flip currency based on one control

- **all state is kept in localstorage**
	- info like cart items, currency, is tracked
	- if you leave the page, and return, state is maintained
	- if you have multiple tabs open, all cart instances should auto-synchronize in realtime

## example usage

```tsx
;(async() => {

	import * as crnc from "crnc"
	import * as preact from "preact"
	import * as shopperman from "shopperman"

	// basic settings
	const baseCurrency = "CAD"
	const displayCurrency = "USD"
	const {rates} = await crnc.downloadRates()
	const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzQyNDQ0MTQ3OQ=="
	const shopify = {
		domain: "dev-bakery.myshopify.com",
		storefrontAccessToken: "5f636be6b04aeb2a7b96fe9306386f25"
	}

	// currency control instance
	const currencyControl = new shopperman.CurrencyControl({
		displayCurrency,
		baseCurrency,
		rates
	})

	// cart instance
	const cart = new shopperman.Cart({currencyControl})

	// shopify adapter instance
	const shopifyAdapter = new shopperman.ShopifyAdapter({
		shopify,
		currencyControl
	})

	// fetch products from shopify
	const products = await shopifyAdapter.getProductsInCollection(collectionId)

	// product listing preact component
	const productList = (
		<div className="product-list">
			{products.map(product =>
				<ProductDisplay {...{product}}/>
			)}
		</div>
	)

	// render preact component
	preact.render(
		productList,
		productListArea: document.querySelector(".product-list-area")
	)

})
```

## security notes

- **dangerouslySetInnerHtml with shopify product descriptions**

	html from the shopify api (product descriptions) is injected without
	sanitization

	this should be safe, so long as the connection to shopify is secured via https
