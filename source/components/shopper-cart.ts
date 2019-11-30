
import {ShopperState} from "../interfaces.js"
import {LoadableComponent} from "../framework/loadable-component.js"

export class ShopperCart extends LoadableComponent {

	firstUpdated() {
		console.log("shopper cart first updated", this.model)
	}

	shopperUpdate(state: ShopperState) {
		console.log("shopper cart shopper update", state)
	}
}
