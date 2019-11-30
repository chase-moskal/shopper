
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

export function assembleShopper(
	config: ShopperConfig,
	components: {[key: string]: typeof ShopperComponent}
) {

	const shopifyAdapter: ShopifyAdapter = config.mock !== null
		? new (prepSlowAdapter({
			ms: 2 * 1000,
			Adapter: config.mock === "fail"
				? MockFailingShopifyAdapter
				: MockPassingShopifyAdapter,
		}))
		: new ShopifyAdapter({
			domain: config.shopifyDomain,
			storefrontAccessToken: config.shopifyStorefrontAccessToken
		})

	const {model, updateCatalog, updateError} = createShopperModel()

	registerComponents(prepareShopperComponents(model, components))

	return {model, shopifyAdapter, updateCatalog, updateError}
}
