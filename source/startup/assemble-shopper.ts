
import {ShopperConfig} from "../interfaces.js"
import {createShopperModel} from "./create-shopper-model.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"
import {ShopperComponent} from "../framework/shopper-component.js"
import {registerComponents} from "../toolbox/register-components.js"
import {prepareShopperComponents} from "../framework/prepare-shopper-components.js"
import {
	prepSlowAdapter,
	MockFailingShopifyAdapter,
	MockPassingShopifyAdapter,
} from "../ecommerce/shopify-adapter-mocks.js"

export function assembleShopper({
	mock,
	components,
	shopifyDomain,
	shopifyStorefrontAccessToken,
}: ShopperConfig) {
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

	const {model, updateCatalog, updateError} = createShopperModel({
		shopifyAdapter
	})

	registerComponents(prepareShopperComponents(model, components))

	async function loadCatalog() {
		try {
			updateCatalog(await shopifyAdapter.fetchEverything())
		}
		catch (error) {
			updateError("shopping cart error")
			console.error(error)
		}
	}

	return {loadCatalog}
}
