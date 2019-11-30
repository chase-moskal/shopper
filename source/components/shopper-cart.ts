
import {ShopperComponent} from "../framework/shopper-component.js"

export class ShopperCart extends ShopperComponent {
	firstUpdated() {
		console.log("shopper cart first updated", this.model)
	}
}
