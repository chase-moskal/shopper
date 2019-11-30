
import {ShopperConfig} from "../interfaces.js"

export const parseShopperConfig = (element: HTMLElement): ShopperConfig => ({
	mock: element.getAttribute("mock"),
	shopifyDomain: element.getAttribute("shopify-domain"),
	shopifyStorefrontAccessToken: element.getAttribute("shopify-storefront-access-token"),
})
