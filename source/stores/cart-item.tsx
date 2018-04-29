
import {formatCurrency} from "crnc"
import {observable, computed, action} from "mobx"

export interface CartItemData {
	id: string
	cents: number
	currency: string
	title: string
}

export default class CartItem implements CartItemData {
	@observable id: string
	@observable cents: number
	@observable currency: string
	@observable title: string
	@observable quantity: number = 1
	@observable quantityMin: number = 1
	@observable quantityMax: number = 5

	@computed get totalCents() {
		return this.cents * this.quantity
	}

	@computed get price() {
		const {cents, currency} = this
		return formatCurrency({cents, currency})
	}

	@computed get totalPrice() {
		const {cents, currency} = this
		return formatCurrency({cents, currency})
	}

	constructor(data: CartItemData) {
		Object.assign(this, data)
	}

	@action
	setQuantity(quantity: number) {
		this.quantity = quantity
	}

	@action
	setCurrency(currency: string) {
		this.currency = currency
	}
}
