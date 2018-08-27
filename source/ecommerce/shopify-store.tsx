
import {h} from "preact"
import * as preact from "preact"

import {Product} from "../stores/product"
import {ShopifyAdapter} from "../shopify"
import {ProductDisplay, CartSystem} from "../components"
import {CurrencyControl, Cart, CartItem} from "../stores"
import {EcommerceShopifyStoreOptions} from "./ecommerce-interfaces"

/**
 * Ecommerce shopify collection options
 * - load products from shopify
 * - install a fully featured cart system and ecommerce experience
 * - place products into specific dom elements
 */
export async function ecommerceShopifyStore(options: EcommerceShopifyStoreOptions) {

	//
	// spool up tools
	//

	// currency conversion control
	const currencyControl = new CurrencyControl(options.currency)

	// shopify adapter connects us to the shopify store
	const shopifyAdapter = new ShopifyAdapter({
		settings: options.shopify,
		currencyControl
	})

	//
	// load products
	//

	// start loading products from all collections
	const collectionsWithPromisedProducts = options.collections.map((details) => ({
		...details,
		products: shopifyAdapter.getProductsInCollection(details.collectionId)
	}))

	// wait for all products to finish loading
	const collections: {
		collectionId: string
		products: Product[]
		productsArea?: HTMLElement
	}[] = await Promise.all(
		collectionsWithPromisedProducts.map(
			details => details.products.then(products => ({
				...details,
				products
			}))
		)
	)

	// make catalog of products by combining all products into one array
	const products: Product[] = [].concat(...collections.map(({products}) => products))

	//
	// create cart model
	//

	const cart = new Cart({
		omniStorage: options.omniStorage,
		currencyControl,
		itemCatalog: products.map(product => {

			// run product evaluator
			const {
				quantityMin,
				quantityMax,
				precision,
				attributes
			} = options.evaluator(product)

			// set product properties
			product.setPrecision(precision)
			product.setAttributes(attributes)

			// create the cart item
			return new CartItem({
				product,
				currencyControl,
				quantityMin,
				quantityMax
			})
		})
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
			...options.cartSystem,
			cart,
			checkoutMachine: shopifyAdapter.checkoutMachine
		}}/>,
		options.cartArea
	)
}
