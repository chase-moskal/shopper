
import {html} from "lit"
import {property} from "lit/decorators.js"

import xSvg from "../icons/feather/x.svg.js"

// import {LightDom} from "../framework/light-dom.js"
import {ShopperState, ShopperModel, CartItem} from "../interfaces.js"
import {LoadableState, LoadableComponent} from "../framework/loadable-component.js"
import {QuantityChangeEvent} from "../components/quantity-input/events/quantity-change-event.js"

import {shopperCartStyles} from "./shopper-cart-styles.js"

export class ShopperCart extends LoadableComponent {
	static get styles() {return [...super.styles, shopperCartStyles]}
	@property({type: Boolean}) ["checkout-in-same-window"]: boolean
	@property({type: Boolean}) ["require-terms-checked"]: boolean

	@property({type: Boolean, reflect: true}) ["checkout-is-disabled"]: boolean

	onFirstAdd = () => {}
	private _lastQuantity = 0

	@property()
	removeIcon = xSvg

	#termsChecked = false

	#resetTermsCheckedFalse() {
		this.#termsChecked = false
		this.requestUpdate()
	}

	get #checkoutIsDisabled() {
		const {checkoutInProgress} = this.model.reader.state
		const checkboxIndicatesDisabledButton =
			this["require-terms-checked"] && !this.#termsChecked
		return checkoutInProgress || checkboxIndicatesDisabledButton
	}

	updated() {
		this["checkout-is-disabled"] = this.#checkoutIsDisabled
	}

	#handleTermsChange = () => {
		const input = this.shadowRoot.querySelector<HTMLInputElement>(`[part="terms-checkbox"]`)
		this.#termsChecked = input.checked
		this.requestUpdate()
	}

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
		const disabled = this.#checkoutIsDisabled
		const showTermsBox = !checkoutInProgress && this["require-terms-checked"]
		return html`
			<section class="shopper-cart">
				${this._renderCartTitle()}
				${cartIsEmpty ?null :html`
					${this._renderCartLineItems()}
					<slot name="before-checkout"></slot>
					<div class="cart-checkout">
						${showTermsBox ?html`
							<span part=terms-box>
								<input
									type="checkbox"
									part=terms-checkbox
									@change=${this.#handleTermsChange}/>
								<slot name=terms-consent part=terms-consent>
									I understand the terms above.
								</slot>
							</span>
						` :null}
						<button
							class="checkout-button"
							part="checkout-button"
							title="Checkout Cart"
							@click=${this._handleCheckoutButtonClick}
							?disabled=${disabled}
							?hidden=${cartIsEmpty}>
								Checkout!
						</button>
					</div>
					<slot name="after-checkout"></slot>
				`}
			</section>
		`
	}

	private _handleCheckoutButtonClick = () => {
		this.#resetTermsCheckedFalse()
		this.model.actions.checkout({
			checkoutInSameWindow: !!this["checkout-in-same-window"]
		})
	}

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
							<crnc-price right value="${cartValue}"></crnc-price>
						</td>
					</tr>
				</tbody>
			</table>
		`
	}

	private _renderCartItem(item: CartItem) {
		const {getters, actions} = this.model
		const handleQuantityChange = ({detail: value}: QuantityChangeEvent) => {
			actions.setItemQuantity(item, value)
		}
		const handleRemoveClick = () => actions.setItemQuantity(item, 0)
		const lineValue = getters.getLineValue(item)
		const lineComparedValue = getters.getLineComparedValue(item)
		return html`
			<tr>
				<td class="remove-cell">
					<button
						class="remove-button"
						title="Remove item"
						@click=${handleRemoveClick}>
							${this.removeIcon}
					</button>
				</td>
				<td class="quantity">
					<quantity-input
						.value=${item.quantity}
						.min=${item.quantityMin}
						.max=${item.quantityMax}
						.step=${1}
						@quantitychange=${handleQuantityChange}
					></quantity-input>
				</td>
				<td class="product-title">${item.product.title}</td>
				<td class="line-price">
					<crnc-price right value="${lineValue}" comparison="${lineComparedValue}"></crnc-price>
				</td>
			</tr>
		`
	}
}
