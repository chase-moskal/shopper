
import {ProductStore} from "../../stores/product-store"
import {ShopifyAdapter} from "../../shopify/shopify-adapter"
import {CollectionToLoad, Collection} from "../ecommerce-interfaces"

/**
 * Load products from shopify and return product store instances
 */
export async function loadProductsAndCollections({
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
