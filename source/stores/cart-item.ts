
import {Product} from "./product"
import {observable, action, computed} from "mobx"
import {CurrencyControl} from "./currency-control"

/**
 * CART ITEM OPTIONS INTERFACE
 */
export interface CartItemOptions {
	product: Product
	currencyControl: CurrencyControl
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

	@computed value(): number {
		const {quantity, product} = this
		const {value} = product
		return value * quantity
	}

	@computed price(): string {
		const {value, currencyControl} = this
		return currencyControl.convertAndFormat(value)
	}

	@action setQuantity(quantity: number): void {
		this.quantity = quantity
	}
}
