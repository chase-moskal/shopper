
import {Product} from "./product"
import {observable, action, computed} from "mobx"
import {CurrencyControl} from "./currency-control"

/**
 * CART ITEM OPTIONS INTERFACE
 */
export interface CartItemOptions {
	currencyControl: CurrencyControl
	product: Product
	quantityMin: number
	quantityMax: number
}

/**
 * CART ITEM CLASS
 * - wraps a product instance
 * - keeps track of quantity in the cart
 */
export class CartItem {
	private readonly currencyControl: CurrencyControl

	readonly product: Product
	readonly quantityMin: number
	readonly quantityMax: number

	@observable quantity: number = 1

	constructor(options: CartItemOptions) {
		Object.assign(this, options)
	}

	@computed totalValue(): number {
		const {value} = this.product
		const {quantity} = this
		return value * quantity
	}

	@computed totalPrice(): string {
		const {totalValue, currencyControl} = this
		return currencyControl.convertAndFormat(totalValue)
	}

	@action setQuantity(quantity: number): void {
		this.quantity = quantity
	}
}
