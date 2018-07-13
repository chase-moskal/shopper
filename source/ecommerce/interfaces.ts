
import {Product} from "../stores/product"
import {ShopifySettings} from "../shopify"
import {CurrencyControlOptions} from "../stores"

export interface InstallShopifyCollectionCartSystemOptions {
	currency: CurrencyControlOptions
	shopify: ShopifySettings
	collectionId: string
	cartSystem: {
		checkoutInNewWindow: boolean
	}
	renderTargets: {
		productsArea: HTMLElement
		cartArea: HTMLElement
	}
	quantifier: (product: Product) => {
		quantityMin: number
		quantityMax: number
	}
}
