
import {LitElement, property, html} from "lit-element"

import {CartItem} from "../ecommerce/cart-item.js"

export class ShopperCollection extends LitElement {
	@property({type: String}) ["uid"]: string
	@property({type: Array}) cartItems: CartItem[] = []

	createRenderRoot() {
		return this
	}

	render() {
		return html`
			<ol>
				${this.cartItems.map(cartItem => html`
					<li>
						<shopper-product .cartItem=${cartItem}></shopper-product>
					</li>
				`)}
			</ol>
		`
	}
}
