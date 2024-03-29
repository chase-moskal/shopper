
import {html, css, svg} from "lit"
import {property} from "lit/decorators.js"

import {ShopperState, ShopperModel} from "../interfaces.js"
import {ShopperComponent} from "../framework/shopper-component.js"

export class ShopperButton extends ShopperComponent {

	@property({type: Number, reflect: true})
	numeral = 0

	shopperUpdate(state: ShopperState, {getters}: ShopperModel) {
		this.numeral = getters.cartQuantity
	}

	static get styles() {
		return css`
			* {
				box-sizing: border-box;
			}

			:host {
				display: block;
				position: relative;
				background: var(--shopper-button-background, white);
				width: var(--shopper-button-size, 2em);
				height: var(--shopper-button-size, 2em);
			}

			.cart-button {
				padding: var(--shopper-button-padding, 0.5em);
			}

			svg {
				width: 100%;
				height: 100%;
			}

			.cart-numeral {
				position: absolute;
				top: -0.2em;
				right: -0.2em;
				font-size: var(--shopper-button-numeral-size, 1em);
				display: flex;
				justify-content: center;
				flex-direction: column;
				text-align: center;
				width: 1.4em;
				height: 1.4em;
				background: var(--shopper-button-numeral-color, red);
				border-radius: 1.4em;
				color: white;
				font-weight: bold;
				text-shadow: 0.5px 1px 1px rgba(0,0,0, 0.2);
				box-shadow: 1px 2px 2px rgba(0,0,0, 0.2);
			}
		`
	}

	render() {
		return html`
			<div class="cart-button" part=button>
				${svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`}

				${this.numeral
					? html`<div class="cart-numeral" part=numeral>${this.numeral}</div>`
					: null}
			</div>
		`
	}
}
