
import {CartItem} from "../stores/cart-item"
import {ShopifyClient} from "./shopify-adapter"
import {CheckoutMachineBase} from "../tools/checkout-machine-base"

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
