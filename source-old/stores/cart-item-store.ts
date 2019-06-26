
import {ProductStore} from "./product-store"
import {CartItemStoreOptions} from "./stores-interfaces-store"
import {observable, action, computed} from "mobx"
import {CurrencyControlStore} from "./currency-control-store"

/**
 * Cart item tracks meta-details about a product
 * - wraps a product instance
 * - keeps track of quantity in the cart
 */
export class CartItemStore {
	@observable quantity: number
	readonly quantityMin: number
	readonly quantityMax: number
	readonly productStore: ProductStore
	private readonly currencyControlStore: CurrencyControlStore

	constructor(options: CartItemStoreOptions) {
		this.setQuantity(0)
		this.productStore = options.productStore
		this.currencyControlStore = options.currencyControlStore
		this.quantityMin = options.quantityMin
		this.quantityMax = options.quantityMax
	}

	@computed get value(): number {
		const {quantity, productStore} = this
		const {value} = productStore
		return value * quantity
	}

	@computed get price(): string {
		const {value, currencyControlStore, productStore} = this
		return currencyControlStore.convertAndFormat(value, productStore.precision)
	}

	@action setQuantity(quantity: number): void {
		this.quantity = quantity
	}
}
