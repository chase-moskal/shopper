
import {html, property, svg} from "lit-element"

import {LightDom} from "../framework/light-dom.js"
import {ShopperState, ShopperModel, CartItem} from "../interfaces.js"
import {
	LoadableState,
	LoadableComponent,
} from "../framework/loadable-component.js"

import {shopperCartStyles} from "./shopper-cart-styles.js"

export class ShopperCart extends LightDom(LoadableComponent) {
	static get styles() {return [...super.styles, shopperCartStyles]}
	@property({type: Boolean}) ["checkout-in-same-window"]: boolean

	onFirstAdd = () => {}
	private _lastQuantity = 0

	shopperUpdate(state: ShopperState, {getters}: ShopperModel) {

		// trigger callback when quantity goes from 0 to 1
		const quantity = getters.cartQuantity
		const {_lastQuantity} = this
		if (_lastQuantity === 0 && quantity === 1) this.onFirstAdd()
		this._lastQuantity = quantity

		// set loading/error/ready states
		this.loadableState = state.error
			? LoadableState.Error
			: state.catalog.length > 0
				? LoadableState.Ready
				: LoadableState.Loading
	}

	renderReady() {
		const cartIsEmpty = this.model.getters.cartQuantity < 1
		const {checkoutInProgress} = this.model.reader.state
		return html`
			<section class="shopper-cart">
				${this._renderCartTitle()}
				${cartIsEmpty ? null : html`
					${this._renderCartLineItems()}
					<div class="cart-checkout">
						<button
							class="checkout-button"
							title="Checkout Cart"
							@click=${this._handleCheckoutButtonClick}
							?disabled=${checkoutInProgress}
							?hidden=${cartIsEmpty}>
								Checkout!
							</button>
						</div>
					</div>
				`}
			</section>
		`
	}

	private _handleCheckoutButtonClick = () => this.model.actions.checkout({
		checkoutInSameWindow: !!this["checkout-in-same-window"]
	})

	private _renderCartTitle() {
		const {cartQuantity: quantity} = this.model.getters
		const {checkedOut} = this.model.reader.state
		return checkedOut ? html`
			<h2>
				Cart checked out
			</h2>
		` : html`
			<h2>
				<span>Cart</span>
				<span>– ${
					quantity === 0
						? "empty"
						: `${quantity} item${quantity === 1
							? ""
							: "s"}`
				}</span>
			</h2>
		`
	}

	private _renderCartLineItems() {
		const {getters} = this.model
		const {itemsInCart, cartValue} = getters
		const lineItems = itemsInCart.map(item => this._renderCartItem(item))
		return html`
			<table>
				<thead>
					<tr>
						<th>Remove</th>
						<th>Quantity</th>
						<th>Item name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody class="cart-lines">
					${lineItems}
				</tbody>
				<tbody class="cart-subtotal">
					<tr>
						<th colspan="3">Subtotal</th>
						<td>
							<price-display value="${cartValue}"></price-display>
						</td>
					</tr>
				</tbody>
			</table>
		`
	}

	private _renderCartItem(item: CartItem) {
		const {getters, actions} = this.model
		const handleQuantityInputChange = (event: Event) => {
			const input = <HTMLInputElement>event.target
			let value = parseInt(input.value)
			const {quantityMin: min, quantityMax: max} = item
			if (value < min) value = min
			if (value > max) value = max
			input.value = value.toString()
			actions.setItemQuantity(item, value ? value : 0)
		}
		const handleRemoveClick = () => actions.setItemQuantity(item, 0)
		const lineValue = getters.getLineValue(item)
		return html`
			<tr>
				<td>
					<button
						class="remove-button"
						title="Remove item"
						@click=${handleRemoveClick}>
							${svg`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/></svg>`}
					</button>
				</td>
				<td>
					<input
						type="number"
						.value=${item.quantity.toString()}
						.min=${item.quantityMin.toString()}
						.max=${item.quantityMax.toString()}
						@change=${handleQuantityInputChange}
						@keyup=${handleQuantityInputChange}
						@mouseup=${handleQuantityInputChange}
						@click=${handleQuantityInputChange}
						@blur=${handleQuantityInputChange}
						/>
				</td>
				<td class="product-title">${item.product.title}</td>
				<td class="line-price">
					<price-display value="${lineValue}"></price-display>
				</td>
			</tr>
		`
	}
}
