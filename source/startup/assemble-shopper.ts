
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"
import {CartItem, ShopperModel, ShopperConfig} from "../interfaces.js"

import {
	prepSlowAdapter,
	MockFailingShopifyAdapter,
	MockPassingShopifyAdapter,
} from "../ecommerce/shopify-adapter-mocks.js"

import {hitch} from "../toolbox/hitch.js"
import {makeReader} from "../toolbox/pubsub.js"
import {objectMap} from "../toolbox/object-map.js"
import {prepareActions} from "../model/prepare-actions.js"
import {prepareStateAndGetters} from "../model/prepare-state-and-getters.js"

export function assembleShopper({
	mock,
	shopifyDomain,
	shopifyStorefrontAccessToken,
}: ShopperConfig) {

	//
	// setup shopify adapter
	//

	const shopifyAdapter: ShopifyAdapter = mock !== null
		? new (prepSlowAdapter({
			ms: 2 * 1000,
			Adapter: mock === "fail"
				? MockFailingShopifyAdapter
				: MockPassingShopifyAdapter,
		}))
		: new ShopifyAdapter({
			domain: shopifyDomain,
			storefrontAccessToken: shopifyStorefrontAccessToken
		})
	const checkout = async(items: CartItem[]) => shopifyAdapter.checkout(items)

	//
	// create shopper model
	//

	const {state, getters} = prepareStateAndGetters()
	const {reader, update} = makeReader(state)
	const model: ShopperModel = {
		reader,
		getters,
		actions: objectMap(
			prepareActions({state, checkout, getters}),
			value => hitch(value, {after: update})
		)
	}

	//
	// return a function to begin loading the catalog
	//

	return {
		model,
		async loadCatalog() {
			try {
				model.actions.setShopifyResults(await shopifyAdapter.fetchEverything())
			}
			catch (error) {
				const message = "shopping cart error"
				model.actions.setError(message)
				error.message = `${message}: ${error.message}`
				console.error(error)
			}
		}
	}
}
