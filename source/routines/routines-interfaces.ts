
import {OmniStorage} from "omnistorage/dist"

import {CartText} from "../components/cart/cart-interfaces"
import {ShopifySettings} from "../shopify/shopify-interfaces"
import {CurrencyControlOptions} from "../stores/stores-interfaces-store"
import {ProductEvaluator, CollectionToLoad} from "../ecommerce/ecommerce-interfaces"

export interface CreateCartMenuAccountOptions {
	omniStorage: OmniStorage
	shopify: ShopifySettings
	evaluator: ProductEvaluator
	checkoutInNewWindow: boolean
	currency: CurrencyControlOptions
	collectionsToLoad: CollectionToLoad[]
	cartText?: CartText
}
