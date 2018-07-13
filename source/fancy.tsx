
import {h} from "preact"
import * as crnc from "crnc"
import * as mobx from "mobx"
import * as shopperman from "."
import * as preact from "preact"
import { CurrencyControlOptions } from "./stores"
import { ShopifySettings } from "./shopify"

export interface Shopperman1Options {
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
	quantifier: (product: shopperman.Product) => {
		quantityMin: number
		quantityMax: number
	}
}

//
// SHOPPERMAN DEMO FUNCTION
//

export async function shopperman1(options: Shopperman1Options) {

	//
	// basic settings
	//

	mobx.configure({enforceActions: true})

	//
	// instances
	//

	const currencyControl = new shopperman.CurrencyControl(options.currency)
	const shopifyAdapter = new shopperman.ShopifyAdapter({
		settings: options.shopify,
		currencyControl
	})

	//
	// fetch products from shopify
	//

	const products = await shopifyAdapter.getProductsInCollection(options.collectionId)

	//
	// create cart model
	//

	const cart = new shopperman.Cart({
		currencyControl,
		itemCatalog: products.map(product => {
			const quantification = options.quantifier(product)
			return new shopperman.CartItem({
				product,
				currencyControl,
				...quantification
			})
		})
	})

	//
	// render components
	//

	preact.render(
		<div className="product-list">
			{products.map(product =>
				<shopperman.ProductDisplay {...{cart, product}}/>
			)}
		</div>,
		options.renderTargets.productsArea
	)

	preact.render(
		<shopperman.CartSystem {...{
			cart,
			checkoutMachine: shopifyAdapter.checkoutMachine,
			checkoutInNewWindow: options.cartSystem.checkoutInNewWindow
		}}/>,
		options.renderTargets.cartArea
	)
}
