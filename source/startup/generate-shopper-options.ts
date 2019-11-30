
import {ShopperConfig, ShopperOptions} from "../interfaces.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"
import {
	prepSlowAdapter,
	MockPassingShopifyAdapter
} from "../ecommerce/shopify-adapter-mocks.js"

export function generateShopperOptions({
	mock,
	shopifyDomain,
	shopifyStorefrontAccessToken,
}: ShopperConfig): ShopperOptions {

	const useMock = mock !== null && mock !== undefined

	const shopifyAdapter: ShopifyAdapter = useMock
		? new (prepSlowAdapter({Adapter: MockPassingShopifyAdapter, ms: 1000}))
		: new ShopifyAdapter({
			domain: shopifyDomain,
			storefrontAccessToken: shopifyStorefrontAccessToken
		})

	if (useMock) console.log("using mock!")

	function onUpdate() {
		// tell components to render
	}

	return {shopifyAdapter, onUpdate}
}
