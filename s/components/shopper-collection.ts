
import {css, html} from "lit"
import {property} from "lit/decorators.js"

import {LightDom} from "../framework/light-dom.js"
import {ShopperState, CartItem} from "../interfaces.js"
import {chooseShopifyId} from "../toolbox/shopify-ids/choose-shopify-id.js"
import {LoadableState, LoadableComponent} from "../framework/loadable-component.js"

export class ShopperCollection extends LightDom(LoadableComponent) {
	@property({type: Array}) items: CartItem[] = null

	@property({type: String, reflect: true}) ["gid"]: string
	@property({type: String, reflect: true}) ["uid"]: string
	@property({type: String, reflect: true}) ["link"]: string

	@property({type: Boolean, reflect: true}) ["all"]: boolean
	@property({type: String, reflect: true}) ["image-sizes"]: string
	@property({type: Boolean, reflect: true}) ["show-images"]: boolean

	static get styles() {return [...super.styles, css``]}

	get shopifyId() {
		const {gid, uid, link} = this
		return chooseShopifyId({gid, uid, link})
	}

	shopperUpdate(state: ShopperState) {
		const {shopifyId, all} = this
		this.items = all
			? [...state.catalog]
			: shopifyId
				? state.catalog.filter(item => item.product.collections.includes(shopifyId))
				: []
		this.loadableState = (this.items && this.items.length > 0)
			? LoadableState.Ready
			: state.error
				? LoadableState.Error
				: LoadableState.Loading
	}

	renderReady() {
		const {items: cartItems} = this
		return html`
			<ol>
				${cartItems && cartItems.map(cartItem => html`
					<li>
						<shopper-product
							show-image=${this["show-images"]}
							image-size=${this["image-sizes"]}
							uid=${cartItem.product.id}
						></shopper-product>
					</li>
				`)}
			</ol>
		`
	}
}
