
import {LitElement} from "lit-element"

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
		if (!this.model) throw new Error("shopper components require model")
		this.shopperUpdate(this.model.reader.state, this.model)
		this[_unsubscribe] = this.model.reader.subscribe(
			(state: ShopperState) => this.shopperUpdate(state, this.model)
		)
	}

	disconnectedCallback() {
		this[_unsubscribe]()
		this[_unsubscribe] = null
		super.disconnectedCallback()
	}
}
