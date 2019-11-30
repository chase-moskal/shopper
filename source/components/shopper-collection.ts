
import {property, css, html} from "lit-element"
import {LightDom} from "../framework/light-dom.js"
import {ShopperState, CartItem} from "../interfaces.js"
import {
	LoadableState,
	LoadableComponent,
} from "../framework/loadable-component.js"

export class ShopperCollection extends LightDom(LoadableComponent) {
	@property({type: String, reflect: true}) ["uid"]: string
	@property({type: Array}) cartItems: CartItem[] = null

	static get styles() {return [...super.styles, css`
	`]}

	shopperUpdate(state: ShopperState) {
		const {uid} = this
		this.cartItems = uid
			? state.catalog.filter(item => item.product.collections.includes(uid))
			: []
		this.loadableState = (this.cartItems && this.cartItems.length > 0)
			? LoadableState.Ready
			: state.error
				? LoadableState.Error
				: LoadableState.Loading
		console.log("collection!", this.cartItems, state)
	}

	renderReady() {
		const {cartItems} = this
		return html`
			<ol>
				${cartItems && cartItems.map(cartItem => html`
					<li>
						<shopper-product uid=${cartItem.product.id}></shopper-product>
					</li>
				`)}
			</ol>
		`
	}
}
