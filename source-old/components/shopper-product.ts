
import {html, property} from "lit-element"

import {CartItem} from "../ecommerce/cart-item.js"
import {LoadableElement} from "./loadable-element.js.js"

export class ShopperProduct extends LoadableElement {
	@property({type: String}) ["uid"]: string
	@property({type: Object}) cartItem: CartItem
	@property({type: Boolean, reflect: true}) ["in-cart"]: boolean

	onAddToCart = ({cartItem}: {cartItem: CartItem}) => {}

	private _handleAddToCart = () => {
		const {cartItem} = this
		cartItem.quantity = 1
		this.onAddToCart({cartItem})
	}

	createRenderRoot() {
		return this
	}

	renderReady() {
		const {cartItem} = this
		const inCart = this["in-cart"]
		if (!cartItem) return html``
		return html`
			<div class="product-display">
				<h3 class="title">${this.cartItem.product.title}</h3>
				<div class="box">
					<div class="price">${cartItem.unitPrice}</div>
					<button class="add-to-cart-button"
						title=${inCart ? undefined : "Add to Cart"}
						@click=${this._handleAddToCart}
						?disabled=${inCart}>
							${inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
			<style>${LoadableElement.styles}</style>
		`
	}
}
