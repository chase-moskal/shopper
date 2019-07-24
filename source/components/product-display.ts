
import {LitElement, html, css, property, svg} from "lit-element"

import {CartItem} from "../interfaces.js"
import {ShopperWrangler} from "../ecommerce/shopper-wrangler.js"

export class ProductDisplay extends LitElement {
	@property({type: Object}) cartItem: CartItem
	@property({type: Object}) shopperWrangler: ShopperWrangler

	connectedCallback() {
		super.connectedCallback()
		const {shopperWrangler} = this
		if (shopperWrangler)
			shopperWrangler.subscribeUpdates(() => this.requestUpdate())
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		const {shopperWrangler} = this
		if (shopperWrangler)
			shopperWrangler.unsubscribeUpdates(() => this.requestUpdate())
	}

	render() {
		const {itemsInCart} = this.shopperWrangler
		const inCart = !!itemsInCart.find(item => item === this.cartItem)
		return html`
			<div class="product-display">
				<h3 class="title">${this.cartItem.product.title}</h3>
				<div class="box">
					<div class="price">${this.shopperWrangler.getItemUnitPrice(this.cartItem)}</div>
					<button class="add-to-cart-button"
						title=${inCart ? undefined : "Add to Cart"}
						@click=${() => this.shopperWrangler.setQuantity(this.cartItem, 1)}
						?disabled=${inCart}>
							${inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
		`
	}
}
