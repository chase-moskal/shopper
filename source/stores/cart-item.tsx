
import {observable, computed} from "mobx"
import {Currency, formatPriceTag} from "../money"

export interface CartItemData {
	id: string
	cents: number
	currency: Currency
	title: string
}

export default class CartItem implements CartItemData {
	@observable id: string
	@observable cents: number
	@observable currency: Currency
	@observable title: string

	@computed get price() {
		return formatPriceTag(this.cents, this.currency)
	}

	constructor(data: CartItemData) {
		Object.assign(this, data)
	}
}
