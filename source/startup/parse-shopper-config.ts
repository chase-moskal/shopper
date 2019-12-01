
import {ShopperConfig, ShopperMock} from "../interfaces.js"

export const parseShopperConfig = (element: HTMLElement): ShopperConfig => ({
	mock: <ShopperMock>element.getAttribute("mock"),
	shopifyDomain: element.getAttribute("shopify-domain"),
	shopifyStorefrontAccessToken: element.getAttribute("shopify-storefront-access-token"),
})
