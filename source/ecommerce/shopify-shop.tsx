
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

	//
	// spool up tools
	//

	// currency conversion control
	const currencyControlStore = new CurrencyControlStore(currency)

	// shopify adapter connects us to the shopify store
	const shopifyAdapter = new ShopifyAdapter({
		settings: shopify,
		currencyControlStore
	})

	//
	// load product stores
	//

	const {productStores, collections} = await loadProductsAndCollections({
		shopifyAdapter,
		collectionsToLoad
	})

	//
	// create cart store
	//

	const cart = createCartStore({
		productStores,
		evaluator,
		omniStorage,
		currencyControlStore
	})

	//
	// render collection product areas
	//

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

	//
	// render the cart system
	//

	preact.render(
		<CartSystem {...{
			...cartSystem,
			cart,
			checkoutMachine: shopifyAdapter.checkoutMachine
		}}/>,
		cartArea
	)
}
