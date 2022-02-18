
import {LitElement} from "lit"
import {Unsubscribe} from "../toolbox/pubsub.js"
import {ShopperModel, ShopperState} from "../interfaces.js"

const _unsubscribe = Symbol()

export class ShopperComponent extends LitElement {
	static model: ShopperModel
	private [_unsubscribe]: Unsubscribe
	model: ShopperModel = (<any>this.constructor).model

	shopperUpdate(state: ShopperState, model: ShopperModel) {}

	connectedCallback() {
		super.connectedCallback()
		const {model} = this
		if (!model) throw new Error("shopper components require model")
		this.shopperUpdate(model.reader.state, model)
		this[_unsubscribe] = model.reader.subscribe(
			(state: ShopperState) => {
				this.shopperUpdate(state, model)
				this.requestUpdate()
			}
		)
	}

	disconnectedCallback() {
		this[_unsubscribe]()
		this[_unsubscribe] = null
		super.disconnectedCallback()
	}
}
