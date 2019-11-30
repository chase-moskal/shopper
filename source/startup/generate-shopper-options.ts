
import {ShopperConfig, ShopperOptions} from "../interfaces.js"
import {ShopifyAdapter} from "../ecommerce/shopify-adapter.js"

export function generateShopperOptions({
	shopifyDomain,
	shopifyStorefrontAccessToken,
}: ShopperConfig): ShopperOptions {

	const shopifyAdapter = new ShopifyAdapter({
		domain: shopifyDomain,
		storefrontAccessToken: shopifyStorefrontAccessToken
	})

	function onUpdate() {
		// tell components to render
	}

	return {shopifyAdapter, onUpdate}
}
