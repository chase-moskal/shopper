
import {CartItem} from "../stores/cart-item"
import {CheckoutMachineBase} from "../ecommerce/checkout-machine-base"

import {ShopifyClient} from "./shopify-interfaces"

export class ShopifyCheckoutMachine extends CheckoutMachineBase {
	private readonly shopifyClient: ShopifyClient

	constructor({shopifyClient}: {shopifyClient: ShopifyClient}) {
		super()
		this.shopifyClient = shopifyClient
	}

	async checkout(items: CartItem[]): Promise<string> {
		const {shopifyClient} = this
		const checkout = await shopifyClient.checkout.create({
			lineItems: items.map(item => ({
				variantId: item.product.id,
				quantity: item.quantity
			}))
		})
		return checkout.webUrl
	}
}
