
import {h, render} from "preact"
import {MenuAccount} from "menutown"

import {CartStore} from "../stores/cart-store"
import {ShopifyAdapter} from "../shopify/shopify-adapter"
import {ProductList} from "../components/product-list"
import {CartPanel} from "../components/cart/panel/cart-panel"
import {CurrencyControlStore} from "../stores/currency-control-store"
import {createCartStore} from "../ecommerce/helpers/create-cart-store"
import {PerformCheckout} from "../components/cart/panel/panel-interfaces"
import {makeDefaultCartText} from "../components/cart/make-default-cart-text"
import {loadProductsAndCollections} from "../ecommerce/helpers/load-products-and-collections"

import {CreateCartMenuAccountOptions} from "./routines-interfaces"
import {CartButton} from "../components/cart/cart-button";

const defaultCartText = makeDefaultCartText()

export async function createCartMenuAccount({
	shopify,
	currency,
	evaluator,
	omniStorage,
	collectionsToLoad,
	checkoutInNewWindow,
	cartText = defaultCartText
}: CreateCartMenuAccountOptions): Promise<{
	cart: CartStore
	cartMenuAccount: MenuAccount
	shopifyAdapter: ShopifyAdapter
}> {
	const currencyControlStore = new CurrencyControlStore(currency)
	const shopifyAdapter = new ShopifyAdapter({
		settings: shopify,
		currencyControlStore
	})
	const {productStores, collections} = await loadProductsAndCollections({
		shopifyAdapter,
		collectionsToLoad
	})
	const cart = createCartStore({
		productStores,
		evaluator,
		omniStorage,
		currencyControlStore
	})

	for (const {collectionId, productsArea, products} of collections) {
		render(
			<ProductList {...{cart, collectionId, products}}/>,
			productsArea
		)
	}

	const {checkoutMachine} = shopifyAdapter
	const {cartPanelText} = cartText

	const performCheckout: PerformCheckout = async(): Promise<string> => {
		const checkoutLocation: Location = checkoutInNewWindow
			? window.open("", "_blank").location
			: window.location
		const checkoutUrl = await checkoutMachine.checkout(cart.activeItems)
		cart.clear()
		checkoutLocation.href = checkoutUrl
		return checkoutUrl
	}

	const cartMenuAccount: MenuAccount = {
		name: "cart",
		buttonContent: (
			<CartButton {...{cart}}/>
		),
		content: <CartPanel {...{cart, cartPanelText, performCheckout}}/>
	}

	return {cartMenuAccount, cart, shopifyAdapter}
}
