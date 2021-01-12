
import {ShopperConfig, ShopperMock} from "../interfaces.js"

export const parseConfig = (element: HTMLElement): ShopperConfig => ({
	mock:
		<ShopperMock>element.getAttribute("mock"),

	shopifyDomain:
		element.getAttribute("shopify-domain"),

	shopifyStorefrontAccessToken:
		element.getAttribute("shopify-storefront-access-token"),

	ratesUrl:
		element.getAttribute("rates-url") || undefined,

	baseCurrency:
		element.getAttribute("base-currency") || undefined,

	currencies:
		element.getAttribute("currencies") || undefined,
})
