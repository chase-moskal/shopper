
import {LitElement, html, css, property, svg} from "lit-element"

import {CartItem} from "../interfaces.js"
import {ShopperWrangler} from "../ecommerce/shopper-wrangler.js"

export class CartPanel extends LitElement {
	@property({type: Object}) shopperWrangler: ShopperWrangler

	static get styles() {
		return css`
			* {
				box-sizing: border-box;
			}
			:host {
				
			}
		`
	}

	private _renderCartTitle() {
		const {cartQuantitySum} = this.shopperWrangler
		return html`
			<h1>
				<span>Shopping Cart</span>
				<span>– ${
					cartQuantitySum === 0
						? "empty"
						: `${cartQuantitySum} item${cartQuantitySum === 1
							? ""
							: "s"}`
				}</span>
			</h1>
		`
	}

	private _renderCartItem(item: CartItem) {
		const handleRemoval = () => this.shopperWrangler.setQuantity(item, 0)
		const handleQuantityInputChange = (event: Event) => {
			const input = <HTMLInputElement>event.target
			let value = parseInt(input.value)
			if (value < item.quantityMin) value = item.quantityMin
			if (value > item.quantityMax) value = item.quantityMax
			input.value = value.toString()
			this.shopperWrangler.setQuantity(item, value ? value : 0)
		}
		return html`
			<li class="cart-item-display">
				<button
					class="item-remove-button"
					@click=${handleRemoval}
					title="Remove item">
						X
				</button>
				<input
					class="item-quantity"
					type="number"
					.value=${item.quantity}
					min=${item.quantityMin}
					max=${item.quantityMax}
					@change=${handleQuantityInputChange}
					@keyup=${handleQuantityInputChange}
					@mouseup=${handleQuantityInputChange}
					@click=${handleQuantityInputChange}
					@blur=${handleQuantityInputChange}
					/>
				<div class="item-title">${item.product.title}</div>
				<div class="item-price pricevalue">
					${this.shopperWrangler.getItemSubtotalPrice(item)}
				</div>
			</li>
		`
	}

	render() {
		if (!this.shopperWrangler) return html`-`
		const {itemsInCart} = this.shopperWrangler
		return html`
			<div class="cart-panel">
				${this._renderCartTitle()}
				<div class="cart-manipulator">
					<ol class="cart-item-list cart-grid">
						${itemsInCart.map(item => this._renderCartItem(item))}
					</ol>
				</div>
				<div class="cart-calculated-results"></div>
				<div class="cart-checkout"></div>
			</div>
		`
	}
}
