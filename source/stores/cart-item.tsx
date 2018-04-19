
import {observable, computed, action} from "mobx"
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
	@observable quantity: number = 1

	@computed get totalCents() {
		return this.cents * this.quantity
	}

	@computed get price() {
		return formatPriceTag(this.cents, this.currency)
	}

	@computed get totalPrice() {
		return formatPriceTag(this.totalCents, this.currency)
	}

	constructor(data: CartItemData) {
		Object.assign(this, data)
	}

	@action
	setQuantity(quantity: number) {
		this.quantity = quantity
	}
}
