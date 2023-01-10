
import {property} from "lit/decorators.js"
import {html, css, TemplateResult} from "lit"

import {LightDom} from "../framework/light-dom.js"
import {isDefined} from "../toolbox/is-defined.js"
import {ShopperState, CartItem, ShopperModel} from "../interfaces.js"
import {calculatePercentOff} from "../toolbox/calculate-percent-off.js"
import {LoadableState, LoadableComponent} from "../framework/loadable-component.js"
import {parseImageSize, sizeShopifyImage} from "./shopify-utils/size-shopify-image.js"
import {shopifyProductLinkToGid} from "../toolbox/shopify-ids/shopify-product-link-to-gid.js"

export class ShopperProduct extends LightDom(LoadableComponent) {
	@property({type: Object}) cartItem: CartItem
	@property({type: String, reflect: true}) ["uid"]: string
	@property({type: String, reflect: true}) ["link"]: string
	@property({type: String, reflect: true}) ["href"]: string
	@property({type: String, reflect: true}) ["sale"]: string
	@property({type: String, reflect: true}) ["image-size"]: string
	@property({type: Boolean, reflect: true}) ["in-cart"]: boolean = false
	@property({type: Boolean, reflect: true}) ["show-image"]: boolean = false
	@property({type: Boolean, reflect: true}) ["out-of-stock"]: boolean = false

	static get styles() {return [...super.styles, css``]}

	get shopifyId() {
		const {uid, link} = this
		return uid
			? uid
			: link
				? shopifyProductLinkToGid(link)
				: undefined
	}

	shopperUpdate(state: ShopperState, {getters}: ShopperModel) {
		this.cartItem = state.catalog.find(item => item.product.id === this.shopifyId)
		this.loadableState = this.cartItem
			? LoadableState.Ready
			: state.error
				? LoadableState.Error
				: LoadableState.Loading
		this["in-cart"] = getters.itemsInCart.includes(this.cartItem)
		this["out-of-stock"] = this.cartItem
			? !this.cartItem.product.available
			: false
		this["sale"] = this.cartItem
			? isDefined(this.cartItem.product.comparedValue)
				? calculatePercentOff({
					currentValue: this.cartItem.product.value,
					comparisonValue: this.cartItem.product.comparedValue,
				}).toString()
				: undefined
			: undefined
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
		const imageSize = this["image-size"]
		const value = this.model.getters.getUnitValue(cartItem)
		const {product} = cartItem
		const linkify = (content: TemplateResult) => href
			? html`<a href=${href}>${content}</a>`
			: content
		return !cartItem ? null : html`
			${(showImage && product.image) ? html`
				<div class=product-image>
					${linkify(html`
						<img
							src=${sizeShopifyImage(
								product.image.src,
								parseImageSize(imageSize),
							)}
							alt=${product.image.alt}
							/>
					`)}
				</div>
			` : null}
			<div class=product-content>
				<h3 class=title>
					${linkify(html`${product.title}`)}
				</h3>
				${outOfStock
					? html`<p class=out-of-stock>Out of stock</p>`
					: null}
				<div class=box>
					<crnc-price
						value="${value}"
						comparison="${product.comparedValue}"
					></crnc-price>
					<button
						class=add-to-cart-button
						title=${inCart ? undefined : "Add to Cart"}
						@click=${_handleAddToCart}
						?disabled=${outOfStock || inCart}>
							${outOfStock
								? "Sold out"
								: inCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>
		`
	}
}
