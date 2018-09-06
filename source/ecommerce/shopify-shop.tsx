
import {h} from "preact"
import * as preact from "preact"

import {ShopifyAdapter} from "../shopify"
import {CurrencyControlStore} from "../stores"
import {ProductDisplay, CartSystem} from "../components"

import {createCartStore} from "./helpers/create-cart-store"
import {loadProductsAndCollections} from "./helpers/load-products-and-collections"

import {EcommerceShopifyStoreOptions} from "./ecommerce-interfaces"

/**
 * Establish an ecommerce experience for a shopify shop
 * - load products from shopify
 * - install a fully featured cart system and ecommerce experience
 * - place products into specific dom elements, specified by `collectionsToLoad`
 */
export async function ecommerceShopifyShop({
	omniStorage,
	currency,
	shopify,
	cartArea,
	collectionsToLoad,
	cartSystem,
	evaluator
}: EcommerceShopifyStoreOptions) {

	// this currency control instance is passed around throughout shopper,
	// so that the whole system treats currencies in the same consistent manner
	const currencyControlStore = new CurrencyControlStore(currency)

	// shopify adapter connects us to the shopify store,
	// allowing the system to query for products and such
	const shopifyAdapter = new ShopifyAdapter({
		settings: shopify,
		currencyControlStore
	})

	// here we load up our collections and products from shopify
	const {productStores, collections} = await loadProductsAndCollections({
		shopifyAdapter,
		collectionsToLoad
	})

	// we create the cart store,
	// which also wraps the products into a cart item catalog
	const cart = createCartStore({
		productStores,
		evaluator,
		omniStorage,
		currencyControlStore
	})

	// lets render all of the products onto the page
	for (const {collectionId, productsArea, products} of collections) {
		preact.render(
			<div className="product-list" data-collection-id={collectionId}>
				{products.map(product =>
					<ProductDisplay {...{cart, product}}/>
				)}
			</div>,
			productsArea
		)
	}

	// here we render the cart system onto the page,
	// with the cart button and openable cart panel and all
	preact.render(
		<CartSystem {...{
			...cartSystem,
			cart,
			checkoutMachine: shopifyAdapter.checkoutMachine
		}}/>,
		cartArea
	)
}
