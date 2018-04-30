
import {formatCurrency} from "crnc"
import {observable, computed, action} from "mobx"

export interface CartItemData {
	id: string
	value: number
	currency: string
	title: string
}

export default class CartItem implements CartItemData {
	@observable id: string
	@observable value: number
	@observable currency: string
	@observable title: string
	@observable quantity: number = 1
	@observable quantityMin: number = 1
	@observable quantityMax: number = 5

	@computed get totalValue() {
		return this.value * this.quantity
	}

	@computed get price() {
		const {value, currency} = this
		return formatCurrency({value, currency})
	}

	@computed get totalPrice() {
		const {value, currency} = this
		return formatCurrency({value, currency})
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
