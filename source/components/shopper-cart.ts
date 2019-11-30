
import {html, css, property, svg} from "lit-element"

import {ShopperState} from "../interfaces.js"
import {
	LoadableState,
	LoadableComponent,
} from "../framework/loadable-component.js"

export class ShopperCart extends LoadableComponent {
	@property({type: Boolean}) ["checkout-in-same-window"]: boolean

	firstUpdated() {
		console.log("shopper cart first updated", this.model)
	}

	shopperUpdate(state: ShopperState) {
		console.log("shopper state:", state)
		this.loadableState = state.error
			? LoadableState.Error
			: state.catalog.length > 0
				? LoadableState.Ready
				: LoadableState.Loading
	}

	renderReady() {
		return html`
			<div>
			</div>
		`
	}
}
