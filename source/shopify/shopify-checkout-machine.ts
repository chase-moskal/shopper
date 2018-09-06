
import {CartItemStore} from "../stores/cart-item-store"
import {CheckoutMachineBase} from "../ecommerce/checkout-machine-base"

import {ShopifyClient} from "./shopify-interfaces"

export class ShopifyCheckoutMachine extends CheckoutMachineBase {
	private readonly shopifyClient: ShopifyClient

	constructor({shopifyClient}: {shopifyClient: ShopifyClient}) {
		super()
		this.shopifyClient = shopifyClient
	}

	async checkout(items: CartItemStore[]): Promise<string> {
		const {shopifyClient} = this
		const checkout = await shopifyClient.checkout.create({
			lineItems: items.map(item => ({
				variantId: item.productStore.id,
				quantity: item.quantity
			}))
		})
		return checkout.webUrl
	}
}
