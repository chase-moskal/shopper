
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
		const items = this.shopperWrangler.itemsInCart
		return html`
			<h1>
				<span>Shopping Cart</span>
				<span>– ${
					items.length === 0
						? "empty"
						: `${items.length} item${items.length === 1
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
			const value = parseInt(input.value)
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
					value=${item.quantity}
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
		const items = this.shopperWrangler.itemsInCart
		return html`
			<div class="cart-panel">
				${this._renderCartTitle()}
				<div class="cart-manipulator">
					<ol class="cart-item-list cart-grid">
						${items.map(item => this._renderCartItem(item))}
					</ol>
				</div>
				<div class="cart-calculated-results"></div>
				<div class="cart-checkout"></div>
			</div>
		`
	}
}
