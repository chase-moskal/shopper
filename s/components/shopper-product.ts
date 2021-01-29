
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
	@property({type: Boolean, reflect: true}) ["in-cart"]: boolean = false
	@property({type: Boolean, reflect: true}) ["show-image"]: boolean = false
	@property({type: Boolean, reflect: true}) ["out-of-stock"]: boolean = false

	static get styles() {return [...super.styles, css``]}

	shopperUpdate(state: ShopperState, {getters}: ShopperModel) {
		this.cartItem = state.catalog.find(item => item.product.id === this.uid)
		this.loadableState = this.cartItem
			? LoadableState.Ready
			: state.error
				? LoadableState.Error
				: LoadableState.Loading
		this["in-cart"] = getters.itemsInCart.includes(this.cartItem)
		this["out-of-stock"] = this.cartItem
			? !this.cartItem.product.available
			: false
	}

	private _handleAddToCart = () => {
		this.model.actions.addToCart(this.cartItem)
	}

	renderReady() {
		const {cartItem, _handleAddToCart} = this
		const href = this["href"]
		const inCart = this["in-cart"]
		const showImage = this["show-image"]
		const outOfStock = this["out-of-stock"]
		const value = this.model.getters.getUnitValue(cartItem)
		const {product} = cartItem
		const linkify = (content: TemplateResult) => href
			? html`<a href=${href}>${content}</a>`
			: content
		return !cartItem ? null : html`
			${(showImage && product.image) ? html`
				<div class="product-image">
					${linkify(html`
						<img
							src=${product.image.src}
							alt=${product.image.alt}
							/>
					`)}
				</div>
			` : null}
			<h3 class="title">
				${linkify(html`${product.title}`)}
			</h3>
			${outOfStock
				? html`<p class="out-of-stock">Out of stock</p>`
				: null}
			<div class="box">
				<price-display
					value="${value}"
					comparedValue=${product.comparedValue}
				></price-display>
				<button class="add-to-cart-button"
					title=${inCart ? undefined : "Add to Cart"}
					@click=${_handleAddToCart}
					?disabled=${outOfStock || inCart}>
						${outOfStock
							? "Sold out"
							: inCart ? "In Cart" : "Add to Cart"}
				</button>
			</div>
		`
	}
}
