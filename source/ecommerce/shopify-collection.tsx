
import {h} from "preact"
import * as mobx from "mobx"
import * as preact from "preact"

import {ShopifyAdapter} from "../shopify"
import {ProductDisplay, CartSystem} from "../components"
import {CurrencyControl, Cart, CartItem} from "../stores"
import {EcommerceShopifyCollectionOptions} from "./interfaces"

/**
 * Ecommerce shopify collection options
 * - load products from shopify
 * - install a fully featured cart system and ecommerce experience
 */
export async function ecommerceShopifyCollection(options: EcommerceShopifyCollectionOptions) {

	//
	// instances
	//

	const currencyControl = new CurrencyControl(options.currency)
	const shopifyAdapter = new ShopifyAdapter({
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

	const cart = new Cart({
		currencyControl,
		itemCatalog: products.map(product => {
			const quantification = options.quantifier(product)
			return new CartItem({
				product,
				currencyControl,
				...quantification
			})
		})
	})

	//
	// render components
	//

	preact.render(
		<div className="product-list">
			{products.map(product =>
				<ProductDisplay {...{cart, product}}/>
			)}
		</div>,
		options.renderTargets.productsArea
	)

	preact.render(
		<CartSystem {...{
			...options.cartSystem,
			cart,
			checkoutMachine: shopifyAdapter.checkoutMachine
		}}/>,
		options.renderTargets.cartArea
	)
}
