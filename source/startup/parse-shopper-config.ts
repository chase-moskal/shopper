
import {ShopperConfig} from "../interfaces.js"

export const parseShopperConfig = (element: HTMLElement): ShopperConfig => ({
	shopifyDomain: element.getAttribute("shopify-domain"),
	shopifyStorefrontAccessToken: element.getAttribute("shopify-storefront-access-token"),
})
