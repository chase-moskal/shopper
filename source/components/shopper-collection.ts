
import {property, html} from "lit-element"
import {CartItem} from "../ecommerce/cart-item.js"
import {LoadableElement} from "./loadable-element.js"

export class ShopperCollection extends LoadableElement {
	@property({type: String}) ["uid"]: string
	@property({type: Array}) cartItems: CartItem[] = null

	createRenderRoot() {
		return this
	}

	static get styles() {return super.styles}

	render() {return html`
		${super.render()}
		<style>${ShopperCollection.styles}</style>
	`}

	renderReady() {
		return html`
			<ol>
				${this.cartItems.map(cartItem => html`
					<li>
						<shopper-product .cartItem=${cartItem} .loadableState=${this.loadableState}></shopper-product>
					</li>
				`)}
			</ol>
		`
	}
}
