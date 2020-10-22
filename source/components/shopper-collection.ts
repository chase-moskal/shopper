
import {property, css, html} from "lit-element"
import {LightDom} from "../framework/light-dom.js"
import {ShopperState, CartItem} from "../interfaces.js"
import {
	LoadableState,
	LoadableComponent,
} from "../framework/loadable-component.js"

export class ShopperCollection extends LightDom(LoadableComponent) {
	@property({type: String, reflect: true}) ["uid"]: string
	@property({type: Boolean, reflect: true}) ["all"]: boolean
	@property({type: Boolean, reflect: true}) ["show-images"]: boolean
	@property({type: Array}) items: CartItem[] = null

	static get styles() {return [...super.styles, css`
	`]}

	shopperUpdate(state: ShopperState) {
		const {uid, all} = this
		this.items = all
			? [...state.catalog]
			: uid
				? state.catalog.filter(item => item.product.collections.includes(uid))
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
							uid=${cartItem.product.id}
						></shopper-product>
					</li>
				`)}
			</ol>
		`
	}
}
