
import {CartItem} from "../ecommerce/cart-item.js"
import {LitElement, html, property} from "lit-element"

export class ShopperProduct extends LitElement {
	@property({type: String}) ["uid"]: string
	@property({type: Object}) cartItem: CartItem
	@property({type: Boolean, reflect: true}) ["in-cart"]: boolean
	
	createRenderRoot() {
		return this
	}

	render() {
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
						@click=${() => cartItem.quantity = 1}
						?disabled=${inCart}>
							${inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
		`
	}
}
