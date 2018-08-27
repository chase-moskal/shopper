
import {Product} from "./product"
import {CartItemOptions} from "./stores-interfaces"
import {observable, action, computed} from "mobx"
import {CurrencyControl} from "./currency-control"

/**
 * Cart item tracks meta-details about a product
 * - wraps a product instance
 * - keeps track of quantity in the cart
 */
export class CartItem {
	@observable quantity: number = 0
	readonly product: Product
	readonly quantityMin: number
	readonly quantityMax: number
	private readonly currencyControl: CurrencyControl

	constructor(options: CartItemOptions) {
		Object.assign(this, options)
	}

	@computed get value(): number {
		const {quantity, product} = this
		const {value} = product
		return value * quantity
	}

	@computed get price(): string {
		const {value, currencyControl, product} = this
		return currencyControl.convertAndFormat(value, product.precision)
	}

	@action setQuantity(quantity: number): void {
		this.quantity = quantity
	}
}
