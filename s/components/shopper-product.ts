
import {property, html, css, TemplateResult} from "lit-element"
import {LightDom} from "../framework/light-dom.js"
import {ShopperState, CartItem, ShopperModel} from "../interfaces.js"
import {
	LoadableState,
	LoadableComponent,
} from "../framework/loadable-component.js"

export class ShopperProduct extends LightDom(LoadableComponent) {
	@property({type: String}) ["uid"]: string
	@property({type: Object}) cartItem: CartItem
	@property({type: String, reflect: true}) ["href"]: string
	@property({type: String, reflect: true}) ["in-cart"]: boolean
	@property({type: Boolean, reflect: true}) ["show-image"]: boolean

	static get styles() {return [...super.styles, css``]}

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
		const href = this["href"]
		const inCart = this["in-cart"]
		const showImage = this["show-image"]
		const value = this.model.getters.getUnitValue(cartItem)
		const comparedValue = cartItem.product.comparedValue
		const linkify = (content: TemplateResult) => href
			? html`<a href=${href}>${content}</a>`
			: content
		return !cartItem ? null : html`
			${(showImage && cartItem.product.image) ? html`
				<div class="product-image">
					${linkify(html`
						<img
							src=${cartItem.product.image.src}
							alt=${cartItem.product.image.alt}
							/>
					`)}
				</div>
			` : null}
			<h3 class="title">
				${linkify(html`${cartItem.product.title}`)}
			</h3>
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
		`
	}
}
