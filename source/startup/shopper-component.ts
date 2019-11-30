
import {LitElement} from "lit-element"
import {ShopperModel} from "../interfaces.js"

export class ShopperComponent extends LitElement {
	static model: ShopperModel
	model: ShopperModel = (<any>this.constructor).model
}
