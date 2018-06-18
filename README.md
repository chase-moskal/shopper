
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

## ideal usage examples

- **establish some basic options**

	```tsx
	const options = {
		shopify: {
			apiKey: "abc123",
			domain: "dev-bakery.myshopify.com"
		},
		currency: "CAD"
	}
	```

- **display a product for sale**

	```tsx
	import {ShoppermanStore, ProductDisplay} from "shopperman"

	;(async() => {

		const shopperman = new ShoppermanStore(options)

		const products = await shopperman.getProductsInCollection("cde345")

		const productList = (
			<div className="product-list">
				{products.map(product =>
					<ProductDisplay {...{product}}/>
				)}
			</div>
		)

		preact.render(
			productList,
			productListArea: document.querySelector(".product-list-area")
		)

	})()
	```

## architecture

- **state structure**

	```
	Shopperman
		currencyControl: CurrencyControl
		getProductsInCollection(collectionId: string): Promise<Product[]>
		cart: Cart

	CurrencyControl
		currency: string
		setCurrency(currency: string)

	Cart
		currencyControl: CurrencyControl
		products: Product[]
		open: boolean
		toggle(open: boolean)
		clear()
		add(product: Product)

	Product
		currencyControl: CurrencyControl
		id: string
		value: number
		currency: string
		title: string
		quantity: number
		quantityMin: number
		quantityMax: number
		totalValue(): number
		price(): string
		totalPrice(): string
		setQuantity(quantity: number)
	```

- **components**

	```
	ProductDisplay {Product}

	CartSystem {Cart}
		CartButton {Cart}
		CartManipulator {Cart}
		CartItemDisplay {Product}
	```
