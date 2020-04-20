
import {property, html, css} from "lit-element"
import {LightDom} from "../framework/light-dom.js"
import {ShopperState, CartItem, ShopperModel} from "../interfaces.js"
import {
	LoadableState,
	LoadableComponent,
} from "../framework/loadable-component.js"

export class ShopperProduct extends LightDom(LoadableComponent) {
	@property({type: String}) ["uid"]: string
	@property({type: Object}) cartItem: CartItem
	@property({type: String, reflect: true}) ["in-cart"]: boolean

	static get styles() {return [...super.styles, css`
	`]}

	shopperUpdate(state: ShopperState, {getters}: ShopperModel) {
		this.cartItem = state.catalog.find(item => item.product.id === this.uid)
		this.loadableState = this.cartItem
			? LoadableState.Ready
			: state.error
				? LoadableState.Error
				: LoadableState.Loading
		this["in-cart"] = getters.itemsInCart.includes(this.cartItem)
	}

	private _handleAddToCart = () => {
		this.model.actions.addToCart(this.cartItem)
	}

	renderReady() {
		const {cartItem, _handleAddToCart} = this
		const inCart = this["in-cart"]
		const value = this.model.getters.getUnitValue(cartItem)
		const comparedValue = cartItem.product.comparedValue
		return !cartItem ? html`` : html`
			<div class="product-display">
				<h3 class="title">${cartItem.product.title}</h3>
				<div class="box">
					<price-display
						value="${value}"
						comparedValue=${comparedValue}
					></price-display>
					<button class="add-to-cart-button"
						title=${inCart ? undefined : "Add to Cart"}
						@click=${_handleAddToCart}
						?disabled=${inCart}>
							${inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
		`
	}
}
