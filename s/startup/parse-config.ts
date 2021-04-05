
import {ShopperConfig, ShopperMock} from "../interfaces.js"

export const parseConfig = (element: HTMLElement): ShopperConfig => ({
	mock:
		<ShopperMock>element.getAttribute("mock"),

	shopifyDomain:
		element.getAttribute("shopify-domain"),

	shopifyStorefrontAccessToken:
		element.getAttribute("shopify-storefront-access-token"),

	baseCurrency:
		element.getAttribute("base-currency") || undefined,

	currencies:
		element.getAttribute("currencies") || undefined,

	defaultQuantityMax:
		parseInt(element.getAttribute("default-quantity-max") || "25"),
})
