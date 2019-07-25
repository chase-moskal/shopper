
import {LitElement, html, css, property, svg} from "lit-element"

import {ShopperCart} from "./shopper-cart.js"
import {CartItem} from "../ecommerce/cart-item.js"

export class ShopperProduct extends LitElement {
	@property({type: Object}) cart: ShopperCart
	@property({type: Object}) cartItem: CartItem

	connectedCallback() {
		super.connectedCallback()
		const {cart} = this
		if (cart) cart.subscribeUpdates(() => this.requestUpdate())
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		const {cart} = this
		if (cart) cart.unsubscribeUpdates(() => this.requestUpdate())
	}

	render() {
		const {cartItem} = this
		const {itemsInCart} = this.cart
		const inCart = !!itemsInCart.find(item => item === this.cartItem)
		return html`
			<div class="product-display">
				<h3 class="title">${this.cartItem.product.title}</h3>
				<div class="box">
					<div class="price">${cartItem.unitPrice}</div>
					<button class="add-to-cart-button"
						title=${inCart ? undefined : "Add to Cart"}
						@click=${() => cartItem.quantity = 1}
						?disabled=${inCart}>
							${inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
		`
	}
}
