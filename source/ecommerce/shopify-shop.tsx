
import {h} from "preact"
import * as preact from "preact"

import {ProductStore} from "../stores/product-store"
import {ShopifyAdapter} from "../shopify"
import {ProductDisplay, CartSystem} from "../components"
import {CurrencyControlStore, CartStore, CartItemStore} from "../stores"
import {EcommerceShopifyStoreOptions, ProductEvaluator, CollectionToLoad, Collection} from "./ecommerce-interfaces"
import { OmniStorage } from "omnistorage/dist";

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

/**
 * Load products from shopify and return product store instances
 */
async function loadProductsAndCollections({
	shopifyAdapter,
	collectionsToLoad
}: {
	shopifyAdapter: ShopifyAdapter
	collectionsToLoad: CollectionToLoad[]
}): Promise<{
	productStores: ProductStore[]
	collections: Collection[]
}> {

	// start loading products from all collections
	const collectionsWithPromisedProducts = collectionsToLoad.map((details) => ({
		...details,
		products: shopifyAdapter.getProductsInCollection(details.collectionId)
	}))

	// wait for all products to finish loading
	const collections: Collection[] = await Promise.all(
		collectionsWithPromisedProducts.map(
			details => details.products.then(products => ({
				...details,
				products
			}))
		)
	)

	// make catalog of products by combining all products into one array
	const productStores = [].concat(...collections.map(({products}) => products))

	return {productStores, collections}
}

/**
 * Create a cart model populated by cart items
 */
function createCartStore({productStores, evaluator, omniStorage, currencyControlStore}: {
	productStores: ProductStore[]
	omniStorage: OmniStorage
	evaluator: ProductEvaluator
	currencyControlStore: CurrencyControlStore
}) {
	return new CartStore({
		omniStorage,
		currencyControlStore,
		itemCatalog: productStores.map(productStore => {

			// run product evaluator
			const {
				quantityMin,
				quantityMax,
				precision,
				attributes
			} = evaluator(productStore)

			// set product properties
			productStore.setPrecision(precision)
			productStore.setAttributes(attributes)

			// create the cart item
			return new CartItemStore({
				productStore,
				currencyControlStore,
				quantityMin,
				quantityMax
			})
		})
	})
}
